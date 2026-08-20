"use client";

import { useState, type FormEvent } from "react";
import { contactInformation, serviceOptions } from "@/lib/site-config";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const inputClass =
  "w-full border-0 border-b border-charcoal/20 bg-transparent py-3 text-charcoal placeholder:text-charcoal/35 focus-visible:outline-none focus-visible:border-copper transition-colors";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepykbb";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("_subject", `New project inquiry — ${data.get("business") || data.get("name")}`);

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
    <section id="contact" className="border-t border-charcoal/10 bg-cream py-28 text-ink sm:py-36">
      <div className="container-arc">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel light>Start a Project</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h2 mt-6 font-medium tracking-tight text-charcoal">
                Tell us about your business.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body mt-6 max-w-xs text-charcoal/55">
                {contactInformation.location}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            {status === "success" ? (
              <Reveal>
                <div className="border-t border-charcoal/15 py-16">
                  <p className="text-h3 font-medium tracking-tight text-charcoal">
                    Thanks — we&apos;ve got your project details.
                  </p>
                  <p className="text-body mt-3 max-w-md text-charcoal/55">
                    We&apos;ll be in touch soon. In the meantime, feel free to
                    reach us directly at{" "}
                    <span className="font-medium">
                      {contactInformation.email}
                    </span>
                    .
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={handleSubmit} className="border-t border-charcoal/15 pt-10">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label text-charcoal/50">
                        Name
                      </label>
                      <input id="name" name="name" type="text" required className={`mt-2 ${inputClass}`} />
                    </div>
                    <div>
                      <label htmlFor="business" className="label text-charcoal/50">
                        Business Name
                      </label>
                      <input id="business" name="business" type="text" required className={`mt-2 ${inputClass}`} />
                    </div>
                    <div>
                      <label htmlFor="email" className="label text-charcoal/50">
                        Email
                      </label>
                      <input id="email" name="email" type="email" required className={`mt-2 ${inputClass}`} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="label text-charcoal/50">
                        Phone <span className="normal-case text-charcoal/35">(optional)</span>
                      </label>
                      <input id="phone" name="phone" type="tel" className={`mt-2 ${inputClass}`} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="service" className="label text-charcoal/50">
                        What do you need?
                      </label>
                      <select id="service" name="service" required defaultValue="" className={`mt-2 ${inputClass}`}>
                        <option value="" disabled>
                          Select a service
                        </option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="details" className="label text-charcoal/50">
                        Tell us about your project
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        required
                        rows={4}
                        className={`mt-2 resize-none ${inputClass}`}
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-body mt-6 max-w-md text-copper">
                      Something went wrong sending that — please try again, or
                      email us directly at{" "}
                      <span className="font-medium">
                        {contactInformation.email}
                      </span>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="label group mt-10 inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-cream transition-colors hover:bg-charcoal disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send Project Details"}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
