import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    href: string;
    current?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap">
                <li className="flex items-center">
                    <Link href="/" className="text-gray-500 hover:text-gray-900">
                        Home
                    </Link>
                </li>

                {items.map((item) => (
                    <li key={item.href} className="flex items-center">
                        <span className="mx-2 text-gray-400">/</span>
                        {item.current ? (
                            <span className="text-gray-800 font-medium" aria-current="page">
                                {item.name}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-gray-500 hover:text-gray-900"
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
