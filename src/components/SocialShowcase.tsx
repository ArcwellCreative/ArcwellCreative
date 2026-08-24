"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart, MessageCircle, Send } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const POSTS = [
  { bg: "bg-copper", fg: "text-cream", accent: "bg-cream", label: "Feed Post" },
  { bg: "bg-charcoal", fg: "text-cream", accent: "bg-copper-light", label: "Story" },
  { bg: "bg-stone", fg: "text-charcoal", accent: "bg-copper", label: "Ad Campaign" },
] as const;

function PostCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <div
      className={`flex h-full w-full flex-col justify-between rounded-[14px] border border-cream/10 p-5 ${post.bg}`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`h-7 w-7 shrink-0 rounded-full ${post.accent} opacity-80`} />
        <div className="flex flex-col gap-1.5">
          <span className={`h-2 w-16 rounded-full ${post.accent} opacity-70`} />
          <span className={`h-1.5 w-10 rounded-full ${post.accent} opacity-35`} />
        </div>
      </div>
      <div className={`my-4 flex-1 rounded-lg ${post.accent} opacity-[0.12]`} />
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-3 ${post.fg} opacity-80`}>
          <Heart size={16} strokeWidth={1.75} />
          <MessageCircle size={16} strokeWidth={1.75} />
          <Send size={16} strokeWidth={1.75} />
        </div>
        <span className={`label ${post.fg} opacity-70`}>{post.label}</span>
      </div>
    </div>
  );
}

export function SocialShowcase() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % POSTS.length), 2600);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <div className="mt-9 flex flex-col items-center gap-6 sm:mt-10">
      <div className="relative h-52 w-72 shrink-0 sm:h-60 sm:w-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
          >
            <PostCard post={POSTS[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2.5">
        {POSTS.map((post, i) => (
          <button
            key={post.label}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${post.label} mockup`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-copper-light" : "bg-cream/20 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
