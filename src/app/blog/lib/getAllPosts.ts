import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/data/posts');

export async function getAllPosts(): Promise<Post[]> {
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            ...data,
            content,
        } as Post;
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}