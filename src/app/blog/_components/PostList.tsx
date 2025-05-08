import { Post } from '../_types/post';
import PostCard from './PostCard';

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-medium text-gray-600">No posts found</h2>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    );
}