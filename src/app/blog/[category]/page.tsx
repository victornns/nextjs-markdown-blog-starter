import { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogRepository } from "../_lib/blogRepository";
import { CategorySlug } from "../_types/category";
import { Breadcrumb } from "../_components/Breadcrumb";
import { Pagination } from "../_components/Pagination";
import { PostList } from "../_components/PostList";
import { Sidebar } from "../_components/Sidebar";
import { UITitle } from "../_components/UITitle";
import { UISubtitle } from "../_components/UISubtitle";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
};

const POSTS_PER_PAGE = 9;

// Generate metadata for the category page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = blogRepository.getCategories();
  const categoryData = categories.find((cat) => cat.slug === category);

  if (!categoryData) {
    return {
      title: "Category Not Found!",
    };
  }

  return {
    title: `${categoryData.name} | Blog`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.name} | Blog`,
      description: categoryData.description,
      type: "website",
      url: `/blog/${categoryData.slug}`,
      images: categoryData.coverImage ? [{ url: categoryData.coverImage }] : undefined,
    },
  };
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = blogRepository.getCategories();

  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const categories = blogRepository.getCategories();
  const categoryData = categories.find((cat) => cat.slug === category);

  if (!categoryData) {
    notFound();
  }

  const page = searchParams ? await searchParams : undefined;
  const currentPage = page?.page ? parseInt(page.page) : 1;
  const posts = blogRepository.getByCategory(category as CategorySlug);

  // Calculate pagination
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { name: "Blog", href: "/blog" },
    { name: categoryData.name, href: `/blog/${category}`, current: true },
  ];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-14">
        {categoryData.name && <UITitle title={categoryData.name} />}
        <UISubtitle>Latest Posts</UISubtitle>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        <div className="lg:col-span-3">
          <PostList posts={currentPosts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/blog/${category}`}
          />
        </div>

        <div className="lg:col-span-1 mt-10 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
