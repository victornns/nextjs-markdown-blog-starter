// import { blogRepository } from "../../_lib/blogRepository";
// import { LatestNewsCarousel } from "./LatestNewsCarousel";

// interface LatestNewsProps {
//   slugs: string[];
// }

// export function LatestNews({ slugs = [] }: LatestNewsProps) {
//   if (slugs.length === 0) return null;

//   const filteredPosts = blogRepository.getAll().filter((post) => slugs.includes(post.slug));

//   return filteredPosts.length > 0 ? <LatestNewsCarousel posts={filteredPosts} /> : null;
// }
