import Link from "next/link";

export default function Home() {
  return (<>
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Next.js Markdown Blog Starter
          </h1>
          <div className="w-16 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-neutral-700 mb-8 text-lg">
            A professional, modern blog platform built with Next.js and Markdown
          </p>
          <Link href="/blog" className="btn btn-primary">
            Explore Blog
          </Link>
        </div>
      </div>
    </section>
  </>)
}
