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
    <nav className={`flex mb-0 mt-2 ${className || ""}`} aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center flex-wrap text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-secondary hover:text-secondary transition-colors">
            Home
          </Link>
        </li>

        {items.map((item) => (
          <li key={item.href} className="flex items-center">
            <span className="mx-2 text-secondary">/</span>
            {item.current ? (
              <span className="text-primary font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="text-secondary hover:text-secondary transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
