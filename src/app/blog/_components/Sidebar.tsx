import { blogRepository } from "../_lib/blogRepository";
import { CategoryList } from "./CategoryList";

const RECENT_POSTS_LIMIT = 3;

export function Sidebar() {
  const categoriesWithPosts = blogRepository.getCategoriesWithRecentPosts(RECENT_POSTS_LIMIT);

  return (
    <aside>
      <CategoryList data={categoriesWithPosts} />
    </aside>
  );
}
