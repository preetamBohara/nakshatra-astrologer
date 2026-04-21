"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = ["Astrology", "Health", "Horoscope", "Spirituality", "Lifestyle"];

export default function AddBlogPage() {
  const [imagePreview, setImagePreview] = useState("");

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4">
        <Link href="/blogs" className="inline-flex items-center text-[#2F2F2F]">
          <svg className="h-5 w-5" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">Blog Title</label>
            <input type="text" placeholder="e.g. 'Understanding Saturn Return'" className="h-11 w-full rounded-lg border border-[#D9D2DE] px-3 text-sm outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#333]">Category</label>
            <select className="h-11 w-full rounded-lg border border-[#D9D2DE] px-3 text-sm outline-none">
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#333]">Featured Image</label>
          <label className="relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#D3CCD9] bg-[#FCFBFD] text-center">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Selected blog" className="h-full w-full rounded-xl object-contain" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImagePreview("");
                  }}
                  className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white hover:bg-black/70"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <span className="inline-flex h-8 w-8 items-center justify-center text-[#94909A]">
                  <svg className="h-6 w-6" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="m8 13 2.5-2.5L14 14l2-2 3 3M16 8h.01M19 3v4M17 5h4" />
                  </svg>
                </span>
                <p className="mt-2 text-sm font-semibold text-[#4A4A4F]">Upload an image</p>
                <p className="text-xs text-[#8B8B96]">Tap to select a file from your device</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#333]">Blog Content</label>
          <textarea rows={6} placeholder="Start writing about how Saturn's return influences life transitions..." className="w-full rounded-lg border border-[#D9D2DE] px-3 py-2.5 text-sm outline-none" />
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
          <button type="button" className="h-11 rounded-xl border border-primary/35 bg-white text-sm font-semibold text-primary hover:bg-primary/5">
            Draft
          </button>
          <button type="button" className="h-11 rounded-xl bg-primary text-sm font-semibold text-white hover:opacity-90">
            Publish
          </button>
        </div>
      </form>
    </section>
  );
}
