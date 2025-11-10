# 🧪 R2 Integration Testing Guide

## Pre-requisites
- ✅ R2 bucket created and configured
- ✅ Environment variables set
- ✅ Dependencies installed
- ✅ Backend and Frontend running

---

## 🔥 Manual Testing Steps

### Test 1: Backend Upload API

#### 1.1 Test Single Image Upload
```bash
# Prepare a test image (test.jpg)

# Upload via curl
curl -X POST http://localhost:5000/api/upload/single \
  -F "image=@test.jpg"

# Expected response:
# {
#   "success": true,
#   "message": "File uploaded successfully",
#   "data": {
#     "url": "https://pub-xxxxx.r2.dev/images/uuid.jpg",
#     "key": "images/uuid.jpg",
#     "size": 123456,
#     "mimetype": "image/jpeg"
#   }
# }
```

#### 1.2 Test Multiple Images Upload
```bash
curl -X POST http://localhost:5000/api/upload/multiple \
  -F "images=@test1.jpg" \
  -F "images=@test2.jpg" \
  -F "images=@test3.jpg"

# Expected: Array of 3 uploaded files
```

#### 1.3 Test File Validation
```bash
# Test oversized file (> 5MB)
# Expected: Error with message about file size

# Test invalid file type (.txt)
# Expected: Error with message about file type
```

---

### Test 2: Device Creation with Image

#### 2.1 Create Device via API
```bash
curl -X POST http://localhost:5000/api/devices \
  -F "name=Test Device" \
  -F "year=2000" \
  -F "category=phone" \
  -F "emoji=📱" \
  -F "description=Test description" \
  -F "memories=Test memories" \
  -F "deviceImage=@device.jpg"

# Expected: Device object with imageUrl and imageKey populated
```

#### 2.2 Verify in R2 Dashboard
1. Go to Cloudflare Dashboard → R2 → Your bucket
2. Check if file exists in `images/` folder
3. Click file to see public URL
4. Open URL in browser → Should show image

#### 2.3 Verify in MongoDB
```bash
mongosh
use retro-electronics
db.devices.findOne({ name: "Test Device" })

# Check fields:
# - imageUrl: "https://pub-xxxxx.r2.dev/images/uuid.jpg"
# - imageKey: "images/uuid.jpg"
```

---

### Test 3: Device Update with New Image

#### 3.1 Update Device Image
```bash
# Get device ID from previous test
DEVICE_ID="..."

curl -X PUT http://localhost:5000/api/devices/$DEVICE_ID \
  -F "name=Updated Device" \
  -F "deviceImage=@new-device.jpg"

# Expected: Device with new imageUrl, old image deleted from R2
```

#### 3.2 Verify Old Image Deleted
1. Go to R2 Dashboard
2. Check that old image UUID is gone
3. Check new image UUID exists

---

### Test 4: Device Deletion with Image Cleanup

#### 4.1 Delete Device
```bash
DEVICE_ID="..."

curl -X DELETE http://localhost:5000/api/devices/$DEVICE_ID

# Expected: Success message
```

#### 4.2 Verify Image Cleanup
1. Check R2 Dashboard → Image should be deleted
2. Check MongoDB → Device should be deleted
3. Try accessing old image URL → 404

---

### Test 5: Frontend Integration

#### 5.1 Test ImageUpload Component
1. Open DevStories or create test page
2. Render `<ImageUpload />` component
3. **Test drag & drop:**
   - Drag image over component → Border should turn red
   - Drop image → Preview should appear
4. **Test click to upload:**
   - Click component → File dialog opens
   - Select image → Preview appears
5. **Test remove:**
   - Click X button → Preview disappears

#### 5.2 Test DeviceFormModal
1. Add button to open modal:
```tsx
<button onClick={() => setModalOpen(true)}>
  Add Device
</button>

<DeviceFormModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onSuccess={handleSuccess}
/>
```

2. **Test create flow:**
   - Open modal
   - Upload image
   - Fill form
   - Submit
   - Verify device appears in list with image

3. **Test edit flow:**
   - Open modal with existing device
   - Change image
   - Submit
   - Verify image updated

#### 5.3 Test DeviceCard Display
1. Create device with image
2. Check device card shows real image
3. Hover over card → Image should zoom
4. Create device without image
5. Check device card shows emoji fallback

---

### Test 6: Memory Creation with Avatar

#### 6.1 Create Memory with Avatar
```bash
curl -X POST http://localhost:5000/api/memories \
  -F "deviceId=<device-id>" \
  -F "username=Test User" \
  -F "title=My Memory" \
  -F "story=This is my story..." \
  -F "year=2005" \
  -F "location=Vietnam" \
  -F "avatar=@avatar.jpg"

# Expected: Memory with avatarUrl and avatarKey
```

#### 6.2 Delete Memory with Cleanup
```bash
curl -X DELETE http://localhost:5000/api/memories/<memory-id>

# Verify avatar deleted from R2
```

---

## 🚨 Error Scenarios to Test

### 1. Invalid File Type
```bash
curl -X POST http://localhost:5000/api/upload/single \
  -F "image=@test.txt"

# Expected: 400 error with message about file type
```

### 2. File Too Large
```bash
# Create 6MB file
dd if=/dev/zero of=large.jpg bs=1M count=6

curl -X POST http://localhost:5000/api/upload/single \
  -F "image=@large.jpg"

# Expected: 400 error with message about file size
```

### 3. Missing R2 Credentials
```bash
# Stop backend, remove R2 env vars, restart

curl -X POST http://localhost:5000/api/upload/single \
  -F "image=@test.jpg"

# Expected: 500 error with upload failure message
```

### 4. Invalid Bucket Name
```bash
# Change R2_BUCKET_NAME to wrong name

curl -X POST http://localhost:5000/api/upload/single \
  -F "image=@test.jpg"

# Expected: 500 error about bucket not found
```

### 5. Network Failure
```bash
# Disconnect internet, try upload

# Expected: Proper error handling and user-friendly message
```

---

## ✅ Checklist

### Backend
- [ ] Single image upload works
- [ ] Multiple images upload works
- [ ] File validation works (type, size)
- [ ] Device creation with image works
- [ ] Device update with image works
- [ ] Old image deleted on update
- [ ] Device deletion cleans up images
- [ ] Memory creation with avatar works
- [ ] Memory deletion cleans up avatar
- [ ] Error handling is proper

### Frontend
- [ ] ImageUpload component renders
- [ ] Drag & drop works
- [ ] Click to upload works
- [ ] Image preview shows
- [ ] Remove button works
- [ ] DeviceFormModal opens/closes
- [ ] Form submission works
- [ ] Loading states work
- [ ] Error messages display
- [ ] DeviceCard shows real images
- [ ] Image fallback to emoji works
- [ ] Hover zoom effect works

### R2 Integration
- [ ] Files upload to correct bucket
- [ ] Files have unique names (UUID)
- [ ] Files are in `images/` folder
- [ ] Public URLs work
- [ ] Files are deleted when needed
- [ ] No orphaned files left

### Security
- [ ] Only image files accepted
- [ ] File size limit enforced
- [ ] No path traversal possible
- [ ] Credentials not exposed

---

## 🐛 Common Issues

### Issue: Images upload but don't display
**Check:**
1. R2_PUBLIC_URL is correct
2. Bucket has public access enabled
3. Browser console for errors
4. Network tab for failed requests

**Fix:**
```bash
# Verify URL format
echo $R2_PUBLIC_URL  # Should be https://pub-xxxxx.r2.dev

# Test URL manually
curl https://pub-xxxxx.r2.dev/images/<your-uuid>.jpg
```

### Issue: Upload returns 500 error
**Check:**
1. Backend logs for details
2. R2 credentials are correct
3. Bucket exists

**Fix:**
```bash
# Test R2 connection
node -e "
const { r2Client, R2_BUCKET_NAME } = require('./src/config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
r2Client.send(new ListObjectsV2Command({ Bucket: R2_BUCKET_NAME }))
  .then(() => console.log('✅ R2 connection OK'))
  .catch(err => console.error('❌ R2 error:', err));
"
```

### Issue: CORS errors
**Check:**
1. Backend CORS settings
2. Frontend API URL

**Fix:**
```javascript
// backend/src/index.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Issue: Old images not deleted
**Check:**
1. Backend logs for deletion errors
2. R2 API token has delete permission

**Fix:**
- Recreate API token with delete permission
- Check imageKey is being saved correctly

---

## 📈 Performance Testing

### Load Test Upload Endpoint
```bash
# Install autocannon
npm install -g autocannon

# Test upload endpoint
autocannon -c 10 -d 30 \
  -m POST \
  -H "Content-Type: multipart/form-data" \
  http://localhost:5000/api/upload/single

# Expected: Handle at least 10 concurrent uploads
```

### Image Load Time
1. Open DevTools → Network
2. Load page with images
3. Check image load times
4. Should be < 500ms on good connection

---

## 🎉 Success Criteria

All tests pass ✅
- Backend uploads work
- Frontend components work  
- R2 integration works
- Images display correctly
- Cleanup works properly
- Error handling is robust

**You're ready to deploy!** 🚀
