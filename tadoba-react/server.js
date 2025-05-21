import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';

  let vite;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
    console.log('Vite Dev Server Loaded');
  } else {
    app.use(express.static(path.join(__dirname, 'dist/client')));
    console.log('Static files from dist/client served');
  }

  app.use(async (req, res, next) => {
    try {
      const url = req.originalUrl;
      console.log('➡️ Requested URL:', url);

      const templatePath = isProd
        ? path.join(__dirname, 'dist/client/index.html')
        : path.resolve(__dirname, 'index.html');

      let template = await fs.promises.readFile(templatePath, 'utf-8');
      console.log('✅ Template loaded');

      let render;
      if (!isProd) {
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
        console.log('✅ Dev mode render function loaded');
      } else {
        render = (await import('./dist/server/entry-server.js')).render;
        console.log('✅ Production mode render function loaded');
      }

      const { html } = await render(url);
      console.log('✅ Rendered App HTML');

      const finalHtml = template.replace(`<!--app-html-->`, html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
      console.log('✅ Final HTML sent to browser\n');
    } catch (e) {
      console.error('❌ SSR Error:', e);
      next(e);
    }
  });

  app.listen(5174, () => {
    console.log(`🚀 Server running at http://localhost:5174`);
  });
}

createServer();
