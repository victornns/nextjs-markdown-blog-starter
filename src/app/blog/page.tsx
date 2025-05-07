import PostList from './components/PostList';
import { Pagination } from './components/Pagination';
import { getAllPosts } from './lib/getAllPosts';

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <section>
            <div className="container">
                <h1 className="text-3xl font-bold mb-5">Blog</h1>
                <PostList posts={posts} />
                <Pagination currentPage={1} totalPages={Math.ceil(posts.length / 10)} />
            </div>
        </section>
    );
}