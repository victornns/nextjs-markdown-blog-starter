"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoryWithPosts } from "../_types/categoryWithPosts";
import { ToggleItem } from "./ToggleItem";

interface CategoryListProps {
  data: CategoryWithPosts[];
}

export default function CategoryList({ data }: CategoryListProps) {
  const pathname = usePathname();

  // Helper function to determine if a path is a subpath but not exact match
  const isSubpathButNotExact = (basePath: string, currentPath: string) => {
    return currentPath.startsWith(basePath + "/") && currentPath !== basePath;
  };

  return (
    <div className="">
      <div className="flex flex-row sm:items-center gap-2 justify-between mb-4">
        <p>Categorias</p>
        <Link href="/blog" className={`${pathname === "/blog" ? "hidden" : ""} uppercase text-gray-500 underline text-xs font-medium`}>
          Ver todos
        </Link>
      </div>

      <div>
        {data.map((category) => (
          <ToggleItem
            key={category.slug}
            title={category.name}
            accordionProps={{
              disabled: pathname === `/blog/${category.slug}` ? true : false,
              defaultValue: isSubpathButNotExact(`/blog/${category.slug}`, pathname) ? "toggle-content" : undefined,
            }}
          >
            {category.coverImage && <div className="" style={{ backgroundImage: `url(${category.coverImage})` }} aria-label={`${category.name} category image`} />}

            {/* Recent posts for this category */}
            {category.recentPosts && category.recentPosts.length > 0 && (
              <ul className="!pl-5">
                {category.recentPosts.map((post) => (
                  <li key={post.slug} className={`list-none mb-2`}>
                    <Link
                      href={`/blog/${category.slug}/${post.slug}`}
                      className={`${pathname === `/blog/${category.slug}/${post.slug}` ? "pointer-events-none !no-underline text-brand font-semibold" : ""} text-base relative before:content-['>'] before:absolute before:-left-4 before:top-0 before:font-semibold`}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}

                <Link href={`/blog/${category.slug}`} className={`${pathname === `/blog/${category.slug}` ? "hidden" : ""} mt-4 block uppercase text-gray-500 underline text-xs font-medium`}>
                  Ver todos
                </Link>
              </ul>
            )}
          </ToggleItem>
        ))}
      </div>
    </div>
  );
}
