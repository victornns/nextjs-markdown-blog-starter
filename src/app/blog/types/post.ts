export interface Post {
    title: string;
    subtitle: string;
    slug: string;
    category: CategorySlug;
    date: string;
    excerpt: string;
    coverImage?: string;
    seoDescription?: string;
    content: string;
}

export type CategorySlug = 'design' | 'performance';