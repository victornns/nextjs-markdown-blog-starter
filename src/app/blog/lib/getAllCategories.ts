import categories from '../data/categories.json';
import { Category } from '../types/category';

export async function getAllCategories(): Promise<Category[]> {
    return categories;
}