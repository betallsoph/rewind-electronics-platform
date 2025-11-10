# 📱 Hoài Niệm Thiết Bị Điện Tử | Retro Electronics

Một trang blog đầy đủ với frontend (Next.js) và backend (Node.js) để lưu trữ và hoài niệm về các thiết bị điện tử huyền thoại qua các thời kỳ.

## 🌟 Tính năng

### Frontend (Next.js + TypeScript)
- ✨ **Giao diện hiện đại**: Thiết kế đẹp mắt với gradient màu sắc, animations mượt mà
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị (desktop, tablet, mobile)
- 🔍 **Tìm kiếm real-time**: Tìm kiếm nhanh thiết bị theo tên, mô tả
- 📂 **Phân loại thiết bị**: Lọc theo danh mục (Điện thoại, Máy tính, Máy chơi game, Âm thanh, Máy ảnh)
- 💝 **Tương tác**: Like và xem chi tiết thiết bị với modal đẹp mắt
- 📄 **Phân trang**: Xử lý danh sách lớn với pagination
- 🎨 **Phong cách retro**: Kết hợp giữa thiết kế hiện đại và cảm giác hoài cổ

### Backend (Node.js + Express + MongoDB)
- 🔐 **RESTful API**: API đầy đủ với validation
- 🗄️ **MongoDB**: Database linh hoạt với Mongoose ODM
- ✅ **Validation**: Express-validator để kiểm tra dữ liệu đầu vào
- 📊 **Advanced Queries**: Filtering, searching, sorting, pagination
- 📈 **Statistics**: Endpoint thống kê tổng quan
- 🎯 **Optimized**: Indexes để tăng performance
- 🔄 **CORS**: Hỗ trợ cross-origin requests

## 🏗️ Cấu trúc dự án

```
workspace/
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/   # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── DeviceGrid.tsx
│   │   │   ├── DeviceCard.tsx
│   │   │   ├── DeviceModal.tsx
│   │   │   └── Footer.tsx
│   │   ├── lib/          # Utilities
│   │   │   └── api.ts    # API client
│   │   └── types/        # TypeScript types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── .env.local.example
│
├── backend/              # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js    # MongoDB connection
│   │   ├── models/
│   │   │   └── Device.js      # Device model
│   │   ├── routes/
│   │   │   ├── devices.js     # Device routes
│   │   │   └── categories.js  # Category routes
│   │   ├── scripts/
│   │   │   └── seed.js        # Database seeding
│   │   └── index.js           # Express app
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js 18.x hoặc cao hơn
- MongoDB 6.0 hoặc cao hơn
- npm hoặc yarn

### 1. Clone repository

```bash
git clone <repository-url>
cd workspace
```

### 2. Setup Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa file .env với thông tin MongoDB của bạn
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/retro-electronics
# FRONTEND_URL=http://localhost:3000
```

### 3. Khởi động MongoDB

```bash
# Nếu dùng MongoDB local
mongod

# Hoặc sử dụng MongoDB Atlas (cloud)
# Cập nhật MONGODB_URI trong file .env với connection string từ Atlas
```

### 4. Seed dữ liệu mẫu

```bash
# Vẫn ở thư mục backend
npm run seed
```

Lệnh này sẽ thêm 12 thiết bị điện tử mẫu vào database.

### 5. Chạy Backend

```bash
# Development mode với nodemon
npm run dev

# Hoặc production mode
npm start
```

Backend sẽ chạy tại `http://localhost:5000`

### 6. Setup Frontend

```bash
# Mở terminal mới, di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env.local từ .env.local.example
cp .env.local.example .env.local

# File .env.local sẽ có nội dung:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 7. Chạy Frontend

```bash
# Development mode
npm run dev

# Build cho production
npm run build

# Chạy production build
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

## 📡 API Endpoints

### Devices

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/devices` | Lấy danh sách thiết bị | `page`, `limit`, `category`, `search`, `sortBy`, `order` |
| GET | `/api/devices/:id` | Lấy chi tiết thiết bị | - |
| POST | `/api/devices` | Tạo thiết bị mới | - |
| PUT | `/api/devices/:id` | Cập nhật thiết bị | - |
| DELETE | `/api/devices/:id` | Xóa thiết bị | - |
| POST | `/api/devices/:id/like` | Like thiết bị | - |
| GET | `/api/devices/stats/overview` | Thống kê tổng quan | - |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Lấy danh sách danh mục |
| GET | `/api/categories/:id` | Lấy chi tiết danh mục |

### Example Requests

```bash
# Lấy tất cả thiết bị
curl http://localhost:5000/api/devices

# Tìm kiếm thiết bị
curl "http://localhost:5000/api/devices?search=Nokia&category=phone"

# Tạo thiết bị mới
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 2G",
    "year": 2007,
    "category": "phone",
    "emoji": "📱",
    "description": "Chiếc iPhone đầu tiên...",
    "memories": "Cách mạng di động..."
  }'

# Like thiết bị
curl -X POST http://localhost:5000/api/devices/{id}/like
```

## 📝 Thêm thiết bị mới

### Qua API

Sử dụng POST request đến `/api/devices` với body:

```json
{
  "name": "Tên thiết bị",
  "year": 2000,
  "category": "phone",
  "emoji": "📱",
  "description": "Mô tả ngắn gọn",
  "memories": "Ký ức về thiết bị",
  "specifications": {
    "CPU": "...",
    "RAM": "..."
  },
  "tags": ["tag1", "tag2"]
}
```

### Qua Database

Thêm trực tiếp vào file `backend/src/scripts/seed.js` và chạy lại:

```bash
cd backend
npm run seed
```

## 🎨 Tùy chỉnh giao diện

Màu sắc được định nghĩa trong `frontend/src/app/globals.css`:

```css
:root {
  --primary-color: #ff6b6b;      /* Màu chính */
  --secondary-color: #4ecdc4;    /* Màu phụ */
  --accent-color: #ffe66d;       /* Màu nhấn */
  --dark-bg: #1a1a2e;            /* Nền tối */
  --card-bg: #16213e;            /* Nền card */
  --text-light: #f1f1f1;         /* Chữ sáng */
  --text-muted: #a0a0a0;         /* Chữ mờ */
}
```

## 🌐 Deployment

### Backend

**Heroku / Railway / Render:**
```bash
# Set environment variables
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
FRONTEND_URL=<your-frontend-url>
NODE_ENV=production

# Deploy
git push heroku main
```

**VPS (Ubuntu):**
```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start src/index.js --name retro-electronics-api

# Setup nginx reverse proxy
```

### Frontend

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL=<your-backend-url>
```

**Netlify:**
```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

## 📱 Thiết bị có sẵn

Database đã có sẵn 12 thiết bị điện tử huyền thoại:

1. **Nokia 1110** (2005) - Điện thoại huyền thoại với độ bền vô địch
2. **Sony Walkman WM-2** (1985) - Máy nghe nhạc cassette di động
3. **Nintendo Game Boy** (1989) - Máy chơi game cầm tay huyền thoại
4. **Commodore 64** (1982) - Máy tính gia đình phổ biến nhất thập niên 80
5. **Sony Discman D-50** (1990) - Máy nghe nhạc CD di động
6. **Motorola RAZR V3** (2004) - Điện thoại nắp gập mỏng nhất
7. **Sony PlayStation 1** (1994) - Máy chơi game thế hệ đầu tiên dùng CD
8. **Apple iPod Classic** (2001) - Máy nghe nhạc MP3 cách mạng
9. **Canon AE-1** (1976) - Máy ảnh film SLR 35mm
10. **Casio Calculator Watch** (1985) - Đồng hồ tích hợp máy tính
11. **Polaroid SX-70** (1972) - Máy ảnh chụp lấy liền
12. **Sega Dreamcast** (1999) - Máy chơi game 128-bit của Sega

## 🔧 Troubleshooting

### Backend không kết nối được MongoDB
```bash
# Kiểm tra MongoDB đang chạy
mongosh

# Kiểm tra connection string trong .env
# Đảm bảo MongoDB URI đúng format
```

### Frontend không gọi được API
```bash
# Kiểm tra NEXT_PUBLIC_API_URL trong .env.local
# Đảm bảo backend đang chạy
# Kiểm tra CORS settings trong backend
```

### Lỗi khi seed database
```bash
# Xóa database cũ
mongosh
use retro-electronics
db.dropDatabase()

# Chạy lại seed
npm run seed
```

## 💡 Ý tưởng mở rộng

- [ ] **Authentication**: Đăng nhập/đăng ký người dùng
- [ ] **Comments**: Cho phép người dùng bình luận
- [ ] **User Profiles**: Profile cá nhân với thiết bị yêu thích
- [ ] **Image Upload**: Upload ảnh thật cho thiết bị
- [ ] **Admin Dashboard**: Quản lý thiết bị qua giao diện
- [ ] **Social Sharing**: Chia sẻ lên social media
- [ ] **Advanced Filters**: Lọc theo năm, tags, thông số
- [ ] **Compare Feature**: So sánh nhiều thiết bị
- [ ] **Timeline View**: Xem thiết bị theo timeline
- [ ] **Export/Import**: Xuất/nhập dữ liệu JSON

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Tech Stack

**Frontend:**
- Next.js 14
- TypeScript
- React 18
- Axios
- Framer Motion
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- CORS

---

**Made with ❤️ and nostalgia | 2025**

Nếu bạn thích dự án này, hãy cho ⭐ trên GitHub!
