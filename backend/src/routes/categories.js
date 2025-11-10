const express = require('express');
const router = express.Router();

// Category definitions with Vietnamese names
const categories = [
  { id: 'all', name: 'Tất cả', emoji: '📦', nameEn: 'All' },
  { id: 'phone', name: 'Điện thoại', emoji: '📱', nameEn: 'Phone' },
  { id: 'computer', name: 'Máy tính', emoji: '💻', nameEn: 'Computer' },
  { id: 'console', name: 'Máy chơi game', emoji: '🎮', nameEn: 'Console' },
  { id: 'audio', name: 'Âm thanh', emoji: '🎧', nameEn: 'Audio' },
  { id: 'camera', name: 'Máy ảnh', emoji: '📷', nameEn: 'Camera' },
  { id: 'other', name: 'Khác', emoji: '📦', nameEn: 'Other' }
];

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: categories
  });
});

// @route   GET /api/categories/:id
// @desc    Get single category by ID
// @access  Public
router.get('/:id', (req, res) => {
  const category = categories.find(cat => cat.id === req.params.id);
  
  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    });
  }
  
  res.json({
    success: true,
    data: category
  });
});

module.exports = router;
