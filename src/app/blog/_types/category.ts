export type CategorySlug = 'design' | 'performance';

export interface Category {
    slug: CategorySlug;
    name: string;
    description: string;
    coverImage?: string;
}