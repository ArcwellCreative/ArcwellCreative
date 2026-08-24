"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { contactInformation } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepykbb";

// Fixed 30-day window — not reset per visitor, so the countdown is real.
const DEADLINE = new Date(2026, 8, 22, 23, 59, 59).getTime();

type FormStatus = "idle" | "submitting" | "success" | "error";

function useCountdown(deadline: number) {
  const [remaining, setRemaining] = useState(() => Math.max(0, deadline - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, deadline - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: remaining <= 0,
  };
}

const inputClass =
  "w-full border-0 border-b border-cream/20 bg-transparent py-3 text-cream placeholder:text-cream/35 focus-visible:outline-none focus-visible:border-copper-light transition-colors";

export function FreeConceptOffer() {
  const { days, hours, minutes, seconds, expired } = useCountdown(DEADLINE);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("_subject", `Free concept request — ${data.get("business") || data.get("name")}`);

    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-ink">
      <header className="container-arc flex items-center justify-between pt-6 pb-4 sm:pt-8">
        <Link href="/" aria-label="Arcwell Creative — home">
          <Image
            src="/arcwell-logo-light.svg"
            alt="Arcwell Creative"
            width={738}
            height={173}
            style={{ height: "auto" }}
            className="w-[148px]"
            priority
          />
        </Link>
        <Link
          href="/"
          className="label text-cream/60 transition-colors hover:text-cream"
        >
          ← Back to site
        </Link>
      </header>

      <section className="container-arc py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="label text-copper-light">Complimentary Concept</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mt-6 font-display font-extrabold uppercase tracking-tight text-cream">
                Get a <span className="text-copper-light">free</span> concept
                for your business.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg mt-8 max-w-lg text-cream/70">
                We&apos;re selecting a limited number of local businesses for
                complimentary design concepts. Send us your current website,
                logo, or social media, and we&apos;ll show you exactly what
                we&apos;d improve — no obligation, no hard sell.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-14">
                <p className="label text-cream/50">
                  {expired ? "This round has closed" : "This round closes in"}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
                  {[
                    { value: days, label: "Days" },
                    { value: hours, label: "Hrs" },
                    { value: minutes, label: "Min" },
                    { value: seconds, label: "Sec" },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="flex w-[4.5rem] flex-col items-center rounded-xl border border-cream/15 bg-charcoal py-4 sm:w-24"
                    >
                      <span className="font-display text-3xl font-extrabold tabular-nums text-cream sm:text-4xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="label mt-1 text-cream/45">{unit.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              {status === "success" ? (
                <div className="rounded-2xl border border-cream/15 bg-charcoal p-8">
                  <p className="text-h3 font-display font-bold uppercase tracking-tight text-cream">
                    Thanks — request received.
                  </p>
                  <p className="text-body mt-3 text-cream/65">
                    We&apos;ll be in touch soon. In the meantime, reach us
                    directly at{" "}
                    <span className="font-medium text-cream">
                      {contactInformation.email}
                    </span>
                    .
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-cream/15 bg-charcoal p-6 sm:p-8"
                >
                  <p className="label text-cream/50">Request Your Concept</p>
                  <div className="mt-6 flex flex-col gap-6">
                    <div>
                      <label htmlFor="fc-name" className="label text-cream/50">
                        Name
                      </label>
                      <input
                        id="fc-name"
                        name="name"
                        type="text"
                        required
                        className={`mt-2 ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="fc-business" className="label text-cream/50">
                        Business Name
                      </label>
                      <input
                        id="fc-business"
                        name="business"
                        type="text"
                        required
                        className={`mt-2 ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="fc-email" className="label text-cream/50">
                        Email
                      </label>
                      <input
                        id="fc-email"
                        name="email"
                        type="email"
                        required
                        className={`mt-2 ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="fc-link" className="label text-cream/50">
                        Website or social media{" "}
                        <span className="normal-case text-cream/35">(optional)</span>
                      </label>
                      <input
                        id="fc-link"
                        name="link"
                        type="text"
                        placeholder="e.g. yoursite.com or @yourbusiness"
                        className={`mt-2 ${inputClass}`}
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-body mt-4 text-copper-light">
                      Something went wrong sending that — please try again, or
                      email us directly at{" "}
                      <span className="font-medium">{contactInformation.email}</span>.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="label group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-6 py-3.5 text-cream transition-colors hover:bg-copper-light disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Request My Free Concept"}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="container-arc flex flex-col-reverse items-start gap-4 border-t border-cream/10 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body text-cream/50">
          © {new Date().getFullYear()} Arcwell Creative. All rights reserved.
        </p>
        <a
          href={`mailto:${contactInformation.email}`}
          className="text-body text-cream/50 transition-colors hover:text-cream"
        >
          {contactInformation.email}
        </a>
      </footer>
    </main>
  );
}
