import Link from 'next/link';
import { Post } from '../../_types/post';
import { getAllCategories } from '../../_lib/getAllCategories';

interface PostCardProps {
    post: Post;
}

export function LatestNewsCard({ post }: PostCardProps) {
    const categories = getAllCategories();
    const category = categories.find(cat => cat.slug === post.category);

    return (
        <Link
            href={`/blog/${post.category}/${post.slug}`}
            className='flex flex-col gap-2'
        >
            <div
                style={{
                    backgroundColor: '#f6f6f6',
                    backgroundImage: `url(${post.thumbImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100px',
                    width: '100%',
                }}
            />

            <span className='text-[#666666] text-sm underline'>{category?.name}</span>
            <h3 className=''>{post.title}</h3>

            <div className='flex items-center justify-center w-full max-w-4 h-4 border-[1px] border-[#0E0E0E] rounded-full'>
                <span className='text-[#0E0E0E] font-extrabold text-sm'>{'>'}</span>
            </div>
        </Link>
    );
}
