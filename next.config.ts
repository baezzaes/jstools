import { NextConfig } from 'next'

// TypeScript에서는 직접 `export default`로 설정할 수 있습니다.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  // `next export`와 함께 이미지를 최적화하지 않도록 설정
  },
  output: 'export',  // 정적 사이트 export 설정
}

export default nextConfig
