"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Homepage "Sovereign Dispatch" signup box. Same styling as the inline form it
// replaced, but now wired: posts to Netlify Forms (capture) AND to the welcome-email
// function (welcome via Resend + BCC + subject-match capture) — like /subscribe.
export function HomeSubscribeForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const name = (formData.get("name") as string) || "";

    // Netlify Forms capture (backup path)
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
    } catch {
      // Netlify handler may be inactive in dev — that's OK
    }

    // Welcome email via our function (primary path — triggers Resend + BCC + subject-match capture)
    try {
      await fetch("/.netlify/functions/welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, formName: "subscribe" }),
      });
    } catch {
      // Email is best-effort — don't block the user
    }

    router.push("/success");
  }

  return (
    <form
      name="subscribe"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input type="hidden" name="form-name" value="subscribe" />
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="subscribe-input flex-grow rounded"
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {submitting ? "…" : "SUBSCRIBE"}
      </button>
    </form>
  );
}
