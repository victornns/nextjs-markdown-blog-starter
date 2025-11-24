import { Metadata } from "next";

import { blogRepository } from "./_lib/blogRepository";
import { Breadcrumb } from "./_components/Breadcrumb";
import { Pagination } from "./_components/Pagination";
import { PostList } from "./_components/PostList";
import { Sidebar } from "./_components/Sidebar";
import { UITitle } from "./_components/UITitle";
import { UISubtitle } from "./_components/UISubtitle";

export const metadata: Metadata = {
  title: "Blog | Next.js Markdown Blog",
  description: "Explore our collection of articles about web development, design, and technology",
  openGraph: {
    title: "Blog | Next.js Markdown Blog",
    description: "Explore our collection of articles about web development, design, and technology",
    type: "website",
    url: "/blog",
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = params?.page ? parseInt(params.page) : 1;
  const allPosts = blogRepository.getAll();

  // Calculate pagination
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const breadcrumbItems = [{ name: "Blog", href: "/blog", current: true }];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-14">
        <UITitle title={`Blog`} />
        <UISubtitle>All Posts</UISubtitle>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <PostList posts={currentPosts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        </div>

        <div className="lg:col-span-1 order-1 lg:order-2 mb-10">
          <div className="mb-14">
            <p className="font-semibold uppercase tracking-widest mb-4">About</p>
            <div>
              <span className="text-lg text-secondary block mb-2">A scalable, high-performance, and SEO-focused blog starter powered by Next.js 15, Markdown, and TypeScript.</span>
              <a
                href="https://github.com/victornns/nextjs-markdown-blog-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
