const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Memory = require('../models/Memory');
const { uploadSingleImage, uploadMultipleImages, deleteFromR2 } = require('../middleware/upload');

// @route   GET /api/memories
// @desc    Get memories by device or all featured
router.get('/', async (req, res) => {
  try {
    const { deviceId, featured, limit = 20 } = req.query;
    
    let query = {};
    if (deviceId) query.deviceId = deviceId;
    if (featured === 'true') query.featured = true;
    
    const memories = await Memory.find(query)
      .sort({ upvotes: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .lean();
    
    res.json({ success: true, data: memories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/memories
// @desc    Create a new memory
router.post('/', uploadSingleImage('avatar'), [
  body('deviceId').isMongoId(),
  body('username').trim().notEmpty().isLength({ max: 50 }),
  body('title').trim().notEmpty().isLength({ max: 100 }),
  body('story').trim().notEmpty().isLength({ max: 2000 }),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }),
  body('location').optional().trim().isLength({ max: 100 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const memoryData = req.body;
    
    // If avatar was uploaded, use that
    if (req.uploadedFile) {
      memoryData.avatarUrl = req.uploadedFile.url;
      memoryData.avatarKey = req.uploadedFile.key;
    }
    
    const memory = new Memory(memoryData);
    await memory.save();
    res.status(201).json({ success: true, data: memory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/memories/:id/upvote
// @desc    Upvote a memory
router.post('/:id/upvote', async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }
    
    await memory.upvote();
    res.json({ success: true, data: { upvotes: memory.upvotes } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/memories/:id
// @desc    Delete a memory
router.delete('/:id', async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    
    if (!memory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }
    
    // Delete avatar from R2 if exists
    if (memory.avatarKey) {
      try {
        await deleteFromR2(memory.avatarKey);
      } catch (err) {
        console.error('Error deleting avatar:', err);
      }
    }
    
    // Delete photos from R2 if any
    if (memory.photos && memory.photos.length > 0) {
      for (const photo of memory.photos) {
        if (photo.key) {
          try {
            await deleteFromR2(photo.key);
          } catch (err) {
            console.error('Error deleting photo:', err);
          }
        }
      }
    }
    
    await Memory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
