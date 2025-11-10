const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } = require('../config/r2');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Upload file to R2
const uploadToR2 = async (file, folder = 'images') => {
  try {
    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${folder}/${uuidv4()}${fileExtension}`;
    
    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // Make file publicly accessible
      // Note: R2 bucket must have public access enabled
    });

    await r2Client.send(command);

    // Return public URL
    const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
    
    return {
      success: true,
      url: publicUrl,
      key: fileName,
      size: file.size,
      mimetype: file.mimetype,
    };
  } catch (error) {
    console.error('R2 upload error:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

// Delete file from R2
const deleteFromR2 = async (key) => {
  try {
    const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
    
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    
    return { success: true };
  } catch (error) {
    console.error('R2 delete error:', error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

// Middleware to handle single file upload
const uploadSingleImage = (fieldName) => {
  return [
    upload.single(fieldName),
    async (req, res, next) => {
      if (!req.file) {
        return next();
      }

      try {
        const result = await uploadToR2(req.file);
        req.uploadedFile = result;
        next();
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
  ];
};

// Middleware to handle multiple file uploads
const uploadMultipleImages = (fieldName, maxCount = 5) => {
  return [
    upload.array(fieldName, maxCount),
    async (req, res, next) => {
      if (!req.files || req.files.length === 0) {
        return next();
      }

      try {
        const uploadPromises = req.files.map(file => uploadToR2(file));
        const results = await Promise.all(uploadPromises);
        req.uploadedFiles = results;
        next();
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
  ];
};

module.exports = {
  upload,
  uploadToR2,
  deleteFromR2,
  uploadSingleImage,
  uploadMultipleImages,
};
