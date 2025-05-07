import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/data/posts');

export async function getPostBySlug(slug: string): Promise<Post> {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        ...data,
        content,
    } as Post;
}