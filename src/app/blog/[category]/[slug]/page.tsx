import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogRepository } from "../../_lib/blogRepository";
import Sidebar from "../../_components/Sidebar";
import Breadcrumb from "../../_components/Breadcrumb";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate metadata for the post page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  const post = await blogRepository.getPost(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado",
    };
  }

  return {
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
  };
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
  // Read route params
  const { category, slug } = await params;

  // Validate that category exists
  const categories = blogRepository.getCategories();
  const categoryExists = categories.some((cat) => cat.slug === category);

  if (!categoryExists) {
    notFound();
  }

  // Get post data
  const post = await blogRepository.getPost(slug);

  // Validate post exists and belongs to the specified category
  if (!post || post.category !== category) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const categoryData = categories.find((cat) => cat.slug === post.category);

  const breadcrumbItems = [
    { name: "Blog", href: "/blog" },
    { name: categoryData?.name || category, href: `/blog/${category}` },
    { name: post.title, href: `/blog/${category}/${slug}`, current: true },
  ];

  return (
    <>
      <header>
        <div className="container">
          <Breadcrumb items={breadcrumbItems} className="!mt-10" />

          {post.title && <h1 className="text-4xl font-bold mb-6">{post.title}</h1>}

          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* category label */}
            <Link href={`/blog/${post.category}`} className="bg-[#171B3D] uppercase text-white text-base px-6 py-2 font-medium tracking-[4px]">
              {categoryData?.name || post.category}
            </Link>

            {/* reading time */}
            <div className="flex flex-row gap-2 items-center">
              <time className="text-xs">{formattedDate}</time>
              <span className="text-[#D9D9D9]">•</span>
              <span className="text-xs">
                {post.readingTimeMinutes} {post.readingTimeMinutes > 1 ? "minutos" : "minuto"} de leitura
              </span>
            </div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <section className="no-padding mt-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="mx-auto" />
        </section>
      )}

      <div className="container py-14 xl:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
          <div className="lg:col-span-3">
            <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-img:rounded-sm" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          </div>

          <div className="lg:col-span-1 mt-10 lg:mt-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
