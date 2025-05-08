import { CategorySlug, Category } from '../_types/category';
import { Post, PostWithHtml } from '../_types/post';
import { getAllPosts } from './getAllPosts';
import { getPostBySlug as fetchPostBySlug } from './getPostBySlug';
import { getPostsByCategory as fetchPostsByCategory } from './getPostsByCategory';
import { getAllCategories as fetchAllCategories } from './getAllCategories';

/**
 * Blog data repository that isolates data access logic.
 * This abstraction allows for future changes to the data source (e.g., API)
 * without impacting components that consume the data.
 */
export const blogRepository = {
    /**
     * Get a single post by its slug
     */
    async getPost(slug: string): Promise<PostWithHtml | null> {
        return fetchPostBySlug(slug);
    },

    /**
     * Get all blog posts
     */
    getAll(): Post[] {
        return getAllPosts();
    },

    /**
     * Get posts filtered by category
     */
    getByCategory(category: CategorySlug): Post[] {
        return fetchPostsByCategory(category);
    },

    /**
     * Get all available categories
     */
    getCategories(): Category[] {
        return fetchAllCategories();
    }
};