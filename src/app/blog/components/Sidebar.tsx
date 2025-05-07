import { Category } from '../types/category';

export default function Sidebar({ categories }: { categories: Category[] }) {
    return (
        <aside className="sidebar">
            <h3 className="text-lg font-bold">Categories</h3>
            <ul>
                {categories.map(category => (
                    <li key={category.slug}>{category.name}</li>
                ))}
            </ul>
        </aside>
    );
}