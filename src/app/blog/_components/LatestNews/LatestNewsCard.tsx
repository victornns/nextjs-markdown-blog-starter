import Link from "next/link";
import { Post } from "../../_types/post";
import { getAllCategories } from "../../_lib/getAllCategories";

interface LatestNewsCardProps {
  post: Post;
}

const getImageStyle = (thumbImage: string) => ({
  backgroundImage: `url(${thumbImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export function LatestNewsCard({ post }: LatestNewsCardProps) {
  const category = getAllCategories().find((cat) => cat.slug === post.category);
  const postUrl = `/blog/${post.category}/${post.slug}`;

  return (
    <Link
      href={postUrl}
      className="flex flex-col gap-2"
    >
      {post.thumbImage && (
        <div
          className="h-60 w-full bg-gray-100"
          style={getImageStyle(post.thumbImage)}
        />
      )}
      <span className="text-gray-600 text-sm">{category?.name}</span>
      <h3>{post.title}</h3>
      <div className="flex items-center justify-center w-full max-w-4 h-4 border border-gray-900 rounded-full">
        <span className="text-gray-900 font-extrabold text-sm">&gt;</span>
      </div>
    </Link>
  );
}
