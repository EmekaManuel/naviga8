// api/sitemap.js
import { generateSitemap } from '../scripts/generateSitemap';

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(generateSitemap());
};
