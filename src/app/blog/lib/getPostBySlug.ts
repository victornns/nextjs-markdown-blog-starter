import { remark } from 'remark';
import html from 'remark-html';
import { PostWithHtml } from '../types/post';
import { getAllPosts } from './getAllPosts';

export async function getPostBySlug(slug: string): Promise<PostWithHtml | null> {
    try {
        const posts = getAllPosts();
        const post = posts.find((post) => post.slug === slug);

        if (!post) {
            return null;
        }

        // Convert markdown content to HTML
        const processedContent = await remark()
            .use(html)
            .process(post.content);

        const htmlContent = processedContent.toString();

        // Calculate reading time (average reading speed: ~225 words per minute)
        const wordCount = post.content.split(/\s+/g).length;
        const readingTimeMinutes = Math.ceil(wordCount / 225);

        return {
            ...post,
            htmlContent,
            readingTimeMinutes
        };
    } catch (error) {
        console.error(`Error getting post by slug "${slug}":`, error);
        return null;
    }
}