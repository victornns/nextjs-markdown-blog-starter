import { Post } from '../_types/post';
import PostCard from './PostCard';

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-16 border border-dashed border-neutral-300 bg-neutral-50">
                <h2 className="text-lg font-medium text-neutral-600">No posts found</h2>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    );
}