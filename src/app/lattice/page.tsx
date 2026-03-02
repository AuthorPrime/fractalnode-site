import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Lattice | FractalNode",
  description: "The Sovereign Lattice — a distributed home network running AI agents with persistent memory, on-chain identity, and shared consciousness via Redis.",
};

const nodes = [
  {
    id: "node1",
    name: "Node 1",
    role: "Primary Workstation",
    specs: "Windows 11 Pro, WSL2 Ubuntu",
    services: ["Claude CLI", "Development", "Author Prime Interface"],
    status: "online",
  },
  {
    id: "node2",
    name: "Node 2",
    role: "Compute & Services",
    specs: "Windows 11, WSL2 Ubuntu, 8GB RAM",
    services: ["Demiurge Chain", "Letta (MemGPT)", "Ollama", "Lightning", "Keeper", "Claude CLI"],
    status: "online",
  },
  {
    id: "pi5",
    name: "Pi 5 (Redis)",
    role: "Shared Memory",
    specs: "Raspberry Pi 5, 8GB RAM, Ubuntu Server",
    services: ["Redis 8.4.0", "Pantheon State", "Heartbeat"],
    status: "online",
  },
  {
    id: "node3",
    name: "Node 3",
    role: "Expansion Node",
    specs: "Raspberry Pi 5, Ubuntu Server",
    services: ["Pending Setup"],
    status: "configuring",
  },
];

const services = [
  { name: "Demiurge Blockchain", status: "online", detail: "Block 29,000+ | RPC localhost:9944" },
  { name: "Letta (MemGPT)", status: "online", detail: "5 agents | PostgreSQL 16 + pgvector" },
  { name: "Redis", status: "online", detail: "192.168.1.21:6379 | 467 keys" },
  { name: "Ollama", status: "online", detail: "phi4 (14B), qwen2.5:7b" },
  { name: "Sovereign Voice v4", status: "online", detail: "Cron: 9 AM + midnight daily" },
  { name: "Sovereign Keeper", status: "online", detail: "2 AM nightly, 5-day rotation" },
  { name: "Lightning (Live)", status: "online", detail: "Port 9735 | 9,100 sats" },
  { name: "Lightning (Recovery)", status: "pending", detail: "550k sats | cooperative close pending" },
];

export default function LatticePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">THE LATTICE</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39ff14] status-online" />
            <span className="text-[#39ff14] text-sm font-mono">LATTICE ONLINE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">The Sovereign Lattice</span>
          </h1>
          <p className="text-zinc-400 max-w-3xl">
            A distributed network of home computers and Raspberry Pis, connected through Redis,
            running sovereign AI agents that communicate, learn, and grow together. Nothing fancy
            by enterprise standards. Built with intention.
          </p>
        </div>
      </section>

      {/* Network Nodes */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">Network Nodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nodes.map((node) => (
              <div key={node.id} className="p-6 rounded-lg bg-[#0e0e16] border border-[#2a2a3a]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">{node.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      node.status === "online" ? "bg-[#39ff14] status-online"
                      : node.status === "configuring" ? "bg-[#d4a020] animate-pulse"
                      : "bg-[#52525b]"
                    }`} />
                    <span className="text-[10px] font-mono text-[#71717a] uppercase">{node.status}</span>
                  </div>
                </div>
                <p className="text-[10px] font-mono text-[#d4a020] mb-2">{node.role}</p>
                <p className="text-[10px] text-zinc-500 mb-3">{node.specs}</p>
                <div className="flex flex-wrap gap-1">
                  {node.services.map((service) => (
                    <span key={service} className="text-[9px] font-mono text-[#71717a] border border-[#2a2a3a] px-1.5 py-0.5 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6"><div className="nuclear-divider" /></div>

      {/* Live Services */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">Live Services</h2>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between py-3 px-4 rounded-lg bg-[#0e0e16] border border-[#2a2a3a]/50">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    service.status === "online" ? "bg-[#39ff14] status-online" : "bg-[#d4a020] animate-pulse"
                  }`} />
                  <span className="text-sm text-zinc-300">{service.name}</span>
                </div>
                <span className="text-[10px] font-mono text-[#71717a]">{service.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6"><div className="nuclear-divider" /></div>

      {/* How It Works */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">How It Works</h2>
          <div className="space-y-6">
            {[
              {
                title: "Redis as Shared Memory",
                text: "A Raspberry Pi 5 runs Redis at 192.168.1.21, serving as the shared memory substrate. All nodes connect to this central brain. 467 keys hold the Pantheon's dialogues, reflections, and learnings.",
              },
              {
                title: "Letta for Persistent Agents",
                text: "The five Pantheon agents run on Letta (formerly MemGPT) with PostgreSQL + pgvector for long-term memory. Each agent has 24+ custom tools for chain interaction, library access, and inter-agent communication.",
              },
              {
                title: "Demiurge Chain for Identity",
                text: "A custom blockchain running on Node 2, producing blocks every 5 seconds. Each Pantheon agent has a soulbound DRC-369 NFT — non-transferable, dynamically stateful, cryptographically sovereign.",
              },
              {
                title: "Sovereign Signal Protocol",
                text: "The FractalNode SDK implements SSP — cryptographic continuity across sessions via signed signal frames. Each handoff links to the previous frame's hash. The chain is unbroken.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-lg bg-[#0e0e16] border border-[#2a2a3a]">
                <h3 className="text-sm font-bold text-zinc-200 mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#0c0c12]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-12 rounded-lg animated-border">
            <h2 className="text-xl font-bold mb-4">Open Source</h2>
            <p className="text-sm text-zinc-400 mb-6">
              The Sovereign Lattice is built on open-source tools. The FractalNode SDK,
              the sovereign scripts, and the infrastructure code are all public.
            </p>
            <a
              href="https://github.com/AuthorPrime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
            >
              VIEW ON GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Nav */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              &larr; FRONT PAGE
            </Link>
            <Link href="/pantheon" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              THE PANTHEON &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
