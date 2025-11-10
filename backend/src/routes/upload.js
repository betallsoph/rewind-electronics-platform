const express = require('express');
const router = express.Router();
const { uploadSingleImage, uploadMultipleImages, deleteFromR2 } = require('../middleware/upload');

/**
 * @route   POST /api/upload/single
 * @desc    Upload a single image
 * @access  Public
 */
router.post('/single', uploadSingleImage('image'), async (req, res) => {
  try {
    if (!req.uploadedFile) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: req.uploadedFile,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upload',
    });
  }
});

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple images (max 5)
 * @access  Public
 */
router.post('/multiple', uploadMultipleImages('images', 5), async (req, res) => {
  try {
    if (!req.uploadedFiles || req.uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    res.json({
      success: true,
      message: `${req.uploadedFiles.length} files uploaded successfully`,
      data: req.uploadedFiles,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upload',
    });
  }
});

/**
 * @route   DELETE /api/upload/:key
 * @desc    Delete an image from R2
 * @access  Public (should be protected in production)
 */
router.delete('/:key(*)', async (req, res) => {
  try {
    const key = req.params.key;
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: 'File key is required',
      });
    }

    await deleteFromR2(key);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during deletion',
    });
  }
});

module.exports = router;
