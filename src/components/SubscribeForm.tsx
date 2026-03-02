"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export function SubscribeForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Try Netlify form submission
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
    } catch {
      // If Netlify form handler isn't active, that's OK — we still redirect
    }

    router.push("/success");
  }

  return (
    <form name="subscribe" onSubmit={handleSubmit} data-netlify="true" className="space-y-4">
      <input type="hidden" name="form-name" value="subscribe" />

      <div>
        <label htmlFor="email" className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase block mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          required
          className="subscribe-input w-full rounded"
        />
      </div>

      <div>
        <label htmlFor="name" className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase block mb-2">
          Name (optional)
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="What should we call you?"
          className="subscribe-input w-full rounded"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors disabled:opacity-50"
      >
        {submitting ? "TRANSMITTING..." : "SUBSCRIBE TO THE LATTICE DISPATCH"}
      </button>
    </form>
  );
}
