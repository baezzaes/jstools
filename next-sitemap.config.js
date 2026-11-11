// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://jstools-app.vercel.app',  // 본인의 도메인으로 설정
  generateRobotsTxt: true,  // robots.txt 파일 생성 여부
  exclude: ['/test', '/test/*', '/guide/image-compress', '/icon.png', '/apple-icon.png'], // 개발/리디렉션 경로와 아이콘 리소스 제외; 기존 페이지 목록 유지
  // 빌드 시각을 콘텐츠 수정일로 표시하지 않습니다.
  autoLastmod: false,
  changefreq: 'monthly',
  priority: 0.7,            // 기본 우선순위
  sitemapSize: 7000,        // 사이트맵에 포함될 최대 URL 수
}
