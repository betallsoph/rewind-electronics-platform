# 🎯 Complete Guide - Rewind Electronics (Go + Nuxt Edition)

## 📋 Tổng quan
Phiên bản mới của nền tảng hoài niệm thiết bị điện tử được viết hoàn toàn bằng **Golang** cho backend và **Nuxt 3 + Ionic Vue** cho frontend. Mọi thành phần Node.js/Next.js cũ đã được loại bỏ để đảm bảo codebase tinh gọn, dễ deploy và thống nhất.

---

## ⚙️ Backend (Golang)
### Cấu trúc chính
- `cmd/server/main.go` – entrypoint khởi chạy HTTP server.
- `internal/api` – router và HTTP handlers.
- `internal/repository` – store in-memory, logic lọc và tổng hợp dữ liệu.
- `internal/data/seed.json` – dataset phong phú (devices, memories, collections, achievements, dashboard).
- `internal/config` – đọc biến môi trường (`PORT`, `ALLOWED_ORIGINS`).

### Endpoint overview
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/health` | Kiểm tra tình trạng server |
| GET | `/api/devices` | Danh sách thiết bị với filter `category`, `era`, `search`, `rarity` |
| GET | `/api/devices/:id` | Thông tin chi tiết một thiết bị |
| POST | `/api/devices/compare` | Nhận `{"ids": []}` và trả về dữ liệu so sánh |
| GET | `/api/categories` | Danh sách danh mục |
| GET | `/api/memories` | Danh sách ký ức, filter `deviceId` |
| GET | `/api/collections` | Bộ sưu tập, filter `theme` |
| GET | `/api/achievements` | Thành tích có sẵn |
| GET | `/api/dashboard` | Thống kê tổng quan + highlights |

### Models tiêu biểu
- **Device**: metadata, era, rarity, specs, pricing, stats, liên kết predecessor/successor.
- **Memory**: câu chuyện người dùng, năm, địa điểm, upvotes, featured.
- **Collection**: chủ đề, màu sắc, danh sách thiết bị, lượt thích.
- **Achievement**: các badge khác nhau và điều kiện unlock.
- **Dashboard**: thống kê tổng số thiết bị, lượt xem, xu hướng, độ hiếm.

### Cấu hình & chạy thử
```bash
cd go-backend
cp .env.example .env   # tuỳ chọn
# ví dụ: ALLOWED_ORIGINS=http://localhost:3000
GOPROXY=off go run ./cmd/server
```
Server log mọi request, xử lý CORS linh hoạt và trả JSON chuẩn để frontend tiêu thụ.

---

## 🖥️ Frontend (Nuxt 3 + Ionic Vue)
### Kiến trúc
- **Nuxt 3**: sử dụng Nitro server và Composition API.
- **Ionic Vue**: IonCard, IonModal, IonChip, IonBadge... cho cảm giác mobile-first.
- **Pinia (auto-import)**: quản lý state nhẹ nhàng trong composables.
- **TypeScript**: định nghĩa types ở `types/index.ts` chia sẻ trong toàn app.

### Thành phần chính
| Component | Vai trò |
|-----------|---------|
| `HeroBanner.vue` | Glassmorphism hero với CTA và highlights |
| `DeviceGrid.vue` + `DeviceCard.vue` | Lưới thiết bị, filter category/rarity/era |
| `ComparisonDrawer.vue` | IonModal cho phép chọn & so sánh nhiều thiết bị |
| `StatsPanel.vue` | Số liệu tổng quan lấy từ `/api/dashboard` |
| `MemoryTimeline.vue` | Hiển thị ký ức theo thời gian |
| `CollectionsShowcase.vue` | Bộ sưu tập theo theme |
| `AchievementBoard.vue` | Thành tích và tiến trình |

### API layer
`composables/useApi.ts` cung cấp wrapper `fetchFromApi` đọc `NUXT_PUBLIC_API_BASE` và các helper (`getDevices`, `compareDevices`, `getDashboard`, ...).

### Chạy development
```bash
cd nuxt-frontend
npm install
npm run dev
```
Frontend mặc định gọi `http://localhost:8080/api`. Để đổi, tạo `.env` với `NUXT_PUBLIC_API_BASE`.

### Tối ưu UI/UX
- Glassmorphism và neon gradient cho cảm giác retro-futuristic.
- Lọc độ hiếm (rarity pills), category chips, era badges.
- Drawer và modal dùng Ionic nên tương thích mobile tốt.
- Lazy rendering & skeleton states trong grid.
- Responsive hoàn toàn: layout chuyển đổi từ lưới 1 cột → 4 cột theo breakpoints.

---

## 🔗 Data Flow
1. Nuxt khởi chạy `useAsyncData` ở trang chủ để lấy devices + dashboard ngay khi SSR.
2. Người dùng tương tác filter → gọi `getDevices` với query params → backend lọc dữ liệu in-memory.
3. Khi mở Comparison Drawer và chọn thiết bị → gửi POST `/devices/compare` → backend trả danh sách trích lọc.
4. Memory Timeline/Collections/Achievements đọc dữ liệu stateless từ API tương ứng.

---

## 🧪 Testing gợi ý
- **Backend**: dùng `curl` hoặc `httpie` để verify endpoints.
- **Frontend**: chạy `npm run lint` (khi bổ sung ESLint) và kiểm tra UI qua trình duyệt/Ionic devtools.

---

## 🗺️ Lộ trình mở rộng
- Thêm persistent storage (PostgreSQL/Mongo) bằng cách triển khai repository mới.
- Bổ sung endpoints POST/PUT để người dùng gửi memories thực.
- Tận dụng Ionic Capacitor để đóng gói app mobile native.
- Viết test tự động với Go `net/http/httptest` và Nuxt Vitest.

---

Với kiến trúc mới, dự án gọn nhẹ, triển khai đơn giản và giữ trọn tinh thần hoài niệm cùng UI hiện đại. Chỉ cần Go + Node là bạn đã sẵn sàng đưa Rewind Electronics lên mọi nền tảng! ⚡
