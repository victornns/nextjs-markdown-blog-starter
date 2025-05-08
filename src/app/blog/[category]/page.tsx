import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogRepository } from '../_lib/blogRepository';
import { CategorySlug } from '../_types/category';
import PostList from '../_components/PostList';
import Pagination from '../_components/Pagination';
import Sidebar from '../_components/Sidebar';

type PageProps = {
    params: Promise<{ category: string }>;
    searchParams?: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 9;

// Generate metadata for the category page
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { category } = await params;
    const categories = blogRepository.getCategories();
    const categoryData = categories.find(cat => cat.slug === category);

    if (!categoryData) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${categoryData.name} | Blog`,
        description: categoryData.description,
        openGraph: {
            title: `${categoryData.name} | Blog`,
            description: categoryData.description,
            type: 'website',
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
    const categoryData = categories.find(cat => cat.slug === category);

    // Check if category exists
    if (!categoryData) {
        notFound();
    }

    // Ensure searchParams is properly awaited
    const page = searchParams ? await searchParams : undefined;
    const currentPage = page?.page ? parseInt(page.page) : 1;

    const posts = blogRepository.getByCategory(category as CategorySlug);

    // Implement pagination
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">{categoryData.name}</h1>
                <p className="text-xl text-gray-600">
                    {categoryData.description}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <PostList posts={currentPosts} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        baseUrl={`/blog/${category}`}
                    />
                </div>

                <div className="lg:col-span-1">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}