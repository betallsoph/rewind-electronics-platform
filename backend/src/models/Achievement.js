const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  achievements: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    icon: String,
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  stats: {
    devicesViewed: {
      type: Number,
      default: 0
    },
    devicesLiked: {
      type: Number,
      default: 0
    },
    memoriesShared: {
      type: Number,
      default: 0
    },
    collectionsCreated: {
      type: Number,
      default: 0
    },
    erasMastered: [{
      type: String
    }],
    categoriesMastered: [{
      type: String
    }]
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 100
  },
  xp: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Method to add achievement
achievementSchema.methods.unlockAchievement = async function(achievement) {
  const exists = this.achievements.find(a => a.id === achievement.id);
  if (!exists) {
    this.achievements.push(achievement);
    this.xp += achievement.xp || 100;
    this.level = Math.floor(this.xp / 1000) + 1;
    return this.save();
  }
  return this;
};

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
