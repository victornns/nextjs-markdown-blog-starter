import Link from 'next/link';
import Image from 'next/image';
import { blogRepository } from '../_lib/blogRepository';

export default function Sidebar() {
    const categories = blogRepository.getCategories();

    return (
        <aside className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Categories</h2>
                <ul className="space-y-2">
                    <li>
                        <Link href="/blog" className="text-gray-700 hover:text-blue-600 block py-1">
                            All Posts
                        </Link>
                    </li>
                    {categories.map((category) => (
                        <li key={category.slug}>
                            <Link
                                href={`/blog/${category.slug}`}
                                className="text-gray-700 hover:text-blue-600 flex items-center py-1"
                            >
                                {category.coverImage && (
                                    <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-full">
                                        <Image
                                            src={category.coverImage}
                                            alt={'Category image'}
                                            fill
                                            sizes="32px"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">About</h2>
                <p className="text-gray-600">
                    Welcome to our blog where we share insights about web development,
                    design, and the latest tech trends.
                </p>
            </div>
        </aside>
    );
}