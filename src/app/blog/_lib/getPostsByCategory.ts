import { CategorySlug } from '../_types/category';
import { Post } from '../_types/post';
import { getAllPosts } from './getAllPosts';

export function getPostsByCategory(categorySlug: CategorySlug): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.category === categorySlug);
}