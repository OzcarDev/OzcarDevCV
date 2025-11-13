const fs = require('fs').promises;
const path = require('path');

async function readCNAME(baseDir) {
  try {
    const cname = (await fs.readFile(path.join(baseDir, 'CNAME'), 'utf8')).trim();
    if (cname) return cname.replace(/\s+/g, '');
  } catch (e) {
    // ignore
  }
  return null;
}

async function walk(dir, cb) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['.git', 'node_modules'].includes(ent.name)) continue;
      await walk(full, cb);
    } else {
      await cb(full);
    }
  }
}

function toUrlPath(baseDir, filePath) {
  let rel = path.relative(baseDir, filePath).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.replace(/index.html$/, '');
  return '/' + rel;
}

function today() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

async function generate() {
  const baseDir = process.cwd();
  const domain = (await readCNAME(baseDir)) || 'example.com';
  const urls = new Set();
  const rootImages = [];

  await walk(baseDir, async (file) => {
    const lower = file.toLowerCase();
    if (!lower.endsWith('.html')) return;
    const rel = path.relative(baseDir, file);
    if (rel === 'sitemap.xml' || rel === 'robots.txt') return;
    urls.add(toUrlPath(baseDir, file));
  });

  // collect image files that live in the repository root (direct children)
  const imageExt = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
  await walk(baseDir, async (file) => {
    const rel = path.relative(baseDir, file).split(path.sep).join('/');
    const dir = path.posix.dirname(rel);
    const ext = path.extname(file).toLowerCase();
    if (dir === '.' && imageExt.has(ext)) {
      rootImages.push(rel);
    }
  });

  const date = today();
  const urlEntries = Array.from(urls).sort().map(p => {
    const isRoot = p === '/';
    const loc = `https://${domain}${p}`;
    const changefreq = isRoot ? 'weekly' : 'monthly';
    const priority = isRoot ? '1.0' : '0.6';

    // if this is the root URL, include root images as image:image entries
    let imageBlock = '';
    if (isRoot && rootImages.length > 0) {
      imageBlock = rootImages.map(img => {
        const imgUrl = `https://${domain}/${img}`;
        return `    <image:image>\n      <image:loc>${imgUrl}</image:loc>\n    </image:image>`;
      }).join('\n');
      imageBlock = '\n' + imageBlock + '\n';
    }

    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${imageBlock}  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlEntries}\n</urlset>\n`;

  await fs.writeFile(path.join(baseDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`Wrote sitemap.xml with ${urls.size} URL(s) using domain: ${domain}`);
}

if (require.main === module) {
  generate().catch(err => {
    console.error('Failed to generate sitemap:', err);
    process.exit(1);
  });
}

module.exports = { generate };
