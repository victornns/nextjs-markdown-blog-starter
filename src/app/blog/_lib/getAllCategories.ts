import { Category } from '../_types/category';
import categoriesData from '../_data/categories.json';

export function getAllCategories(): Category[] {
    return categoriesData as Category[];
}