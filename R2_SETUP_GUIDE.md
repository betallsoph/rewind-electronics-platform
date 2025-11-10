# 🚀 Cloudflare R2 Setup Guide

## 📋 Tổng quan

Guide này hướng dẫn setup **Cloudflare R2** để lưu trữ ảnh cho Retro Electronics app. R2 là dịch vụ object storage tương thích S3, **KHÔNG TỐN PHÍ BANDWIDTH** - rất tiết kiệm chi phí!

## ⚡ Quick Stats

- **Free tier**: 10GB storage miễn phí
- **Bandwidth**: MIỄN PHÍ hoàn toàn (không giới hạn)
- **Pricing**: $0.015/GB storage/tháng (sau 10GB)
- **Tốc độ**: Cloudflare CDN toàn cầu

---

## 🔧 Bước 1: Tạo Cloudflare Account

1. Truy cập https://dash.cloudflare.com/sign-up
2. Đăng ký tài khoản (miễn phí)
3. Xác thực email

---

## 🪣 Bước 2: Tạo R2 Bucket

### 2.1. Enable R2

1. Đăng nhập vào Cloudflare Dashboard
2. Chọn **R2** từ sidebar bên trái
3. Click **Purchase R2 Plan** (Free plan)
4. Confirm

### 2.2. Tạo Bucket

1. Click **Create bucket**
2. Nhập tên bucket: `retro-electronics-media`
3. Chọn location: **Automatic** (hoặc gần bạn nhất)
4. Click **Create bucket**

### 2.3. Enable Public Access

1. Vào bucket vừa tạo
2. Tab **Settings** → **Public Access**
3. Click **Allow Access**
4. Copy **Public Bucket URL**: `https://pub-xxxxx.r2.dev`
   - Lưu URL này, bạn sẽ cần nó cho env variables

---

## 🔑 Bước 3: Tạo API Token

### 3.1. Create API Token

1. Từ R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API Token**
3. Điền thông tin:
   - **Token name**: `retro-electronics-app`
   - **Permissions**: 
     - ✅ Object Read & Write
     - ✅ (Optional) Object Delete nếu cần
   - **TTL**: Forever (hoặc thời gian bạn muốn)
   - **Bucket**: Chọn `retro-electronics-media` (hoặc All buckets)
4. Click **Create API Token**

### 3.2. Lưu Credentials

Bạn sẽ thấy 3 thông tin quan trọng:

```
Access Key ID: xxxxxxxxxxxxx
Secret Access Key: yyyyyyyyyyyyyyyyyyyy
Endpoint for S3 Clients: https://<account-id>.r2.cloudflarestorage.com
```

⚠️ **LƯU Ý**: Secret Access Key chỉ hiển thị 1 lần! Copy ngay!

---

## ⚙️ Bước 4: Setup Backend

### 4.1. Install Dependencies

```bash
cd backend
npm install
```

Dependencies đã được thêm sẵn:
- `@aws-sdk/client-s3` - S3-compatible client
- `@aws-sdk/s3-request-presigner` - Generate presigned URLs
- `multer` - Handle multipart/form-data
- `uuid` - Generate unique filenames

### 4.2. Configure Environment Variables

Tạo file `.env` trong folder `backend`:

```bash
cp .env.example .env
```

Cập nhật file `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/retro-electronics

# Cloudflare R2 Configuration
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key-id-from-step-3
R2_SECRET_ACCESS_KEY=your-secret-access-key-from-step-3
R2_BUCKET_NAME=retro-electronics-media
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

**Thay thế:**
- `<account-id>` → Account ID từ Cloudflare
- `your-access-key-id-from-step-3` → Access Key ID từ bước 3
- `your-secret-access-key-from-step-3` → Secret Access Key từ bước 3
- `https://pub-xxxxx.r2.dev` → Public URL từ bước 2.3

---

## 🎨 Bước 5: Setup Frontend

### 5.1. Install Dependencies

```bash
cd frontend
npm install
```

Dependency đã được thêm:
- `react-dropzone` - Drag & drop upload component

### 5.2. Configure Environment Variables

Tạo file `.env.local` trong folder `frontend`:

```bash
cp .env.local.example .env.local
```

File `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

⚠️ **LƯU Ý**: Frontend KHÔNG cần R2 credentials! Mọi upload đi qua backend.

---

## 🚀 Bước 6: Test Upload

### 6.1. Start Backend

```bash
cd backend
npm run dev
```

Backend chạy tại: `http://localhost:5000`

### 6.2. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend chạy tại: `http://localhost:3000`

### 6.3. Test Upload

1. Mở app tại `http://localhost:3000`
2. Click nút **"Add Device"** (cần implement button này)
3. Upload ảnh qua drag-drop
4. Fill form và submit
5. Kiểm tra ảnh hiển thị trên card

### 6.4. Verify R2

1. Vào Cloudflare Dashboard → R2 → Bucket
2. Bạn sẽ thấy file được upload trong folder `images/`
3. Click vào file để xem URL public

---

## 📁 File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── r2.js                 # R2 client configuration
│   ├── middleware/
│   │   └── upload.js             # Multer + R2 upload logic
│   ├── routes/
│   │   ├── upload.js             # Upload API routes
│   │   └── devices.js            # Updated with image support
│   └── models/
│       ├── Device.js             # Added imageUrl, imageKey fields
│       └── Memory.js             # Added avatarUrl, photos

frontend/
├── src/
│   ├── components/
│   │   ├── ImageUpload.tsx       # Drag-drop upload component
│   │   ├── ImageUpload.module.css
│   │   ├── DeviceFormModal.tsx   # Form với upload
│   │   ├── DeviceFormModal.module.css
│   │   ├── DeviceCard.tsx        # Updated để hiện ảnh
│   │   └── DeviceCard.module.css
│   └── lib/
│       └── upload.ts             # Upload API helpers
```

---

## 🔥 API Endpoints

### 1. Upload Single Image

```bash
POST /api/upload/single
Content-Type: multipart/form-data

# Form data:
image: [File]

# Response:
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "url": "https://pub-xxxxx.r2.dev/images/uuid.jpg",
    "key": "images/uuid.jpg",
    "size": 123456,
    "mimetype": "image/jpeg"
  }
}
```

### 2. Upload Multiple Images

```bash
POST /api/upload/multiple
Content-Type: multipart/form-data

# Form data:
images: [File, File, File]  # Max 5 files

# Response:
{
  "success": true,
  "message": "3 files uploaded successfully",
  "data": [
    { "url": "...", "key": "...", "size": ..., "mimetype": "..." },
    { "url": "...", "key": "...", "size": ..., "mimetype": "..." },
    { "url": "...", "key": "...", "size": ..., "mimetype": "..." }
  ]
}
```

### 3. Delete Image

```bash
DELETE /api/upload/images/uuid.jpg

# Response:
{
  "success": true,
  "message": "File deleted successfully"
}
```

### 4. Create Device with Image

```bash
POST /api/devices
Content-Type: multipart/form-data

# Form data:
name: "Nokia 1110"
year: 2005
category: "phone"
emoji: "📱"
description: "..."
memories: "..."
deviceImage: [File]

# Response: Device object with imageUrl, imageKey
```

---

## 🎯 Usage trong Frontend

### Upload trong Component

```tsx
import ImageUpload from '@/components/ImageUpload';
import { uploadSingleImage } from '@/lib/upload';

function MyComponent() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const handleUpload = async () => {
    if (!imageFile) return;
    
    try {
      const result = await uploadSingleImage(imageFile);
      console.log('Uploaded:', result.data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  
  return (
    <ImageUpload
      onImageSelected={setImageFile}
      onImageRemove={() => setImageFile(null)}
    />
  );
}
```

### Create Device với Image

```tsx
import { createDeviceWithImage } from '@/lib/upload';

const handleSubmit = async (formData, imageFile) => {
  try {
    const result = await createDeviceWithImage(formData, imageFile);
    console.log('Device created:', result.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🛡️ Security Best Practices

### 1. File Validation
- ✅ Chỉ chấp nhận image files
- ✅ Max size: 5MB
- ✅ Allowed types: JPEG, PNG, GIF, WebP

### 2. Production Security
- 🔒 Add authentication middleware
- 🔒 Rate limiting (10 uploads/phút/user)
- 🔒 Virus scanning (ClamAV integration)
- 🔒 Image optimization (sharp library)

### 3. Environment Variables
- 🔑 KHÔNG commit `.env` files
- 🔑 Dùng secrets manager cho production
- 🔑 Rotate API keys định kỳ

---

## 💰 Cost Estimation

### Scenario 1: Small App (100 devices, 1000 users/tháng)
- Storage: ~5GB = **$0** (free tier)
- Bandwidth: ~50GB = **$0** (miễn phí)
- **Total: $0/tháng**

### Scenario 2: Medium App (1000 devices, 10k users/tháng)
- Storage: 50GB = $0.60/tháng
- Bandwidth: 500GB = **$0** (miễn phí)
- **Total: ~$1/tháng**

### Scenario 3: Large App (10k devices, 100k users/tháng)
- Storage: 200GB = $2.85/tháng
- Bandwidth: 5TB = **$0** (miễn phí)
- **Total: ~$3/tháng**

🎉 **So với S3**: Tiết kiệm 80-90% chi phí bandwidth!

---

## 🐛 Troubleshooting

### Error: "Invalid credentials"
- Kiểm tra R2_ACCESS_KEY_ID và R2_SECRET_ACCESS_KEY
- Đảm bảo API token chưa expired

### Error: "Bucket not found"
- Kiểm tra R2_BUCKET_NAME đúng tên
- Kiểm tra bucket tồn tại trong Cloudflare

### Error: "Access denied"
- Enable public access cho bucket
- Kiểm tra API token có quyền Read & Write

### Upload thành công nhưng không hiện ảnh
- Kiểm tra R2_PUBLIC_URL đúng format
- Verify file tồn tại trong bucket
- Check CORS settings

---

## 🎨 Next Steps

### 1. Image Optimization
- Install `sharp`: `npm install sharp`
- Resize images trước khi upload
- Generate thumbnails (150x150, 400x400)

### 2. Custom Domain
- Setup Cloudflare Workers
- Map custom domain: `media.yourdomain.com`
- Enable HTTPS

### 3. Advanced Features
- Image transformations (crop, rotate)
- Watermarking
- Format conversion (WebP, AVIF)
- Lazy loading

---

## 📚 Resources

- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [React Dropzone](https://react-dropzone.js.org/)

---

**Setup xong rồi! 🎉**

Nếu có vấn đề gì, check console logs hoặc Cloudflare dashboard.
