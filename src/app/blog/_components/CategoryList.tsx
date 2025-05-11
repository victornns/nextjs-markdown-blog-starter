'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '../_types/category';

interface CategoryListProps {
    categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    const pathname = usePathname();

    return (
        <ul className="space-y-1">
            <li>
                <Link href="/blog"
                    className={`text-neutral-900 hover:text-primary-700 hover:bg-primary-50 block px-2 py-2 transition-colors 
                        ${pathname === '/blog' ? 'bg-primary-50 text-primary-800 font-medium' : ''}`}
                >
                    All Posts
                </Link>
            </li>
            {categories.map((category) => (
                <li key={category.slug}>
                    <Link
                        href={`/blog/${category.slug}`}
                        className={`text-neutral-900 hover:text-primary-700 hover:bg-primary-50 flex items-center px-2 py-2 transition-colors
                            ${pathname === `/blog/${category.slug}` ? 'bg-primary-50 text-primary-800 font-medium' : ''}`}
                    >
                        {category.coverImage && (
                            <div
                                className="relative w-6 h-6 mr-2 overflow-hidden bg-center bg-no-repeat border border-neutral-200"
                                style={{ backgroundImage: `url(${category.coverImage})` }}
                                aria-label={`${category.name} category image`}
                            />
                        )}
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
