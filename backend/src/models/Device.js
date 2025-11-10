const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Device name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['phone', 'computer', 'console', 'audio', 'camera', 'other'],
    lowercase: true
  },
  emoji: {
    type: String,
    default: '📱'
  },
  image: {
    type: String,
    default: null
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  memories: {
    type: String,
    required: [true, 'Memories are required'],
    maxlength: [2000, 'Memories cannot be more than 2000 characters']
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
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

// Indexes for better query performance
deviceSchema.index({ name: 'text', description: 'text', memories: 'text' });
deviceSchema.index({ category: 1 });
deviceSchema.index({ year: -1 });
deviceSchema.index({ createdAt: -1 });

// Virtual for age
deviceSchema.virtual('age').get(function() {
  return new Date().getFullYear() - this.year;
});

// Method to increment views
deviceSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Method to increment likes
deviceSchema.methods.incrementLikes = async function() {
  this.likes += 1;
  return this.save();
};

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
