"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = localStorage.getItem("liquid-newsletter");
      const subscribers: string[] = saved ? JSON.parse(saved) : [];

      if (!subscribers.includes(trimmedEmail)) {
        subscribers.push(trimmedEmail);
        localStorage.setItem("liquid-newsletter", JSON.stringify(subscribers));
      }

      setMessage("Subscribed successfully. We will keep you posted.");
      setEmail("");
    } catch (submitError) {
      console.error("Newsletter subscription failed", submitError);
      setError("Could not save your subscription right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="site-shell relative overflow-hidden pt-12 pb-0 lg:pt-20">
      <img
        src="/liquid-logo.png"
        alt="logo background"
        className="pointer-events-none absolute bottom-0 left-1/2 w-[300px] -translate-x-1/2 object-contain opacity-15 blur-[1px] sm:w-[500px] md:w-[700px]"
      />

      <div className="relative z-10 card-fade mb-10 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-10 text-center backdrop-blur-sm md:mb-16 md:px-10 md:py-14">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Join The Liquid Family
        </p>

        <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
          Get early access to new drops and private release notes.
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60 md:text-base">
          Join the list for launch alerts, limited capsule updates, and curated editorials from the brand.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-lg"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-2 sm:flex-row sm:items-center sm:rounded-full sm:gap-2">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-xl bg-transparent px-5 text-base text-white placeholder:text-base placeholder:text-white/45 outline-none sm:h-11 sm:rounded-full"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 rounded-xl bg-white px-6 text-[10px] font-bold uppercase tracking-wider text-black transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:rounded-full sm:px-8 sm:text-xs"
            >
              {isSubmitting ? "Submitting..." : "Subscribe"}
            </button>
          </div>

          {message && (
            <p className="mt-4 text-sm text-emerald-300">{message}</p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
