// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://jstools-app.vercel.app',  // 본인의 도메인으로 설정
  generateRobotsTxt: true,  // robots.txt 파일 생성 여부
  changefreq: 'daily',      // 사이트 업데이트 빈도
  priority: 0.7,            // 기본 우선순위
  sitemapSize: 7000,        // 사이트맵에 포함될 최대 URL 수
}
