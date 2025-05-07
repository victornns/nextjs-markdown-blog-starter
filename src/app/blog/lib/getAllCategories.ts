import { Category } from '../types/category';
import categoriesData from '../data/categories.json';

export function getAllCategories(): Category[] {
    return categoriesData as Category[];
}