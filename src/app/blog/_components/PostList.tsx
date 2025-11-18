import { Post } from "../_types/post";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-neutral-300 bg-neutral-50">
        <h2 className="text-lg text-secondary">Nenhuma postagem encontrada</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
