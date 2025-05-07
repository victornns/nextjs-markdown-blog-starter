import PostList from '../components/PostList';
import { Pagination } from '../components/Pagination';
import { getPostsByCategory } from '../lib/getPostsByCategory';
import { getAllCategories } from '../lib/getAllCategories';
import { CategorySlug } from '../types/post';

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;
    const categorySlug = category as CategorySlug; // Cast category to CategorySlug
    const posts = await getPostsByCategory(categorySlug);
    const categories = await getAllCategories();

    if (!categories.some(cat => cat.slug === categorySlug)) {
        return <div>Category not found</div>;
    }

    return (
        <section>
            <div className="container">
                <h1 className="text-3xl font-bold mb-5">Posts in {categorySlug}</h1>
                <PostList posts={posts} />
                <Pagination currentPage={1} totalPages={Math.ceil(posts.length / 10)} />
            </div>
        </section>
    );
}