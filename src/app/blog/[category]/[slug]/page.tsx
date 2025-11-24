import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { blogRepository } from "../../_lib/blogRepository";
import { Breadcrumb } from "../../_components/Breadcrumb";
import { Sidebar } from "../../_components/Sidebar";
import { UITitle } from "../../_components/UITitle";
import { LatestNews } from "../../_components/LatestNews";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

type Post = {
  title: string;
  seoDescription?: string;
  excerpt: string;
  category: string;
  slug: string;
  coverImage?: string;
  date: string;
  readingTimeMinutes: number;
  htmlContent: string;
};

// Helper functions
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getReadingTimeLabel = (minutes: number) => `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;

const createMetadata = (post: Post): Metadata => ({
  title: `${post.title} | Blog`,
  description: post.seoDescription || post.excerpt,
  openGraph: {
    title: post.title,
    description: post.seoDescription || post.excerpt,
    type: "article",
    url: `/blog/${post.category}/${post.slug}`,
    images: post.coverImage ? [{ url: post.coverImage }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.seoDescription || post.excerpt,
    images: post.coverImage ? [post.coverImage] : undefined,
  },
});

// Generate metadata for the post page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogRepository.getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return createMetadata(post);
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = blogRepository.getAll();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;

  // Validate category and post
  const categories = blogRepository.getCategories();
  const categoryExists = categories.some((cat) => cat.slug === category);

  if (!categoryExists) notFound();

  const post = await blogRepository.getPost(slug);

  if (!post || post.category !== category) notFound();

  // Prepare data
  const formattedDate = formatDate(post.date);
  const categoryData = categories.find((cat) => cat.slug === post.category);
  const categoryName = categoryData?.name || post.category;

  // Get related posts slugs
  const relatedPosts = blogRepository.getRelatedPosts(post.slug, post.category).map((p) => p.slug);

  const breadcrumbItems = [
    { name: "Blog", href: "/blog" },
    { name: categoryName, href: `/blog/${category}` },
    { name: post.title, href: `/blog/${category}/${slug}`, current: true },
  ];

  return (
    <>
      <header>
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <UITitle title={post.title} />

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <Link
              href={`/blog/${post.category}`}
              className="bg-primary uppercase text-white text-base px-6 py-2 font-medium tracking-widest hover:opacity-90 transition-opacity"
            >
              {categoryName}
            </Link>

            <div className="flex flex-row gap-2 items-center text-neutral-600">
              <time
                className="text-xs"
                dateTime={post.date}
              >
                {formattedDate}
              </time>
              <span
                className="text-secondary"
                aria-hidden="true"
              >
                •
              </span>
              <span className="text-xs">{getReadingTimeLabel(post.readingTimeMinutes)}</span>
            </div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="container">
          <section
            className="no-padding mt-14 w-full h-[500px] bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${post.coverImage})` }}
            aria-label="Cover image"
          />
        </div>
      )}

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
          <div className="lg:col-span-3">
            <article
              className="prose prose-neutral prose-headings:font-semibold max-w-none"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
            <LatestNews slugs={relatedPosts} />
          </div>

          <aside className="lg:col-span-1 mt-10 lg:mt-0 hidden lg:block">
            <Sidebar />
          </aside>
        </div>
      </div>
    </>
  );
}
