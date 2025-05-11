import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogRepository } from '../../_lib/blogRepository';
import Sidebar from '../../_components/Sidebar';
import Breadcrumb from '../../_components/Breadcrumb';

type PageProps = {
    params: Promise<{ category: string; slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate metadata for the post page
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    const post = await blogRepository.getPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Blog`,
        description: post.seoDescription || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.seoDescription || post.excerpt,
            type: 'article',
            url: `/blog/${post.category}/${post.slug}`,
            images: post.coverImage ? [{ url: post.coverImage }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
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
    const categoryExists = categories.some(cat => cat.slug === category);

    if (!categoryExists) {
        notFound();
    }

    // Get post data
    const post = await blogRepository.getPost(slug);

    // Validate post exists and belongs to the specified category
    if (!post || post.category !== category) {
        notFound();
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const categoryData = categories.find(cat => cat.slug === post.category);

    const breadcrumbItems = [
        { name: 'Blog', href: '/blog' },
        { name: categoryData?.name || category, href: `/blog/${category}` },
        { name: post.title, href: `/blog/${category}/${slug}`, current: true }
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <article className="card overflow-hidden">
                        {post.coverImage && (
                            <div className="relative h-80 w-full">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="p-8">
                            <header className="mb-8">
                                <div className="flex flex-wrap items-center mb-4">
                                    <Link
                                        href={`/blog/${post.category}`}
                                        className="inline-block bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800 border-l-2 border-primary-600 mr-3"
                                    >
                                        {categoryData?.name || post.category}
                                    </Link>
                                    <time className="text-xs text-neutral-600 mr-3">{formattedDate}</time>
                                    <span className="text-xs text-neutral-600">
                                        {post.readingTimeMinutes} min read
                                    </span>
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-neutral-900">{post.title}</h1>
                                <div className="w-16 h-1 bg-primary-600 mb-4"></div>
                                <h2 className="text-xl text-neutral-700">{post.subtitle}</h2>
                            </header>

                            <main
                                className="prose prose-neutral max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                            />

                            <footer className="mt-12 pt-8 border-t border-neutral-200">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <Link href="/blog" className="text-primary-700 hover:text-primary-800 font-medium">
                                        &larr; Back to all posts
                                    </Link>

                                    <div className="flex items-center space-x-4">
                                        <span className="text-neutral-700">Share:</span>
                                        <Link
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blog/${post.category}/${post.slug}`
                                            )}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-700 hover:text-primary-700 transition-colors"
                                        >
                                            Twitter
                                        </Link>
                                        <Link
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blog/${post.category}/${post.slug}`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-700 hover:text-primary-700 transition-colors"
                                        >
                                            Facebook
                                        </Link>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </article>
                </div>

                <div className="lg:col-span-1">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}