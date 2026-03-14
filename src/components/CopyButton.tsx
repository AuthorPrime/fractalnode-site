"use client";

import { useState } from "react";

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
    >
      {copied ? "COPIED" : "COPY ADDRESS"}
    </button>
  );
}
