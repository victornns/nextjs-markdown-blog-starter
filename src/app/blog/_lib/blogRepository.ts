import { CategorySlug, Category } from "../_types/category";
import { Post, PostWithHtml } from "../_types/post";
import { CategoryWithPosts } from "../_types/categoryWithPosts";
import { getAllPosts } from "./getAllPosts";
import { getPostBySlug as fetchPostBySlug } from "./getPostBySlug";
import { getPostsByCategory as fetchPostsByCategory } from "./getPostsByCategory";
import { getAllCategories as fetchAllCategories } from "./getAllCategories";

export const blogRepository = {
  async getPost(slug: string): Promise<PostWithHtml | null> {
    return fetchPostBySlug(slug);
  },

  getAll(): Post[] {
    return getAllPosts();
  },

  getByCategory(category: CategorySlug): Post[] {
    return fetchPostsByCategory(category);
  },

  getCategories(): Category[] {
    return fetchAllCategories();
  },

  getCategoriesWithRecentPosts(recentPostsCount = 3): CategoryWithPosts[] {
    const categories = fetchAllCategories();
    return categories.map((category) => {
      const posts = fetchPostsByCategory(category.slug);
      const recentPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, recentPostsCount);

      return {
        ...category,
        recentPosts,
      };
    });
  },

  getRelatedPosts(currentSlug: string, category: CategorySlug, limit = 3): Post[] {
    return this.getByCategory(category)
      .filter((post) => post.slug !== currentSlug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  },
};
