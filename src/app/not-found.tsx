import { Breadcrumb } from "./blog/_components/Breadcrumb";

export default function NotFoundPage() {
  const breadcrumbItems = [{ name: "404", href: "/" }];

  return (
    <section>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <p>404 - Page not found</p>
      </div>
    </section>
  );
}
