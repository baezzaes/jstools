import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],  // 이미지 도메인 설정 (필요시 추가)
  },
  // output: 'export' 제거
}

export default nextConfig
