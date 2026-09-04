"use client";

import { useState } from "react";

/**
 * Copies `text` to the clipboard. Defaults keep the store's wallet-address
 * behaviour; pass `label`/`copiedLabel` to reuse it as a share-link button.
 */
export default function CopyButton({
  text,
  className,
  label = "COPY ADDRESS",
  copiedLabel = "COPIED",
}: {
  text: string;
  className?: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? copiedLabel : label}
    </button>
  );
}
