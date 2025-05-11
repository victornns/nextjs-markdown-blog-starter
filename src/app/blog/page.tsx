import { Metadata } from 'next';
import { blogRepository } from './_lib/blogRepository';
import PostList from './_components/PostList';
import Pagination from './_components/Pagination';
import Sidebar from './_components/Sidebar';
import Breadcrumb from './_components/Breadcrumb';

export const metadata: Metadata = {
    title: 'Blog | Next.js Markdown Blog',
    description: 'Explore our collection of articles about web development, design, and technology',
    openGraph: {
        title: 'Blog | Next.js Markdown Blog',
        description: 'Explore our collection of articles about web development, design, and technology',
        type: 'website',
        url: '/blog',
    }
};

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: PageProps) {
    // Ensure searchParams is properly awaited
    const params = await searchParams;
    const page = params?.page;
    const currentPage = page ? parseInt(page) : 1;
    const allPosts = blogRepository.getAll();

    // Implement pagination
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = allPosts.slice(startIndex, endIndex);

    const breadcrumbItems = [
        { name: 'Blog', href: '/blog', current: true }
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold mb-3 text-neutral-900">Blog</h1>
                <div className="w-16 h-1 bg-primary-600 mx-auto mb-4"></div>
                <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
                    Explore our articles about web development, design, and technology
                </p>
            </header>

            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <PostList posts={currentPosts} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        baseUrl="/blog"
                    />
                </div>

                <div className="lg:col-span-1">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}