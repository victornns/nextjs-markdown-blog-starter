import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../_types/post';
import { getAllCategories } from '../_lib/getAllCategories';

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
        <article className="card overflow-hidden border-b-2 border-b-primary-600 hover:shadow-md transition-shadow duration-300">
            <Link href={`/blog/${post.category}/${post.slug}`}>
                <div className="relative h-48 w-full">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="h-full w-full bg-neutral-100 flex items-center justify-center">
                            <span className="text-neutral-600">No image</span>
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="inline-block bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800 border-l-2 border-primary-600">
                            {category?.name || post.category}
                        </span>
                        <time className="text-xs text-neutral-600">{formattedDate}</time>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 text-neutral-900">{post.title}</h2>
                    <p className="text-neutral-700 mb-3 text-sm">{post.subtitle}</p>
                    <p className="text-neutral-800 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
            </Link>
        </article>
    );
}