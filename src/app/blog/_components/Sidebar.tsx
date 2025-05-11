import { blogRepository } from '../_lib/blogRepository';
import CategoryList from './CategoryList';

export default function Sidebar() {
    const categories = blogRepository.getCategories();

    return (
        <aside className="space-y-6">
            <div className="card p-5">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200 text-neutral-800">Categories</h2>
                <CategoryList categories={categories} />
            </div>

            <div className="card p-5">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200 text-neutral-800">About</h2>
                <p className="text-neutral-600 text-sm leading-relaxed">
                    Welcome to our blog where we share insights about web development,
                    design, and the latest tech trends.
                </p>
            </div>
        </aside>
    );
}