# 📱 Hoài Niệm Thiết Bị Điện Tử | Retro Tech Memories

Một trang blog đẹp mắt để lưu trữ và hoài niệm về các thiết bị điện tử huyền thoại qua các thời kỳ.

## 🌟 Tính năng

- **Giao diện hiện đại**: Thiết kế đẹp mắt với gradient màu sắc, animations mượt mà
- **Responsive**: Hoạt động tốt trên mọi thiết bị (desktop, tablet, mobile)
- **Phân loại thiết bị**: Dễ dàng lọc theo danh mục (Điện thoại, Máy tính, Máy chơi game, Âm thanh, Máy ảnh)
- **Tìm kiếm**: Tìm kiếm nhanh thiết bị theo tên, mô tả hoặc năm
- **Chi tiết thiết bị**: Xem thông tin chi tiết và ký ức về từng thiết bị
- **Phong cách retro**: Kết hợp giữa thiết kế hiện đại và cảm giác hoài cổ

## 🚀 Cách sử dụng

### Chạy local

1. Clone hoặc tải xuống repository này
2. Mở file `index.html` trong trình duyệt web
3. Hoặc chạy một web server đơn giản:

```bash
# Python 3
python -m http.server 8000

# Hoặc Python 2
python -m SimpleHTTPServer 8000

# Sau đó mở http://localhost:8000 trong trình duyệt
```

### Cấu trúc dự án

```
workspace/
├── index.html      # Trang HTML chính
├── styles.css      # File CSS với thiết kế đẹp mắt
├── script.js       # JavaScript logic và dữ liệu thiết bị
└── README.md       # File này
```

## 📝 Thêm thiết bị mới

Để thêm thiết bị mới vào blog, chỉnh sửa file `script.js` và thêm object mới vào array `devices`:

```javascript
{
    id: 13, // ID duy nhất
    name: "Tên thiết bị",
    year: 2000, // Năm ra mắt
    category: "phone", // phone, computer, console, audio, camera
    emoji: "📱", // Emoji đại diện
    description: "Mô tả ngắn gọn về thiết bị",
    memories: "Những ký ức, câu chuyện về thiết bị này"
}
```

## 🎨 Tùy chỉnh giao diện

Bạn có thể tùy chỉnh màu sắc trong file `styles.css` bằng cách thay đổi các biến CSS:

```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #ffe66d;
    --dark-bg: #1a1a2e;
    --card-bg: #16213e;
    /* ... các biến khác */
}
```

## 📱 Thiết bị có sẵn

Blog đã có sẵn 12 thiết bị điện tử huyền thoại:

- Nokia 1110 (2005)
- Sony Walkman (1985)
- Nintendo Game Boy (1989)
- Commodore 64 (1982)
- Sony Discman (1990)
- Motorola RAZR V3 (2004)
- Sony PlayStation 1 (1994)
- iPod Classic (2001)
- Canon AE-1 (1976)
- Casio Calculator Watch (1980)
- Polaroid SX-70 (1972)
- Sega Dreamcast (1999)

## 💡 Ý tưởng mở rộng

- Thêm khả năng lưu trữ dữ liệu với Local Storage hoặc Backend
- Cho phép người dùng thêm thiết bị của riêng họ
- Thêm hình ảnh thật thay vì emoji
- Tích hợp comments để người dùng chia sẻ ký ức
- Export/Import dữ liệu dưới dạng JSON

## 🌐 Triển khai

Blog có thể được triển khai miễn phí trên:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## 📄 License

Dự án này được tạo để sử dụng tự do. Bạn có thể sử dụng, chỉnh sửa và phân phối theo ý muốn.

---

**Được tạo với ❤️ và hoài niệm**
