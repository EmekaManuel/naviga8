// // generateSitemap.js
// const fs = require('fs');
// const { SitemapStream, streamToPromise } = require('sitemap');

// // Import your content data or a database connection here

// async function generateSitemap() {
//   const sitemap = new SitemapStream({ hostname: 'https://www.gettruckdispatch.com' });

//   // Add URLs to the sitemap dynamically based on your content
//   sitemap.write({ url: '/', changefreq: 'daily', priority: 0.9 });
//   sitemap.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });
//   sitemap.write({ url: '/shippers', changefreq: 'weekly', priority: 0.7 });
//   sitemap.write({ url: '/transporters', changefreq: 'weekly', priority: 0.6 });
//   sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.5 });
//   sitemap.write({ url: '/faqs', changefreq: 'weekly', priority: 0.4 });

//   // Fetch content data and generate URLs

//   // ...

//   // End the sitemap
//   sitemap.end();

//   const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());

//   fs.writeFileSync('./public/sitemap.xml', sitemapXML);
// }

// generateSitemap();
