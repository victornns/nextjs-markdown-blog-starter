import { getAllPosts } from './getAllPosts';
import { Post } from '../types/post';
import { CategorySlug } from '../types/post';

export async function getPostsByCategory(category: CategorySlug): Promise<Post[]> {
    const posts = await getAllPosts();
    return posts.filter(post => post.category === category);
}