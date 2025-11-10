# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ 
- MongoDB 6.0+
- npm or yarn

## 1. Setup Backend (5 minutes)

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retro-electronics
FRONTEND_URL=http://localhost:3000
```

Seed database with sample data:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```

✅ Backend running at http://localhost:5000

## 2. Setup Frontend (3 minutes)

Open new terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Start frontend:
```bash
npm run dev
```

✅ Frontend running at http://localhost:3000

## 3. Open in Browser

Visit: http://localhost:3000

## 🎮 What to Try

### View Modes
- **Grid View**: Classic card layout
- **Timeline 3D**: Scroll through devices by era with 3D parallax
- **Ký Ức**: Read and share memories
- **Thành Tích**: Track your progress and achievements

### Features
- 🔍 Search devices
- 📂 Filter by category/era
- ⚖️ Compare 2-3 devices side-by-side
- 💭 Share your own memories
- 🏆 Unlock achievements
- ❤️ Like devices
- 👁️ View details with modal

### Try Comparison
1. Click "⚖️ So Sánh Thiết Bị"
2. Click on 2-3 devices
3. Click "So Sánh Ngay"

### Share Memory
1. Switch to "💭 Ký Ức" view
2. Click "+ Thêm Ký Ức"
3. Fill in your story
4. Submit!

## 🎨 Features Overview

- ✨ Glassmorphism UI
- 🎭 Custom cursor
- 🌟 Particle background
- 🎯 3D card effects
- 📊 Rarity system (Common → Legendary)
- 💰 Price history (Original vs Vintage)
- 🕰️ Era classification (70s-2010s)
- 🏆 Achievement system
- 💭 Community memories

## 📱 Sample Data

12 legendary devices already loaded:
- Nokia 1110 (2005)
- Sony Walkman (1985)
- Game Boy (1989) - LEGENDARY
- Commodore 64 (1982) - LEGENDARY
- iPod Classic (2001) - LEGENDARY
- PlayStation 1 (1994) - LEGENDARY
- And more...

## 🐛 Troubleshooting

### MongoDB not starting?
```bash
# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check status
mongosh
```

### Port already in use?
```bash
# Backend (change PORT in .env)
PORT=5001

# Frontend
# Kill process on port 3000 or use different port:
npm run dev -- -p 3001
```

### Dependencies issue?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. Try all view modes
2. Compare devices
3. Share a memory
4. Unlock achievements
5. Explore timeline 3D view
6. Check different eras

## 📚 Documentation

- Full README: `README.md`
- Features list: `FEATURES.md`
- API docs: Check backend routes

Enjoy! 🎉
