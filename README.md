# nextjs-markdown-blog-starter

A scalable, high-performance, and SEO-focused blog starter powered by Next.js 15, Markdown, and TypeScript — designed collaboratively with AI (Claude 3.7 Sonnet) to explore intelligent architecture planning.

![Preview](./public/demo-preview.gif)

---

## 📌 About the project

A boilerplate for building modern blogs with a static generation strategy (SSG) using Next.js 15, Markdown, and TypeScript.  
Designed to be modular, scalable, and production-ready — with built-in support for categories, pagination, SEO, styling, and future API integration.

---

## 🤖 AI-driven architecture

This project was designed collaboratively with Claude 3.7 Sonnet via GitHub Copilot Pro.  
You can find the full prompt that guided the architecture in [`AI_PROMPT.md`](./AI_PROMPT.md).

Key decisions supported by AI:
- Blog architecture and folder structure
- Separation of data, rendering, and SEO concerns
- Scalable and modular design principles

---

## ⚙️ Technologies used

**Core Stack:**
- [Next.js 15](https://nextjs.org/)
- App Router
- Markdown (`.md`)
- TypeScript

**Styling:**
- [Tailwind CSS](https://tailwindcss.com/)
- SCSS (Sass)

**Utilities:**
- `gray-matter` (frontmatter parsing)
- `remark` or `rehype` (Markdown to HTML conversion)

**Others:**
- Dynamic SEO with `generateMetadata`
- Modular TypeScript structure
- Docker and Docker Compose (optional)

---

## 🧪 Getting started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 🔧 Using Node.js

```bash
git clone https://github.com/victornns/nextjs-markdown-blog-starter
cd nextjs-markdown-blog-starter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🐳 Using Docker Compose

```bash
docker-compose up dev
```

---

## 🚀 Building and deploying in production

### With Node.js

```bash
npm install
npm run build
npm start
```

### With Docker Compose

```bash
docker-compose up prod
```

---

## 🪄 Minimal setup (branch: `feat/minimal-setup`)

If you're looking for a lightweight base with only the essential files and no extras like Docker, README or config templates, check out the [`feat/minimal-setup`](https://github.com/victornns/nextjs-markdown-blog-starter/tree/feat/minimal-setup) branch.

It’s ideal for kickstarting your own custom blog structure.

---

## 📁 Project structure (summary)

```
/src/app/blog/
├── page.tsx                  // main blog list
├── [category]/               // category routes
│   ├── page.tsx
│   └── [slug]/page.tsx       // individual post pages
├── components/               // UI components
├── data/
│   ├── posts/                // markdown files
│   └── categories.json       // category metadata
├── lib/                      // utility functions
├── types/                    // TypeScript types
```

---

## 📚 Learn more

- [Next.js Documentation](https://nextjs.org/docs)

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).  
Distributed under the MIT License. See `LICENSE` for more information.