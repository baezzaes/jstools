// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://jstools-app.vercel.app',  // 본인의 도메인으로 설정
  generateRobotsTxt: true,  // robots.txt 파일 생성 여부
  exclude: ['/test', '/test/*', '/guide/image-compress'], // 개발용/임시 라우트와 리디렉션 URL은 sitemap에서 제외
  // 빌드 시각을 콘텐츠 수정일로 표시하지 않습니다.
  autoLastmod: false,
  changefreq: 'monthly',
  priority: 0.7,            // 기본 우선순위
  sitemapSize: 7000,        // 사이트맵에 포함될 최대 URL 수
}
