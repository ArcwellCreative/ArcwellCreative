"use client";

import { useState, type FormEvent } from "react";
import { contactInformation, serviceOptions } from "@/lib/site-config";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const inputClass =
  "w-full border-0 border-b border-charcoal/20 bg-transparent py-3 text-charcoal placeholder:text-charcoal/35 focus-visible:outline-none focus-visible:border-copper transition-colors";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepykbb";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showCallback, setShowCallback] = useState(false);
  const [callbackStatus, setCallbackStatus] = useState<FormStatus>("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [serviceError, setServiceError] = useState(false);

  function toggleService(option: string) {
    setSelectedServices((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
    setServiceError(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const chosen = selectedServices.map((s) =>
      s === "Other" && otherText.trim() ? `Other: ${otherText.trim()}` : s
    );
    if (chosen.length === 0) {
      setServiceError(true);
      return;
    }

    const data = new FormData(form);
    data.set("service", chosen.join(", "));
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
      setSelectedServices([]);
      setOtherText("");
    } catch {
      setStatus("error");
    }
  }

  async function handleCallbackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set(
      "_subject",
      `Call back request — ${data.get("name") || data.get("phone")}`,
    );

    setCallbackStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");
      setCallbackStatus("success");
      form.reset();
    } catch {
      setCallbackStatus("error");
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
                      <fieldset>
                        <legend className="label text-charcoal/50">
                          What do you need?{" "}
                          <span className="normal-case text-charcoal/35">(select all that apply)</span>
                        </legend>
                        <div className="mt-3 flex flex-col gap-3">
                          {serviceOptions.map((option) => (
                            <label
                              key={option}
                              className="flex cursor-pointer items-center gap-2.5 text-charcoal/80"
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(option)}
                                onChange={() => toggleService(option)}
                                className="h-4 w-4 accent-copper"
                              />
                              {option}
                            </label>
                          ))}
                          <label className="flex cursor-pointer items-center gap-2.5 text-charcoal/80">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes("Other")}
                              onChange={() => toggleService("Other")}
                              className="h-4 w-4 accent-copper"
                            />
                            Other
                          </label>
                        </div>

                        {selectedServices.includes("Other") && (
                          <input
                            type="text"
                            value={otherText}
                            onChange={(e) => setOtherText(e.target.value)}
                            placeholder="What do you need? Tell us and we'll let you know if we can help."
                            className={`mt-3 ${inputClass}`}
                          />
                        )}

                        {serviceError && (
                          <p className="mt-2 text-sm text-copper">
                            Pick at least one — or check Other and tell us what you need.
                          </p>
                        )}
                      </fieldset>
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

                {callbackStatus === "success" ? (
                  <div className="mt-6 border-t border-charcoal/15 pt-6">
                    <p className="text-body font-medium text-charcoal">
                      Got it — we&apos;ll give you a call soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowCallback((v) => !v)}
                      aria-expanded={showCallback}
                      aria-controls="callback-form"
                      className="label mt-6 inline-flex items-center gap-2 text-charcoal/60 underline decoration-charcoal/25 underline-offset-4 transition-colors hover:text-charcoal"
                    >
                      {showCallback
                        ? "Never mind"
                        : "Prefer a call? Request a call back"}
                    </button>

                    {showCallback && (
                      <form
                        id="callback-form"
                        onSubmit={handleCallbackSubmit}
                        className="mt-6 max-w-md border-t border-charcoal/15 pt-6"
                      >
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="cb-name" className="label text-charcoal/50">
                              Name <span className="normal-case text-charcoal/35">(optional)</span>
                            </label>
                            <input id="cb-name" name="name" type="text" className={`mt-2 ${inputClass}`} />
                          </div>
                          <div>
                            <label htmlFor="cb-phone" className="label text-charcoal/50">
                              Phone
                            </label>
                            <input id="cb-phone" name="phone" type="tel" required className={`mt-2 ${inputClass}`} />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="cb-question" className="label text-charcoal/50">
                              What&apos;s your question?
                            </label>
                            <textarea
                              id="cb-question"
                              name="question"
                              required
                              rows={2}
                              className={`mt-2 resize-none ${inputClass}`}
                            />
                          </div>
                        </div>

                        {callbackStatus === "error" && (
                          <p className="text-body mt-4 max-w-md text-copper">
                            Something went wrong — please try again, or email{" "}
                            <span className="font-medium">
                              {contactInformation.email}
                            </span>
                            .
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={callbackStatus === "submitting"}
                          className="label group mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-3.5 text-charcoal transition-colors hover:border-charcoal disabled:opacity-60"
                        >
                          {callbackStatus === "submitting" ? "Sending…" : "Request Call Back"}
                          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                            →
                          </span>
                        </button>
                      </form>
                    )}
                  </>
                )}
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
