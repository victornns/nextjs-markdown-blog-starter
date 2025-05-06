# AI_PROMPT.md

> ⚠️ **IMPORTANTE:**  
> Este arquivo contém o prompt principal usado para orientar modelos de IA como GitHub Copilot, Claude 3.7 Sonnet ou GPT-4o na geração e estruturação deste projeto.  

---

## 🧠 Prompt completo (blog em Next.js 15 com Markdown, SEO e arquitetura modular)

**Framing inicial (para Copilot ou outro modelo):**

> Responda como um engenheiro de software sênior especializado em desenvolvimento web escalável, utilizando Next.js 15, App Router, Markdown, TypeScript e práticas modernas de SEO.  
> Siga estritamente as instruções fornecidas abaixo.  
> Escreva código limpo, modular, claro, tipado e focado em performance, escalabilidade e organização.  
> Evite código desnecessário. Concentre-se apenas na implementação específica descrita.  
> Cite claramente quais arquivos estão sendo afetados ou criados.

---

**Instruções técnicas:**

No meu projeto Next.js estruturado com a pasta `/src/app`, crie uma nova área de blog em `/src/app/blog`, utilizando o App Router.

O blog deve conter:

- `/src/app/blog/page.tsx`: Página principal listando todos os posts.
- `/src/app/blog/[category]/page.tsx`: Página de listagem de posts por categoria.
- `/src/app/blog/[category]/[slug]/page.tsx`: Página individual de cada post.

Crie também as pastas:

- `/src/app/blog/components/`: Para componentes reutilizáveis como PostCard, Sidebar, Pagination, etc.
- `/src/app/blog/data/posts/`: Para armazenar os arquivos de posts em `.md`.
- `/src/app/blog/data/categories.json`: Arquivo com todas as categorias válidas.
- `/src/app/blog/types/`: Para definir os tipos TypeScript.
- `/src/app/blog/lib/`: Para funções utilitárias (como getAllPosts, getPostBySlug, etc.).

---

**Dados dos posts:**

- Cada post deve ser um arquivo `.md` com frontmatter obrigatório:
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
- O conteúdo Markdown será convertido em HTML para exibição.
- Exemplo de caminho: `/src/app/blog/data/posts/o-que-e-ui-ux.md`

---

**Categorias:**

- Criar um arquivo `/src/app/blog/data/categories.json` contendo todas as categorias válidas:
  ```json
  [
    {
      "slug": "design",
      "name": "Design",
      "description": "Posts sobre UX/UI",
      "coverImage": "/images/categories/design.jpg"
    },
    {
      "slug": "performance",
      "name": "Performance",
      "description": "Otimização de sites"
    }
  ]
  ```
- Tipar a categoria com `CategorySlug` (ex: `'design' | 'performance'`), validando se o campo `category` dos posts existe no JSON.

---

**Renderização e comportamento:**

- Na página de post individual, renderizar:
  - `title`, `subtitle`, `date`, `category`, `tempo estimado de leitura`, `HTML do post`.
- Usar marcação HTML semântica: `<article>`, `<header>`, `<main>`, `<aside>`, `<footer>`, etc.
- Adicionar SEO dinâmico com base no frontmatter (ex: `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `twitter:card`, etc.).
- URLs devem seguir formato: `/blog/design/o-que-e-ui-ux`
- Respeitar hierarquia de headings (`h1`, `h2`, `h3`).

---

**Paginação:**

- Implementar paginação obrigatória nas páginas:
  - `/blog/page.tsx`
  - `/blog/[category]/page.tsx`
- Usar um componente `Pagination` simples e funcional.

---

**Funções utilitárias (em `/lib/`):**

- `getAllPosts()`: Lê todos os arquivos `.md`, extrai frontmatter e retorna array de posts ordenados por data.
- `getPostBySlug(slug: string)`: Retorna um único post com o conteúdo convertido.
- `getPostsByCategory(category: CategorySlug)`: Retorna os posts filtrados.
- `getAllCategories()`: Retorna a lista de categorias do JSON.

---

**Comportamento adicional:**

- Calcular e exibir o tempo estimado de leitura (baseado na contagem de palavras).
- Injetar `excerpt` nas listagens.
- Garantir que todos os tipos sejam fortes (`Post`, `Category`, `CategorySlug`, etc.).
- Evitar dependências desnecessárias.
- Estruturar o projeto para facilitar uma futura migração da fonte de dados Markdown para uma API externa com o mesmo formato.

---

**Arquitetura de pastas esperada:**

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

> Fim do prompt.
