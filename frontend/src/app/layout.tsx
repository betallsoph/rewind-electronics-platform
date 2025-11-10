import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hoài Niệm Thiết Bị Điện Tử | Retro Electronics',
  description: 'Một trang blog đẹp mắt để lưu trữ và hoài niệm về các thiết bị điện tử huyền thoại qua các thời kỳ',
  keywords: ['electronics', 'retro', 'vintage', 'nostalgia', 'technology', 'devices'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
