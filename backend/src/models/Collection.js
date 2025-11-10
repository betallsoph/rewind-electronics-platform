const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [50, 'Username cannot be more than 50 characters']
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }],
  theme: {
    type: String,
    enum: ['retro', 'modern', 'minimal', 'colorful', 'dark'],
    default: 'retro'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for device count
collectionSchema.virtual('deviceCount').get(function() {
  return this.devices.length;
});

// Indexes
collectionSchema.index({ username: 1, createdAt: -1 });
collectionSchema.index({ isPublic: 1, likes: -1 });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
