# AI_PROMPT.md

> ⚠️ **IMPORTANT:**  
> This file contains the main prompt used to guide AI models such as GitHub Copilot, Claude 3.7 Sonnet, or GPT-4o in generating and structuring this project.

---

## 🧠 Full Prompt (Blog with Next.js 15, Markdown, SEO, and Modular Architecture)

**Initial framing (for Copilot or other model):**

> Respond as a senior software engineer specialized in scalable web development using Next.js 15, App Router, Markdown, TypeScript, and modern SEO best practices.  
> Follow the instructions below strictly.  
> Write clean, modular, clear, and typed code focused on performance, scalability, and maintainability.  
> Avoid unnecessary code. Focus only on the specific implementation described.  
> Clearly state which files are being affected or created.

---

**Technical instructions:**

In my Next.js project structured under `/src/app`, create a new blog section at `/src/app/blog`, using the App Router.

The blog must include:

- `/src/app/blog/page.tsx`: Main page listing all posts.
- `/src/app/blog/[category]/page.tsx`: Page listing posts by category.
- `/src/app/blog/[category]/[slug]/page.tsx`: Individual blog post page.

Also create the following folders:

- `/src/app/blog/components/`: For reusable components like PostCard, Sidebar, Pagination, etc.
- `/src/app/blog/data/posts/`: To store the post files in `.md`.
- `/src/app/blog/data/categories.json`: File with all valid categories.
- `/src/app/blog/types/`: To define TypeScript types.
- `/src/app/blog/lib/`: For utility functions (e.g., getAllPosts, getPostBySlug, etc.).

---

**Post data:**

- Each post must be a `.md` file with the following required frontmatter:
  ```
  title: string  
  subtitle: string  
  slug: string  
  category: string  
  date: string (ISO)  
  excerpt: string  
  coverImage?: string  
  seoDescription?: string
  ```
- The Markdown content should be converted to HTML for rendering.
- Example path: `/src/app/blog/data/posts/o-que-e-ui-ux.md`

---

**Categories:**

- Create a file at `/src/app/blog/data/categories.json` containing all valid categories:
  ```json
  [
    {
      "slug": "design",
      "name": "Design",
      "description": "Posts about UX/UI",
      "coverImage": "/images/categories/design.jpg"
    },
    {
      "slug": "performance",
      "name": "Performance",
      "description": "Website optimization"
    }
  ]
  ```
- Create a `CategorySlug` type (e.g., `'design' | 'performance'`) and ensure the `category` field in each post matches a valid value from this list.

---

**Rendering and behavior:**

- On individual post pages, render:
  - `title`, `subtitle`, `date`, `category`, `estimated reading time`, and the post HTML content.
- Use semantic HTML tags: `<article>`, `<header>`, `<main>`, `<aside>`, `<footer>`, etc.
- Add dynamic SEO metadata using frontmatter:
  - `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `twitter:card`, etc.
- Clean, user-friendly URLs like: `/blog/design/o-que-e-ui-ux`
- Respect heading hierarchy (`h1`, `h2`, `h3`).

---

**Pagination:**

- Pagination is required for:
  - `/blog/page.tsx`
  - `/blog/[category]/page.tsx`
- Use a simple, functional `Pagination` component.

---

**Utility functions (inside `/lib/`):**

- `getAllPosts()`: Reads all `.md` files, parses frontmatter, returns posts ordered by date.
- `getPostBySlug(slug: string)`: Returns a single post with converted HTML content.
- `getPostsByCategory(category: CategorySlug)`: Returns filtered posts by category.
- `getAllCategories()`: Returns the list of categories from JSON.

---

**Additional behavior:**

- Calculate and display the estimated reading time (based on word count).
- Include `excerpt` in the post listings.
- Ensure strong typing with `Post`, `Category`, `CategorySlug`, etc.
- Avoid unnecessary dependencies.
- Structure the project to allow easy migration from Markdown to an external API that returns the same data format.

---

**Expected folder architecture:**

```
/src/app/blog/
├── page.tsx
├── [category]/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── components/
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   ├── Sidebar.tsx
│   └── Pagination.tsx
├── data/
│   ├── posts/
│   │   └── *.md
│   └── categories.json
├── types/
│   ├── post.ts
│   └── category.ts
└── lib/
    ├── getAllPosts.ts
    ├── getPostBySlug.ts
    ├── getPostsByCategory.ts
    └── getAllCategories.ts
```

---

> End of prompt.
