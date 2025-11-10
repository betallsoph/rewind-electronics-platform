const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
    index: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [50, 'Username cannot be more than 50 characters']
  },
  avatar: {
    type: String,
    default: null
  },
  avatarUrl: {
    type: String,
    default: null
  },
  avatarKey: {
    type: String,
    default: null
  },
  photos: [{
    url: String,
    key: String,
    caption: String,
  }],
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  story: {
    type: String,
    required: [true, 'Story is required'],
    maxlength: [2000, 'Story cannot be more than 2000 characters']
  },
  year: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
memorySchema.index({ deviceId: 1, createdAt: -1 });
memorySchema.index({ featured: 1, upvotes: -1 });

// Method to upvote
memorySchema.methods.upvote = async function() {
  this.upvotes += 1;
  return this.save();
};

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;
