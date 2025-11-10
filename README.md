# 📱 Hoài Niệm Thiết Bị Điện Tử | Retro Electronics (Go + Nuxt Edition)

> Một bản dựng lại toàn diện sử dụng **Go (net/http)** cho backend và **Nuxt 3 + Ionic Vue** cho frontend để kể lại hành trình của những thiết bị điện tử huyền thoại.
>
> _English summary available below._

[Quick Start (8 phút)](./QUICKSTART.md) · [Complete Guide](./COMPLETE_GUIDE.md) · [Features](./FEATURES.md) · [Summary](./SUMMARY.md)

---

## 🌟 Highlights

### 🎨 Frontend Excellence (Nuxt 3 + Ionic)
- **Glassmorphism landing** với hero, thống kê và lời kêu gọi hành động nổi bật.
- **Rarity filters & category pills** trong `nuxt-frontend/components/DeviceGrid.vue` giúp duyệt bộ sưu tập dễ dàng.
- **Comparison Drawer** hỗ trợ so sánh 2-3 thiết bị thông qua `/api/devices/compare`.
- **Memory Timeline** và **Collections Showcase** tái hiện câu chuyện hoài niệm.
- **Ionic components** (`ion-card`, `ion-modal`, `ion-badge`, `ion-button`) mang lại cảm giác mobile-native.

### 🔧 Backend Power (Go)
- **REST API** phục vụ thiết bị, danh mục, bộ sưu tập, thành tích, ký ức và dashboard.
- **In-memory repository** được seed bằng `internal/data/seed.json` để trải nghiệm ngay lập tức.
- **CORS cấu hình được** qua `.env` để frontend truy cập an toàn.
- **Kiến trúc rõ ràng**: `internal/api` (handlers), `internal/models`, `internal/repository`.

---

## 🏗️ Cấu trúc dự án
```text
workspace/
├── go-backend/
│   ├── cmd/server/main.go      # Điểm khởi động ứng dụng
│   ├── internal/api/           # Router và handlers
│   ├── internal/config/        # Đọc biến môi trường + CORS
│   ├── internal/data/seed.json # Dữ liệu mẫu phong phú
│   ├── internal/models/        # Định nghĩa domain
│   └── internal/repository/    # Truy vấn in-memory
│
├── nuxt-frontend/
│   ├── components/             # Hero, DeviceGrid, StatsPanel, ...
│   ├── composables/            # `useApi.ts` kết nối backend
│   ├── pages/                  # Trang index chính
│   ├── assets/styles/          # Chủ đề glassmorphism
│   └── plugins/                # Cấu hình Ionic
│
├── README.md                   # Tài liệu tổng quan (VI & EN)
├── QUICKSTART.md               # Checklist khởi động
├── COMPLETE_GUIDE.md           # Phân tích full-stack
├── FEATURES.md                 # Danh mục tính năng
└── SUMMARY.md                  # Tóm tắt bàn giao
```

---

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Go 1.21+
- Node.js 18+
- npm hoặc pnpm/yarn

### 1. Backend Go
```bash
cd go-backend
cp .env.example .env   # tuỳ chọn: thiết lập ORIGIN_ALLOWED
GOPROXY=off go mod tidy
go run ./cmd/server
# API chạy tại http://localhost:8080
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

### 2. Frontend Nuxt 3 + Ionic
```bash
cd nuxt-frontend
npm install
npm run dev
# UI chạy tại http://localhost:3000 và proxy đến http://localhost:8080/api
```
Để deploy production:
```bash
NUXT_PUBLIC_API_BASE=https://your-domain.example.com/api
npm run build
npm run preview
```

---

## 📦 Nội dung mẫu
`go-backend/internal/data/seed.json` bao gồm:
- 18+ thiết bị biểu tượng (Nokia 1110, Game Boy, Walkman, iPod Classic, ...).
- Metadata: thời kỳ, độ hiếm, thông số, giá gốc và định giá sưu tầm.
- Bộ sưu tập theo chủ đề, thành tích và dòng thời gian ký ức.

---

## 📚 Tài liệu bổ sung
- [QUICKSTART.md](./QUICKSTART.md) – Bắt đầu nhanh trong vài phút.
- [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) – Dive sâu vào kiến trúc, API, UI.
- [FEATURES.md](./FEATURES.md) – Liệt kê đầy đủ tính năng.
- [SUMMARY.md](./SUMMARY.md) – Tổng kết dự án Go + Nuxt.

---

## 🇬🇧 English Summary

### What is this?
A full-stack nostalgia experience rebuilt with a **Go (net/http)** backend and a **Nuxt 3 + Ionic Vue** frontend. The previous Node.js/Next.js stack has been archived to avoid directory conflicts; all active code lives inside `go-backend/` and `nuxt-frontend/`.

### Why it matters
- Modern, mobile-first UI with Ionic components and glassmorphism styling.
- Rich sample content so the app feels alive on first launch.
- Simple Go API that is easy to extend or swap for a database-backed repository later.

### How to run
Follow the steps in the setup section above—run the Go server, then start the Nuxt dev server that points to `http://localhost:8080/api` by default.

Happy exploring! 💾
