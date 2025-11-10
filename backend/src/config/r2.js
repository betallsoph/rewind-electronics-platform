const { S3Client } = require('@aws-sdk/client-s3');

// Cloudflare R2 Configuration
// R2 is S3-compatible, so we use AWS SDK
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT, // e.g., https://<account-id>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // e.g., https://media.yourdomain.com or https://pub-xxxxx.r2.dev

module.exports = {
  r2Client,
  R2_BUCKET_NAME,
  R2_PUBLIC_URL,
};
