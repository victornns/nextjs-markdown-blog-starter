"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoryWithPosts } from "../_types/categoryWithPosts";
import { ToggleItem } from "./ToggleItem";

interface CategoryListProps {
  data: CategoryWithPosts[];
}

export function CategoryList({ data }: CategoryListProps) {
  const pathname = usePathname();
  const isOnBlogHome = pathname === "/blog";

  const isSubpath = (categorySlug: string) => {
    const basePath = `/blog/${categorySlug}`;
    return pathname.startsWith(`${basePath}/`) && pathname !== basePath;
  };

  return (
    <div>
      <div className="flex flex-row sm:items-center gap-2 justify-between mb-4">
        <p className="font-semibold uppercase tracking-widest">Categories</p>
        {!isOnBlogHome && (
          <Link
            href="/blog"
            className="underline text-sm font-medium"
          >
            View All
          </Link>
        )}
      </div>
      <div>
        {data.map((category) => {
          const categoryPath = `/blog/${category.slug}`;
          const isCurrentCategory = pathname === categoryPath;

          return (
            <ToggleItem
              key={category.slug}
              title={category.name}
              accordionProps={{
                disabled: isCurrentCategory,
                defaultValue: isSubpath(category.slug) ? "toggle-content" : undefined,
              }}
            >
              {category.coverImage && (
                <div
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                  aria-label={`${category.name} category image`}
                />
              )}
              {category.recentPosts?.length > 0 && (
                <ul className="pl-5">
                  {category.recentPosts.map((post) => {
                    const postPath = `${categoryPath}/${post.slug}`;
                    const isCurrentPost = pathname === postPath;

                    return (
                      <li
                        key={post.slug}
                        className="list-none mb-2"
                      >
                        <Link
                          href={postPath}
                          className={`text-sm relative before:content-['>'] before:absolute before:-left-4 before:top-0 before:font-semibold ${isCurrentPost ? "pointer-events-none !no-underline text-primary font-semibold" : ""}`}
                        >
                          {post.title}
                        </Link>
                      </li>
                    );
                  })}
                  {!isCurrentCategory && (
                    <Link
                      href={categoryPath}
                      className="mt-6 block underline text-sm font-medium"
                    >
                      View All
                    </Link>
                  )}
                </ul>
              )}
            </ToggleItem>
          );
        })}
      </div>
    </div>
  );
}
