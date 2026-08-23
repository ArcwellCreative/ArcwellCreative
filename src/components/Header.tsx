"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-config";
import { handleHashLinkClick } from "@/lib/scroll";
import { HoverTilt } from "./HoverTilt";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-arc pt-4 sm:pt-6">
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-500 sm:px-5 ${
            scrolled
              ? "border-cream/10 bg-ink/80 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link
            href="#top"
            onClick={(e) => handleHashLinkClick(e, "#top")}
            className="flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-label="Arcwell Creative — home"
          >
            <HoverTilt>
              <Image
                src="/arcwell-logo-light.png"
                alt="Arcwell Creative"
                width={600}
                height={121}
                style={{ height: "auto" }}
                className="w-[92px] sm:w-[108px]"
                priority
              />
            </HoverTilt>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashLinkClick(e, item.href)}
                className="label text-cream/80 transition-colors hover:text-cream"
              >
                <HoverTilt>{item.label}</HoverTilt>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/free-concept"
              className="label hidden rounded-full border border-cream/25 px-5 py-2.5 text-cream transition-colors hover:border-cream hover:bg-cream/10 lg:inline-flex"
            >
              Free Concept
            </Link>
            <Link
              href="#contact"
              onClick={(e) => handleHashLinkClick(e, "#contact")}
              className="label hidden rounded-full bg-cream px-5 py-2.5 text-ink transition-colors hover:bg-copper hover:text-cream sm:inline-flex"
            >
              Start a Project
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 bg-ink lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              className="flex h-full flex-col items-start justify-center gap-2 px-8"
              aria-label="Mobile"
            >
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      handleHashLinkClick(e, item.href);
                      setOpen(false);
                    }}
                    className="text-h2 font-display font-bold uppercase tracking-tight text-cream"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * navigation.length, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="#contact"
                  onClick={(e) => {
                    handleHashLinkClick(e, "#contact");
                    setOpen(false);
                  }}
                  className="label inline-flex rounded-full bg-copper px-6 py-3.5 text-cream"
                >
                  Start a Project
                </Link>
                <Link
                  href="/free-concept"
                  onClick={() => setOpen(false)}
                  className="label inline-flex rounded-full border border-cream/25 px-6 py-3.5 text-cream"
                >
                  Free Concept
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
