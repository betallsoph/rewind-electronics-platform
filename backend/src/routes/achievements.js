const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// Achievement definitions
const ACHIEVEMENTS = {
  FIRST_VIEW: {
    id: 'first_view',
    name: 'Người Khám Phá',
    description: 'Xem thiết bị đầu tiên',
    icon: '👀',
    xp: 10
  },
  DEVICE_LOVER: {
    id: 'device_lover',
    name: 'Người Yêu Công Nghệ',
    description: 'Xem 10 thiết bị',
    icon: '❤️',
    xp: 50
  },
  TECH_HISTORIAN: {
    id: 'tech_historian',
    name: 'Sử Gia Công Nghệ',
    description: 'Xem 50 thiết bị',
    icon: '📚',
    xp: 200
  },
  MEMORY_MAKER: {
    id: 'memory_maker',
    name: 'Người Kể Chuyện',
    description: 'Chia sẻ ký ức đầu tiên',
    icon: '✍️',
    xp: 100
  },
  COLLECTOR: {
    id: 'collector',
    name: 'Nhà Sưu Tập',
    description: 'Tạo bộ sưu tập đầu tiên',
    icon: '🗂️',
    xp: 150
  },
  ERA_70S: {
    id: 'era_70s',
    name: 'Thập Niên 70s Master',
    description: 'Xem tất cả thiết bị từ thập niên 70',
    icon: '🕺',
    xp: 100
  },
  ERA_80S: {
    id: 'era_80s',
    name: 'Thập Niên 80s Master',
    description: 'Xem tất cả thiết bị từ thập niên 80',
    icon: '🎸',
    xp: 100
  },
  ERA_90S: {
    id: 'era_90s',
    name: 'Thập Niên 90s Master',
    description: 'Xem tất cả thiết bị từ thập niên 90',
    icon: '📼',
    xp: 100
  },
  PHONE_EXPERT: {
    id: 'phone_expert',
    name: 'Chuyên Gia Điện Thoại',
    description: 'Xem tất cả điện thoại',
    icon: '📱',
    xp: 100
  },
  GAMING_LEGEND: {
    id: 'gaming_legend',
    name: 'Huyền Thoại Gaming',
    description: 'Xem tất cả máy chơi game',
    icon: '🎮',
    xp: 100
  }
};

// @route   GET /api/achievements/:username
// @desc    Get user achievements
router.get('/:username', async (req, res) => {
  try {
    let achievement = await Achievement.findOne({ username: req.params.username });
    
    if (!achievement) {
      achievement = new Achievement({ username: req.params.username });
      await achievement.save();
    }
    
    res.json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/achievements/:username/unlock
// @desc    Unlock an achievement
router.post('/:username/unlock', async (req, res) => {
  try {
    const { achievementId } = req.body;
    const achievementDef = Object.values(ACHIEVEMENTS).find(a => a.id === achievementId);
    
    if (!achievementDef) {
      return res.status(400).json({ success: false, message: 'Invalid achievement' });
    }
    
    let userAchievement = await Achievement.findOne({ username: req.params.username });
    
    if (!userAchievement) {
      userAchievement = new Achievement({ username: req.params.username });
    }
    
    await userAchievement.unlockAchievement(achievementDef);
    
    res.json({ 
      success: true, 
      data: userAchievement,
      unlocked: achievementDef
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/achievements/:username/stats
// @desc    Update user stats
router.post('/:username/stats', async (req, res) => {
  try {
    let achievement = await Achievement.findOne({ username: req.params.username });
    
    if (!achievement) {
      achievement = new Achievement({ username: req.params.username });
    }
    
    // Update stats
    if (req.body.devicesViewed !== undefined) {
      achievement.stats.devicesViewed = req.body.devicesViewed;
    }
    if (req.body.devicesLiked !== undefined) {
      achievement.stats.devicesLiked = req.body.devicesLiked;
    }
    if (req.body.memoriesShared !== undefined) {
      achievement.stats.memoriesShared = req.body.memoriesShared;
    }
    if (req.body.collectionsCreated !== undefined) {
      achievement.stats.collectionsCreated = req.body.collectionsCreated;
    }
    
    await achievement.save();
    
    res.json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/achievements/leaderboard
// @desc    Get leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const leaderboard = await Achievement.find()
      .sort({ xp: -1, level: -1 })
      .limit(parseInt(limit))
      .select('username level xp achievements')
      .lean();
    
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
module.exports.ACHIEVEMENTS = ACHIEVEMENTS;
