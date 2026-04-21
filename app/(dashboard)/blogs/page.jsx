"use client";

import Link from "next/link";

export default function BlogsPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
        <div>
          <h1 className="text-lg font-semibold text-[#1F1F1F]">Blogs</h1>
          <p className="text-xs text-[#7A7A7A]">Manage and publish your blog posts.</p>
        </div>
        <Link href="/blogs/add" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          Add Blog
        </Link>
      </div>

      <div className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-[#7A7A7A] shadow-sm">No blogs found.</div>
    </section>
  );
}
