# 🚀 Tính Năng Nổi Bật - Rewind Electronics (Go + Nuxt)

## 🎨 Giao diện glassmorphism + Ionic
- Hero banner mờ ảo với gradient retro.
- Thẻ thiết bị (IonCard) có hiệu ứng hover nhẹ và badge độ hiếm.
- Drawer so sánh dùng IonModal với transition mượt.
- Badge era & rarity đổi màu theo dữ liệu.
- Layout responsive tối ưu cho mobile, tablet, desktop.

## 🌟 Tính năng chính trên frontend
### 1. Device Explorer
- Lưới thiết bị với filter theo **category**, **era**, **rarity**, **keyword**.
- Card hiển thị emoji, năm phát hành, rarity, thống kê upvote/view.
- Click card mở chi tiết (modal) với specs, giá trị, liên kết predecessor/successor.

### 2. Comparison Drawer
- Thu thập lựa chọn 2-3 thiết bị.
- Gửi request tới `/api/devices/compare` và hiển thị bảng đối chiếu specs, stats, giá.
- Đánh dấu thiết bị nổi bật dựa trên upvotes.

### 3. Memory Timeline
- Timeline dọc kể các câu chuyện kỷ niệm.
- Filter nhanh theo thiết bị được chọn.
- Giao diện ion-item + ion-chip tạo cảm giác app mobile.

### 4. Collections Showcase
- Bộ sưu tập chủ đề (Retro Gaming, Audio Lovers...).
- Mỗi bộ sưu tập hiển thị màu sắc, mô tả, số thiết bị và lượt thích.

### 5. Achievement Board
- Danh sách thành tích với progress hiện tại.
- Badge icon và mô tả rõ ràng.
- Sử dụng dữ liệu từ `/api/achievements`.

### 6. Dashboard Stats
- Tổng hợp số liệu (tổng thiết bị, ký ức, lượt upvote...).
- Danh sách "Trending" và "Most Recent" dựa trên endpoint `/api/dashboard`.

## 🔌 Backend capabilities (Go)
- API thuần `net/http` với router tối giản.
- Lọc nâng cao cho danh sách thiết bị (category, era, rarity, search).
- In-memory repository hiệu suất cao, dễ thay thế bằng DB khác.
- CORS linh hoạt cấu hình qua `.env`.
- Logging request mặc định, phản hồi JSON chuẩn.

## 📦 Dataset mặc định
- 18+ thiết bị với thông tin chi tiết (era, rarity, specs, giá trị).
- 12 ký ức gắn với nhiều thiết bị và địa điểm khác nhau.
- 6 bộ sưu tập theo chủ đề.
- 8 achievement badges sẵn sàng hiển thị.
- Dashboard summary: phân bổ độ hiếm, top devices, trend, era breakdown.

## 🔮 Ý tưởng mở rộng
- Thêm endpoint POST để người dùng gửi ký ức mới.
- Kết nối repository với PostgreSQL/MongoDB.
- Bổ sung realtime update bằng WebSocket hoặc Server Sent Events.
- Xuất bản ứng dụng dưới dạng Ionic Capacitor mobile app.
- Triển khai CI/CD build Go + Nuxt với Docker multi-stage.

Phiên bản Go + Nuxt mang đến nền tảng retro hiện đại, linh hoạt và dễ mở rộng cho mọi dự án hoài niệm của bạn! ✨
