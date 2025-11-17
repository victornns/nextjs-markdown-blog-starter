import { blogRepository } from '../_lib/blogRepository';
import CategoryList from './CategoryList';

export default function Sidebar() {
    const categoriesWithPosts = blogRepository.getCategoriesWithRecentPosts(3);

    return (
        <aside>
            <CategoryList data={categoriesWithPosts} />
        </aside>
    );
}