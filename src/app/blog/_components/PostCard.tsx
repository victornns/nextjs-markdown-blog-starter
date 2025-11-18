import Link from "next/link";
import { Post } from "../_types/post";
import { getAllCategories } from "../_lib/getAllCategories";

interface PostCardProps {
  post: Post;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getBackgroundStyle = (thumbImage?: string) =>
  thumbImage
    ? {
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 60%), url(${thumbImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

export function PostCard({ post }: PostCardProps) {
  const category = getAllCategories().find((cat) => cat.slug === post.category);
  const postUrl = `/blog/${post.category}/${post.slug}`;

  return (
    <article className="overflow-hidden hover:shadow-md transition-all duration-300 mb-10 last-of-type:mb-0 opacity-95 hover:opacity-100">
      <Link href={postUrl} className="flex flex-col xl:flex-row">
        <div className="relative h-[300px] w-full max-w-[325px] bg-gray-100" style={getBackgroundStyle(post.thumbImage)}>
          <span className="absolute bottom-4 left-3 bg-primary uppercase text-white text-xs px-3 py-2 font-medium tracking-widest overflow-hidden">{category?.name || post.category}</span>
        </div>
        <div className="w-full py-4 px-2 xl:px-10 flex flex-col">
          <time className="text-xs">{formatDate(post.date)}</time>
          <h3 className="text-3xl mt-4 mb-6 font-thin">{post.title}</h3>
          <p className="md:text-lg">{post.excerpt}</p>
          <div className="flex flex-row gap-10 items-center mt-auto">
            <div className="w-full h-px bg-gray-300" />
            <div className="flex items-center justify-center w-full max-w-12 h-12 bg-primary">
              <span className="text-white text-4xl">&gt;</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
