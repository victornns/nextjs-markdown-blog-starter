export type CategorySlug = "design" | "performance" | "development" | "javascript" | "cloud" | "tools";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  coverImage?: string;
}
