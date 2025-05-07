import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory } from '../lib/getPostsByCategory';
import { getAllCategories } from '../lib/getAllCategories';
import { CategorySlug } from '../types/category';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';

interface PageProps {
    params: {
        category: string;
    };
    searchParams: { page?: string };
}

const POSTS_PER_PAGE = 9;

// Generate metadata for the category page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const categories = getAllCategories();
    const category = categories.find(cat => cat.slug === params.category);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${category.name} | Blog`,
        description: category.description,
        openGraph: {
            title: `${category.name} | Blog`,
            description: category.description,
            type: 'website',
            url: `/blog/${category.slug}`,
            images: category.coverImage ? [{ url: category.coverImage }] : undefined,
        },
    };
}

// Generate static paths for all categories
export async function generateStaticParams() {
    const categories = getAllCategories();

    return categories.map((category) => ({
        category: category.slug,
    }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const categories = getAllCategories();
    const category = categories.find(cat => cat.slug === params.category);

    // Check if category exists
    if (!category) {
        notFound();
    }

    // Ensure searchParams is properly awaited
    const page = searchParams?.page;
    const currentPage = page ? parseInt(page) : 1;

    const posts = getPostsByCategory(params.category as CategorySlug);

    // Implement pagination
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                <p className="text-xl text-gray-600">
                    {category.description}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <PostList posts={currentPosts} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        baseUrl={`/blog/${params.category}`}
                    />
                </div>

                <div className="lg:col-span-1">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}