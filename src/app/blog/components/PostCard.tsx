import { Post } from '../types/post';

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="post-card">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            <p>{post.excerpt}</p>
        </div>
    );
}