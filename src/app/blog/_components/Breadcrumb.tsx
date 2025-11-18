import Link from "next/link";
import { HTMLAttributes } from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav className={`flex mb-6 mt-2 ${className || ""}`} aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center flex-wrap text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-neutral-600 hover:text-neutral-800 transition-colors">
            Home
          </Link>
        </li>

        {items.map((item) => (
          <li key={item.href} className="flex items-center">
            <span className="mx-2 text-neutral-300">/</span>
            {item.current ? (
              <span className="text-brand font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="text-neutral-600 hover:text-neutral-800 transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
