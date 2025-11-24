import { blogRepository } from "../../_lib/blogRepository";
import { UITitle } from "../UITitle";
import { LatestNewsCarousel } from "./LatestNewsCarousel";

interface LatestNewsProps {
  slugs: string[];
}

export function LatestNews({ slugs = [] }: LatestNewsProps) {
  if (slugs.length === 0) return null;

  const filteredPosts = blogRepository.getAll().filter((post) => slugs.includes(post.slug));

  return filteredPosts.length > 0 ? (
    <section className="pt-10 mt-20 border-t-[1px]">
      <UITitle title={"Related Posts"} />
      <LatestNewsCarousel posts={filteredPosts} />
    </section>
  ) : null;
}
