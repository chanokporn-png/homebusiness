/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ทำ static export
  experimental: {
    appDir: true      // ถ้าใช้โฟลเดอร์ app/
  }
}

module.exports = nextConfig;
