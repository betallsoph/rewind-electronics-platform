# 📼 Rewind Electronics Platform (Go + Nuxt)

> Một trải nghiệm hoài niệm hoàn toàn mới được xây dựng lại từ đầu với **Golang** cho backend và **Nuxt 3 + Ionic Vue** cho frontend.

## ✨ Tổng quan
- **Go backend** thuần `net/http` cung cấp các endpoint RESTful để lấy thiết bị, danh mục, ký ức, bộ sưu tập, bảng thành tích và tổng quan dashboard.
- **Nuxt 3 frontend** kết hợp Ionic component library với hiệu ứng glassmorphism hiện đại, hỗ trợ lọc độ hiếm, so sánh thiết bị, timeline ký ức, bộ sưu tập và achievements.
- **Dataset phong phú** được seed trực tiếp từ `internal/data/seed.json`, mang lại cảm giác retro ngay khi chạy ứng dụng.

## 🏗️ Cấu trúc dự án
```
workspace/
├── go-backend/              # Golang API server
│   ├── cmd/server/main.go   # Điểm khởi động
│   ├── internal/api/        # HTTP handlers & router
│   ├── internal/config/     # Đọc biến môi trường & CORS
│   ├── internal/data/       # seed.json với đầy đủ thiết bị
│   ├── internal/models/     # Định nghĩa domain models
│   └── internal/repository/ # Store in-memory và logic lọc dữ liệu
│
├── nuxt-frontend/           # Nuxt 3 + Ionic Vue ứng dụng chính
│   ├── components/          # Hero banner, device grid, comparison drawer...
│   ├── composables/         # useApi.ts kết nối backend
│   ├── pages/               # Trang chủ
│   ├── assets/styles/       # Glassmorphism & retro theme
│   └── plugins/             # Ionic integration
│
├── README.md                # Tài liệu chính
├── QUICKSTART.md            # Hướng dẫn chạy nhanh
├── COMPLETE_GUIDE.md        # Tài liệu chi tiết full-stack
├── FEATURES.md              # Danh sách tính năng nổi bật
└── SUMMARY.md               # Tổng quan deliverables
```

## 🚀 Chạy thử trong 5 phút
### 1. Go Backend
```bash
cd go-backend
cp .env.example .env   # tuỳ chọn, dùng để cấu hình CORS
GOPROXY=off go mod tidy
go run ./cmd/server
# Server mặc định tại http://localhost:8080
```
Các endpoint chính:
- `GET /api/health`
- `GET /api/devices?category=&era=&search=&rarity=`
- `GET /api/devices/:id`
- `POST /api/devices/compare`
- `GET /api/categories`
- `GET /api/memories?deviceId=`
- `GET /api/collections?theme=`
- `GET /api/achievements`
- `GET /api/dashboard`

### 2. Nuxt Frontend
```bash
cd nuxt-frontend
npm install
npm run dev
# Ứng dụng chạy tại http://localhost:3000 và gọi API Go qua http://localhost:8080/api
```
Cấu hình base URL khi deploy production:
```bash
NUXT_PUBLIC_API_BASE=https://your-domain.example.com/api
```

## 🌈 Điểm nhấn giao diện Nuxt + Ionic
- **Glassmorphism hero** với slogan retro & CTA.
- **Bộ lọc độ hiếm** (Common → Legendary) và category pills ngay trong `DeviceGrid`.
- **Comparison Drawer** cho phép chọn 2-3 thiết bị và hiển thị so sánh chi tiết từ API `/devices/compare`.
- **Stats Panel** với số liệu tổng quan từ endpoint `/dashboard`.
- **Memory Timeline** hiển thị ký ức theo từng thiết bị.
- **Collections Showcase** và **Achievement Board** tái hiện bộ sưu tập & thành tích.
- **Ionic components** (ion-card, ion-modal, ion-badge, ion-button) kết hợp cùng animation tinh tế tạo cảm giác app mobile hiện đại.

## 🧠 Dữ liệu mẫu
Bộ dữ liệu trong `go-backend/internal/data/seed.json` bao gồm:
- 18+ thiết bị từ Nokia 1110, Game Boy, Walkman đến iPod Classic.
- Thông tin era, rarity, specs, giá trị nguyên bản và giá trị sưu tầm.
- Dòng ký ức (memories), bộ sưu tập (collections) theo chủ đề, thành tích (achievements) và thống kê dashboard.

## 📚 Tài liệu liên quan
- [QUICKSTART.md](./QUICKSTART.md) – chạy nhanh backend & frontend.
- [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) – hướng dẫn chi tiết tính năng, API, UI.
- [FEATURES.md](./FEATURES.md) – liệt kê mọi điểm nhấn giao diện & trải nghiệm.
- [SUMMARY.md](./SUMMARY.md) – tổng kết deliverables của phiên bản Go + Nuxt.

---
**Made with ❤️ in Go + Vue**
