import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter } from '../_types/post';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/_data/posts');

export function getAllPosts(): Post[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const { data, content } = matter(fileContents);

            // Validate frontmatter
            const frontmatter = data as PostFrontmatter;

            // Combine the data with the slug
            return {
                ...frontmatter,
                content,
            };
        });

    // Sort posts by date in descending order
    return allPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}