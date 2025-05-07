import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../types/post';
import { getAllCategories } from '../lib/getAllCategories';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const categories = getAllCategories();
    const category = categories.find(cat => cat.slug === post.category);

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/blog/${post.category}/${post.slug}`}>
                <div className="relative h-48 w-full">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <div className="flex items-center mb-2">
                        <span className="inline-block bg-gray-100 px-3 py-1 text-sm rounded-full text-gray-800">
                            {category?.name || post.category}
                        </span>
                        <time className="text-sm text-gray-500 ml-2">{formattedDate}</time>
                    </div>

                    <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.subtitle}</p>
                    <p className="text-gray-700">{post.excerpt}</p>
                </div>
            </Link>
        </article>
    );
}