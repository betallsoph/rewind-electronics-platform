const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const Device = require('../models/Device');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

// @route   GET /api/devices
// @desc    Get all devices with filtering, searching, and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['phone', 'computer', 'console', 'audio', 'camera', 'other', 'all']),
  query('search').optional().trim(),
  query('sortBy').optional().isIn(['year', 'name', 'likes', 'views', 'createdAt']),
  query('order').optional().isIn(['asc', 'desc'])
], handleValidationErrors, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    const search = req.query.search;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    
    // Build query
    let query = {};
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search filter
    if (search) {
      query.$text = { $search: search };
    }
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    const devices = await Device.find(query)
      .sort({ [sortBy]: order })
      .limit(limit)
      .skip(skip)
      .lean();
    
    const total = await Device.countDocuments(query);
    
    res.json({
      success: true,
      data: devices,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching devices',
      error: error.message 
    });
  }
});

// @route   GET /api/devices/:id
// @desc    Get single device by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    
    if (!device) {
      return res.status(404).json({ 
        success: false,
        message: 'Device not found' 
      });
    }
    
    // Increment views
    await device.incrementViews();
    
    res.json({
      success: true,
      data: device
    });
  } catch (error) {
    console.error('Error fetching device:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching device',
      error: error.message 
    });
  }
});

// @route   POST /api/devices
// @desc    Create a new device
// @access  Public (should be protected in production)
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Valid year is required'),
  body('category').isIn(['phone', 'computer', 'console', 'audio', 'camera', 'other']).withMessage('Valid category is required'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 500 }),
  body('memories').trim().notEmpty().withMessage('Memories are required').isLength({ max: 2000 }),
  body('emoji').optional().trim(),
  body('image').optional().trim().isURL().withMessage('Image must be a valid URL'),
  body('tags').optional().isArray(),
  body('specifications').optional().isObject()
], handleValidationErrors, async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    
    res.status(201).json({
      success: true,
      data: device,
      message: 'Device created successfully'
    });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating device',
      error: error.message 
    });
  }
});

// @route   PUT /api/devices/:id
// @desc    Update a device
// @access  Public (should be protected in production)
router.put('/:id', [
  body('name').optional().trim().isLength({ max: 100 }),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }),
  body('category').optional().isIn(['phone', 'computer', 'console', 'audio', 'camera', 'other']),
  body('description').optional().trim().isLength({ max: 500 }),
  body('memories').optional().trim().isLength({ max: 2000 }),
  body('emoji').optional().trim(),
  body('image').optional().trim().isURL(),
  body('tags').optional().isArray(),
  body('specifications').optional().isObject()
], handleValidationErrors, async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!device) {
      return res.status(404).json({ 
        success: false,
        message: 'Device not found' 
      });
    }
    
    res.json({
      success: true,
      data: device,
      message: 'Device updated successfully'
    });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating device',
      error: error.message 
    });
  }
});

// @route   DELETE /api/devices/:id
// @desc    Delete a device
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    
    if (!device) {
      return res.status(404).json({ 
        success: false,
        message: 'Device not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Device deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting device',
      error: error.message 
    });
  }
});

// @route   POST /api/devices/:id/like
// @desc    Like a device
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    
    if (!device) {
      return res.status(404).json({ 
        success: false,
        message: 'Device not found' 
      });
    }
    
    await device.incrementLikes();
    
    res.json({
      success: true,
      data: { likes: device.likes },
      message: 'Device liked successfully'
    });
  } catch (error) {
    console.error('Error liking device:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error liking device',
      error: error.message 
    });
  }
});

// @route   GET /api/devices/stats/overview
// @desc    Get statistics overview
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalDevices = await Device.countDocuments();
    const categoryCounts = await Device.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const yearRange = await Device.aggregate([
      { $group: { 
        _id: null, 
        oldest: { $min: '$year' },
        newest: { $max: '$year' }
      }}
    ]);
    
    res.json({
      success: true,
      data: {
        totalDevices,
        categories: categoryCounts,
        yearRange: yearRange[0] || { oldest: null, newest: null }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching stats',
      error: error.message 
    });
  }
});

module.exports = router;
