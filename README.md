# 📼 Rewind Electronics Platform (Go Backend + Nuxt 3 Frontend)

> A from-scratch rebuild of the nostalgia-driven electronics experience powered by a **Go (net/http)** API and a **Nuxt 3 + Ionic Vue** UI.
>
> _Bản dịch tiếng Việt được đặt ở cuối tài liệu._

## ✨ What you'll find
- **Production-ready Go backend** exposing REST endpoints for devices, categories, collections, achievements, memories, comparisons, and dashboard stats with configurable CORS.
- **Nuxt 3 + Ionic frontend** delivering a glassmorphism-inspired interface with rarity filtering, multi-device comparison, animated stats, and retro storytelling.
- **Rich sample dataset** shipped in `go-backend/internal/data/seed.json` so the experience feels alive on first run.

## 🏗 Project structure
```
workspace/
├── go-backend/              # Golang API server
│   ├── cmd/server/main.go   # Application entrypoint
│   ├── internal/api/        # HTTP handlers & router wiring
│   ├── internal/config/     # Environment + CORS configuration
│   ├── internal/data/       # seed.json with nostalgia content
│   ├── internal/models/     # Domain models
│   └── internal/repository/ # In-memory data store & query helpers
│
├── nuxt-frontend/           # Nuxt 3 + Ionic Vue application
│   ├── components/          # Hero banner, device grid, comparison drawer…
│   ├── composables/         # `useApi.ts` backend integration
│   ├── pages/               # Landing page
│   ├── assets/styles/       # Glassmorphism + retro styling
│   └── plugins/             # Ionic setup
│
├── README.md                # This overview (EN + VI)
├── QUICKSTART.md            # Quick start checklist
├── COMPLETE_GUIDE.md        # Full-stack deep dive
├── FEATURES.md              # Feature catalogue
└── SUMMARY.md               # Delivery summary
```

## 🚀 Run the stack in minutes
### 1. Go backend
```bash
cd go-backend
cp .env.example .env   # optional – configure allowed origins
GOPROXY=off go mod tidy
go run ./cmd/server
# API lives at http://localhost:8080 by default
```
Key endpoints:
- `GET /api/health`
- `GET /api/devices?category=&era=&search=&rarity=`
- `GET /api/devices/:id`
- `POST /api/devices/compare`
- `GET /api/categories`
- `GET /api/memories?deviceId=`
- `GET /api/collections?theme=`
- `GET /api/achievements`
- `GET /api/dashboard`

### 2. Nuxt frontend
```bash
cd nuxt-frontend
npm install
npm run dev
# The UI runs on http://localhost:3000 and calls the Go API on http://localhost:8080/api
```
For production deployments, configure:
```bash
NUXT_PUBLIC_API_BASE=https://your-domain.example.com/api
```

## 🌈 Nuxt + Ionic UI highlights
- **Glassmorphism hero** with retro tagline and call-to-action.
- **Rarity filters** (Common → Legendary) and category pills inside `DeviceGrid`.
- **Comparison Drawer** that lets you stack 2–3 devices and renders details from `/devices/compare`.
- **Stats Panel** powered by `/dashboard` metrics.
- **Memory Timeline** that narrates per-device stories.
- **Collections Showcase** and **Achievement Board** for curated sets and gamified progress.
- **Ionic components** (`ion-card`, `ion-modal`, `ion-badge`, `ion-button`) blended with subtle animations for a mobile-native feel.

## 🧠 Sample content
`go-backend/internal/data/seed.json` ships with:
- 18+ iconic devices (Nokia 1110, Game Boy, Walkman, iPod Classic, …).
- Era, rarity, specs, original price, and collector valuation metadata.
- Memories, themed collections, achievements, and dashboard statistics to explore immediately.

## 📚 See also
- [QUICKSTART.md](./QUICKSTART.md) – streamlined setup.
- [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) – architecture, API, and UI details.
- [FEATURES.md](./FEATURES.md) – full feature breakdown.
- [SUMMARY.md](./SUMMARY.md) – delivery recap for this Go + Nuxt edition.

---

## 📼 Phiên bản tiếng Việt

> Một trải nghiệm hoài niệm được xây dựng lại từ đầu với **Go (net/http)** cho backend và **Nuxt 3 + Ionic Vue** cho giao diện.

### Điểm nổi bật
- API Go cung cấp đầy đủ endpoint cho thiết bị, danh mục, bộ sưu tập, thành tích, ký ức, so sánh và dashboard.
- Frontend Nuxt 3 + Ionic mang lại hiệu ứng glassmorphism, filter độ hiếm, so sánh đa thiết bị và storytelling retro.
- Dataset phong phú trong `go-backend/internal/data/seed.json` giúp bạn khám phá ngay lập tức.

### Chạy nhanh
```bash
cd go-backend && cp .env.example .env && go run ./cmd/server
cd nuxt-frontend && npm install && npm run dev
```
Frontend chạy tại http://localhost:3000 và gọi API Go tại http://localhost:8080/api.

Chúc bạn khám phá vui vẻ! 💾
