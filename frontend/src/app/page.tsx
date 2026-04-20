"use client";

import Footer from "@/components/Footer";
import ImageUploader from "@/components/ImageUploader";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TrueArt AI Checker",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description:
      "Upload an image and get a quick prediction on whether it is likely AI-generated or real.",
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f6f4ef_55%,#f0ede6_100%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-14 lg:px-10 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Minimal AI image checker
          </p>
          <h1 className="mb-5 text-5xl leading-none tracking-tight text-black md:text-7xl">
            Check if an image looks AI-generated
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
            Upload one image, run the analysis, and get a simple prediction in a
            focused interface without the extra clutter.
          </p>
        </motion.div>

        <ImageUploader />

        <section className="mx-auto mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-black/[0.06] bg-white px-5 py-6">
            <p className="text-sm font-medium text-black">Fast workflow</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Upload, analyze, and review the result in one place.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/[0.06] bg-white px-5 py-6">
            <p className="text-sm font-medium text-black">Clear result</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              The prediction is shown in plain language with minimal noise.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/[0.06] bg-white px-5 py-6">
            <p className="text-sm font-medium text-black">SEO-ready page</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Better metadata, semantics, and index-friendly content structure.
            </p>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
