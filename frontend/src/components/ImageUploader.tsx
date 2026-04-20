"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  Loader2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

interface AnalysisResult {
  is_real: boolean;
  is_ai_generated: boolean;
  message: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:5000";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setImage(file);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/check_image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to reach the backend server.");
      } else {
        setError("Something went wrong while analyzing the image.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="mx-auto w-full max-w-4xl"
      id="checker"
      aria-labelledby="checker-title"
    >
      <div className="rounded-[2rem] border border-black/[0.08] bg-white p-4 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:p-6">
        {!preview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-dashed border-neutral-300 bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] px-6 py-[4.5rem] text-center transition hover:border-neutral-500 hover:bg-white md:px-12 md:py-24"
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="mx-auto mb-8 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-black/10 bg-[#f6f4ef] transition group-hover:scale-105">
              <Upload className="h-8 w-8 text-black stroke-[1.5px]" />
            </div>
            <h2
              id="checker-title"
              className="mb-3 text-2xl font-semibold tracking-tight text-black md:text-3xl"
            >
              Upload an image to check
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
              Drag and drop an image here, or click to browse. We support common
              formats like JPG, PNG, and WEBP.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-[#fcfbf8]"
          >
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-white">
              <Image
                src={preview}
                alt="Uploaded image preview"
                width={1200}
                height={900}
                unoptimized
                className="max-h-full w-full object-contain p-4"
              />

              {loading && (
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 z-10 h-[2px] w-full bg-black/40"
                />
              )}

              <button
                onClick={clearImage}
                className="absolute top-5 right-5 rounded-full border border-black/10 bg-white p-2 text-neutral-500 transition hover:text-black"
                aria-label="Remove image"
              >
                <X className="h-5 w-5 stroke-[1.5px]" />
              </button>
            </div>

            <div className="space-y-8 p-6 md:p-10">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center rounded-[1.25rem] border border-black/[0.06] bg-white px-5 py-8 text-center"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      {result.is_ai_generated ? (
                        <ShieldAlert className="h-5 w-5 text-neutral-500 stroke-[1.5px]" />
                      ) : (
                        <ShieldCheck className="h-5 w-5 text-black stroke-[1.5px]" />
                      )}
                      <span className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
                        Result
                      </span>
                    </div>
                    <h3 className="text-3xl tracking-tight text-black md:text-4xl">
                      {result.is_ai_generated
                        ? "Likely AI-generated"
                        : "Likely a real image"}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                      {result.message}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Review the prediction before making any final decision.
                    </p>
                  </motion.div>
                ) : error ? (
                  <div className="rounded-[1.25rem] border border-red-100 bg-red-50 px-5 py-4 text-center text-sm text-red-600">
                    {error}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.25rem] border border-black/[0.06] bg-white p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                        Step 1
                      </p>
                      <p className="mt-2 text-sm text-neutral-700">
                        Upload one image file from your device.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-black/[0.06] bg-white p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                        Step 2
                      </p>
                      <p className="mt-2 text-sm text-neutral-700">
                        Run the checker to analyze visible patterns.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-black/[0.06] bg-white p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                        Step 3
                      </p>
                      <p className="mt-2 text-sm text-neutral-700">
                        Use the result as a quick signal, not a final proof.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {!result && !loading && (
                  <button
                    onClick={analyzeImage}
                    className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Analyze image
                  </button>
                )}

                {loading && (
                  <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-6 py-3 text-sm text-neutral-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking image...
                  </div>
                )}

                {(preview || result) && (
                  <button
                    onClick={clearImage}
                    className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-black hover:text-black"
                  >
                    <X className="h-4 w-4" />
                    Start over
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ImageUploader;
