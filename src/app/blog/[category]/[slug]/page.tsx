import { getPostBySlug } from '../../lib/getPostBySlug';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    return {
        title: post.title,
        description: post.seoDescription || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.seoDescription || post.excerpt,
            images: post.coverImage ? [{ url: post.coverImage }] : undefined,
        },
    };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params; // Await params before destructuring
    const post = await getPostBySlug(slug);

    return (
        <article>
            <header>
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <p className="text-lg text-gray-600">{post.subtitle}</p>
                <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            </header>
            <main className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}