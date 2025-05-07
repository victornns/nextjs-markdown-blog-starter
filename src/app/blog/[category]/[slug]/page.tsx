import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug } from '../../lib/getPostBySlug';
import { getAllPosts } from '../../lib/getAllPosts';
import { getAllCategories } from '../../lib/getAllCategories';
import Sidebar from '../../components/Sidebar';

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

    const post = await getPostBySlug(slug);

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
    const posts = getAllPosts();

    return posts.map((post) => ({
        category: post.category,
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PageProps) {
    // Read route params
    const { category, slug } = await params;

    // Validate that category exists
    const categories = getAllCategories();
    const categoryExists = categories.some(cat => cat.slug === category);

    if (!categoryExists) {
        notFound();
    }

    // Get post data
    const post = await getPostBySlug(slug);

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

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {post.coverImage && (
                            <div className="relative h-96 w-full">
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
                                <div className="flex items-center mb-4">
                                    <Link
                                        href={`/blog/${post.category}`}
                                        className="inline-block bg-gray-100 px-3 py-1 text-sm rounded-full text-gray-800 hover:bg-gray-200"
                                    >
                                        {categoryData?.name || post.category}
                                    </Link>
                                    <time className="text-sm text-gray-500 ml-2">{formattedDate}</time>
                                    <span className="text-sm text-gray-500 ml-4">
                                        {post.readingTimeMinutes} min read
                                    </span>
                                </div>

                                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                                <h2 className="text-2xl text-gray-600">{post.subtitle}</h2>
                            </header>

                            <main
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                            />

                            <footer className="mt-12 pt-8 border-t">
                                <div className="flex justify-between items-center">
                                    <Link href="/blog" className="text-blue-600 hover:underline">
                                        &larr; Back to all posts
                                    </Link>

                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-600">Share:</span>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blog/${post.category}/${post.slug}`
                                            )}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-500"
                                        >
                                            Twitter
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blog/${post.category}/${post.slug}`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-600"
                                        >
                                            Facebook
                                        </a>
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