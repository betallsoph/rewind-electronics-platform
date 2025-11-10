const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Memory = require('../models/Memory');

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
router.post('/', [
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
    const memory = new Memory(req.body);
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

module.exports = router;
