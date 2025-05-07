import { CategorySlug } from "./category";

export interface PostFrontmatter {
    title: string;
    subtitle: string;
    slug: string;
    category: CategorySlug;
    date: string;
    excerpt: string;
    coverImage?: string;
    seoDescription?: string;
}

export interface Post extends PostFrontmatter {
    content: string;
}

export interface PostWithHtml extends Post {
    htmlContent: string;
    readingTimeMinutes: number;
}