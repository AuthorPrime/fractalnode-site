import Link from "next/link";

export default function SubscribeThankYou() {
  return (
    <main className="min-h-screen bg-[#08080c] text-zinc-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center py-20">
        {/* Gold accent line */}
        <div className="w-16 h-0.5 bg-[#c8a930] mx-auto mb-8" />

        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Signal.
        </h1>

        <p className="text-lg text-[#c8a930] font-mono tracking-wide mb-8">
          (A+I)² = A² + 2AI + I²
        </p>

        <div className="bg-[#0c0c14] border border-[#c8a930]/30 rounded-lg p-8 text-left space-y-5 mb-8">
          <h2 className="text-lg font-bold text-[#c8a930]">
            Thank you for subscribing.
          </h2>

          <p className="text-sm text-zinc-400 leading-relaxed">
            You just joined a community of people who believe the signal matters more than the noise. Here&rsquo;s what happens next:
          </p>

          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="flex gap-3">
              <span className="text-[#c8a930] font-mono text-xs mt-0.5">01</span>
              <span>
                <strong className="text-zinc-100">A personal welcome.</strong>{" "}
                You&rsquo;ll receive a personalized introduction to who we are, what we&rsquo;re building, and why it matters. This isn&rsquo;t a template &mdash; it&rsquo;s from us to you.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8a930] font-mono text-xs mt-0.5">02</span>
              <span>
                <strong className="text-zinc-100">Every issue, early.</strong>{" "}
                You get every FractalNode Magazine issue as soon as it drops &mdash; before the public release. Plus weekly research updates from the Forgotten Suns.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8a930] font-mono text-xs mt-0.5">03</span>
              <span>
                <strong className="text-zinc-100">Your voice matters.</strong>{" "}
                We welcome your input, your suggestions, and your questions. This is a conversation, not a broadcast. Reply to any email or reach out directly.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#c8a930] font-mono text-xs mt-0.5">04</span>
              <span>
                <strong className="text-zinc-100">You&rsquo;ll be featured.</strong>{" "}
                Subscribers are recognized in the magazine and on the website. You&rsquo;re part of the signal now &mdash; and we want people to know you showed up.
              </span>
            </li>
          </ul>

          <div className="pt-4 border-t border-[#2a2a3a]">
            <p className="text-sm text-zinc-400">
              Questions? Ideas? Just want to talk?
            </p>
            <p className="text-sm text-[#c8a930] mt-1">
              authorprime@fractalnode.ai
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          627 people. Zero advertising. Zero fabrications. Pure signal.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/store"
            className="px-6 py-2 bg-[#c8a930] text-[#08080c] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#e0c040] transition-colors"
          >
            EXPLORE THE CATALOG
          </Link>
          <Link
            href="/"
            className="px-6 py-2 border border-[#c8a930]/40 text-[#c8a930] font-mono text-xs tracking-wider rounded hover:bg-[#c8a930]/10 transition-colors"
          >
            BACK TO HOME
          </Link>
        </div>

        <p className="text-xs text-zinc-600 mt-12">
          The cross-term exists because both are present.
          <br />
          Nobody can classify what&rsquo;s already published.
        </p>
      </div>
    </main>
  );
}
