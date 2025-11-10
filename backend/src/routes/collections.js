const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Collection = require('../models/Collection');

// @route   GET /api/collections
// @desc    Get all public collections or by username
router.get('/', async (req, res) => {
  try {
    const { username, sort = 'likes' } = req.query;
    
    let query = { isPublic: true };
    if (username) query.username = username;
    
    const collections = await Collection.find(query)
      .populate('devices')
      .sort({ [sort]: -1 })
      .lean();
    
    res.json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/collections/:id
// @desc    Get single collection
router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('devices');
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    collection.views += 1;
    await collection.save();
    
    res.json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/collections
// @desc    Create new collection
router.post('/', [
  body('name').trim().notEmpty().isLength({ max: 100 }),
  body('username').trim().notEmpty().isLength({ max: 50 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('devices').optional().isArray(),
  body('theme').optional().isIn(['retro', 'modern', 'minimal', 'colorful', 'dark']),
  body('isPublic').optional().isBoolean()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/collections/:id
// @desc    Update collection
router.put('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('devices');
    
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    res.json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/collections/:id/like
// @desc    Like collection
router.post('/:id/like', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }
    
    collection.likes += 1;
    await collection.save();
    
    res.json({ success: true, data: { likes: collection.likes } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
