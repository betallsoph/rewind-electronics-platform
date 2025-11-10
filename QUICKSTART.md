# 🚀 Quick Start Guide (Go Backend + Nuxt Frontend)

## Prerequisites
- Go 1.21+
- Node.js 18+
- npm

## 1. Start the Go backend (3 phút)
```bash
cd go-backend
cp .env.example .env        # tuỳ chọn, chỉnh ALLOWED_ORIGINS nếu cần
GOPROXY=off go mod tidy     # đảm bảo module đầy đủ trong môi trường offline
go run ./cmd/server
```
✅ API sẵn sàng tại http://localhost:8080 với data từ `internal/data/seed.json`.

## 2. Chạy Nuxt 3 + Ionic frontend (2 phút)
```bash
cd nuxt-frontend
npm install
npm run dev
```
✅ Frontend chạy ở http://localhost:3000. Nếu backend ở host/port khác, chỉnh `NUXT_PUBLIC_API_BASE` trong `.env`.

## 3. Khám phá giao diện
- **Hero Banner**: CTA "Khám phá ký ức" với hiệu ứng glassmorphism.
- **Device Grid**: Filter theo category, era, rarity; click thiết bị để xem chi tiết.
- **Comparison Drawer**: Chọn 2-3 thiết bị rồi nhấn "So sánh ngay" để xem bảng so sánh.
- **Stats & Dashboard**: Thống kê tổng quan kéo từ `/api/dashboard`.
- **Memory Timeline**: Ký ức được hiển thị theo thời gian, filter theo thiết bị.
- **Collections & Achievements**: Các bộ sưu tập và thành tựu nổi bật từ dataset.

## 🛠️ Troubleshooting nhanh
| Vấn đề | Giải pháp |
|--------|-----------|
| Backend báo lỗi CORS | Thêm origin của frontend vào `ALLOWED_ORIGINS` trong `.env`. |
| Frontend không gọi được API | Kiểm tra `NUXT_PUBLIC_API_BASE` và chắc chắn backend đang chạy. |
| Lỗi go mod tải dependency | Dùng `GOPROXY=off go env -w GONOSUMDB=*` nếu môi trường cấm mạng. |
| Nuxt báo thiếu Ionic | Chạy lại `npm install` trong `nuxt-frontend`. |

## 📚 Tài liệu tiếp theo
- `COMPLETE_GUIDE.md` – hướng dẫn chi tiết từng module.
- `FEATURES.md` – danh sách đầy đủ tính năng UI/UX.
- `SUMMARY.md` – tổng hợp deliverables cho phiên bản mới.

Enjoy the new retro experience! 🎉
