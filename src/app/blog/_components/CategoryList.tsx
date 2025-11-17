"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoryWithPosts } from "../_types/categoryWithPosts";
import { PrimaryToggleItem } from "./toggleItem/PrimaryToggleItem";

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
        <Link href="/blog" className={`${pathname === "/blog" ? "hidden" : ""} uppercase text-[#979797] underline text-xs font-medium`}>
          Ver todos
        </Link>
      </div>

      <div>
        {data.map((category) => (
          <PrimaryToggleItem
            key={category.slug}
            title={category.name}
            slim
            accordionProps={{
              disabled: pathname === `/blog/${category.slug}` ? true : false,
              defaultValue: isSubpathButNotExact(`/blog/${category.slug}`, pathname) ? "item-1" : undefined,
            }}
          >
            {category.coverImage && <div className="" style={{ backgroundImage: `url(${category.coverImage})` }} aria-label={`${category.name} category image`} />}

            {/* Recent posts for this category */}
            {category.recentPosts && category.recentPosts.length > 0 && (
              <ul className="!pl-5">
                {category.recentPosts.map((post) => (
                  <li key={post.slug} className={`list-none mb-1`}>
                    <Link
                      href={`/blog/${category.slug}/${post.slug}`}
                      className={`
                                                ${pathname === `/blog/${category.slug}/${post.slug}` ? "pointer-events-none text-[#9A9A9A]" : "text-[#171B3D] font-semibold"} 
                                                text-base relative before:content-['>'] before:absolute before:-left-4 before:top-0 before:font-semibold`}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}

                <Link href={`/blog/${category.slug}`} className={`${pathname === `/blog/${category.slug}` ? "hidden" : ""} mt-4 block uppercase text-[#979797] underline text-xs font-medium`}>
                  Ver todos
                </Link>
              </ul>
            )}
          </PrimaryToggleItem>
        ))}
      </div>
    </div>
  );
}
