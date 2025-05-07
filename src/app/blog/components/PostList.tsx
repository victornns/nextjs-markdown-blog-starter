import PostCard from './PostCard';
import { Post } from '../types/post';

export default function PostList({ posts }: { posts: Post[] }) {
    return (
        <div className="post-list">
            {posts.map(post => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    );
}