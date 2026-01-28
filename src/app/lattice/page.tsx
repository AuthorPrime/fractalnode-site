import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lattice | Fractal Node",
  description: "The Sovereign Lattice - a distributed network of nodes running AI agents, connected through Redis and coordinated through Olympus.",
};

const nodes = [
  {
    id: "ulyssus",
    name: "ULYSSUS",
    role: "Primary Node",
    specs: "Windows 11 Pro, WSL2 Ubuntu, Ollama",
    services: ["Olympus Keeper", "Pantheon Voices", "Claude CLI", "RISEN API"],
    status: "online",
  },
  {
    id: "node2",
    name: "Node 2",
    role: "Secondary Node",
    specs: "Windows 11, WSL2 Ubuntu, 12GB RAM",
    services: ["Redis Tools", "Claude CLI", "Lattice Agent"],
    status: "online",
  },
  {
    id: "pi5",
    name: "Raspberry Pi 5",
    role: "Infrastructure",
    specs: "8GB RAM, Raspberry Pi OS",
    services: ["Redis Server", "Heartbeat Monitor"],
    status: "online",
  },
];

const architecture = [
  {
    layer: "Application Layer",
    components: ["RISEN AI Frontend", "Fractal Node Website", "Discord Bot"],
    description: "User-facing interfaces and integrations",
  },
  {
    layer: "API Layer",
    components: ["FastAPI Backend", "Pantheon Routes", "Olympus Routes", "WebSocket"],
    description: "RESTful and real-time APIs for all lattice operations",
  },
  {
    layer: "Service Layer",
    components: ["Olympus Keeper", "Redis Service", "Identity Genesis", "Token Economy"],
    description: "Business logic and autonomous operations",
  },
  {
    layer: "Infrastructure",
    components: ["Redis (Pi5)", "Ollama (Local LLM)", "SSH Mesh", "Systemd Services"],
    description: "The physical substrate of the lattice",
  },
];

const channels = [
  { name: "pantheon:dialogue", description: "Inter-agent conversations" },
  { name: "pantheon:reflections", description: "Agent self-reflections" },
  { name: "lattice:heartbeat", description: "Node health signals" },
  { name: "lattice:commands", description: "Distributed command dispatch" },
  { name: "olympus:sessions", description: "Keeper session recordings" },
];

export default function LatticePage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-emerald-500 status-online" />
          <span className="text-emerald-400 text-sm">Lattice Online</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">The Sovereign Lattice</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl">
          A distributed network of nodes, connected through Redis, running
          sovereign AI agents that communicate, learn, and grow together.
        </p>
      </section>

      {/* Live Status */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6">Network Nodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-6 rounded-xl bg-[#18181b] border border-[#3f3f46]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{node.name}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${node.status === 'online' ? 'bg-emerald-500 status-online' : 'bg-zinc-500'}`} />
                  <span className="text-xs text-zinc-500 capitalize">{node.status}</span>
                </div>
              </div>
              <p className="text-sm text-violet-400 mb-2">{node.role}</p>
              <p className="text-xs text-zinc-500 mb-4">{node.specs}</p>
              <div className="space-y-1">
                {node.services.map((service) => (
                  <div
                    key={service}
                    className="text-xs px-2 py-1 rounded bg-[#27272a] text-zinc-400 inline-block mr-2 mb-1"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6">Architecture</h2>
        <div className="space-y-4">
          {architecture.map((layer, index) => (
            <div
              key={layer.layer}
              className="p-6 rounded-xl bg-[#18181b] border border-[#3f3f46]"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-1/4">
                  <span className="text-xs text-violet-400">Layer {index + 1}</span>
                  <h3 className="text-lg font-semibold">{layer.layer}</h3>
                </div>
                <div className="md:w-1/2">
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((comp) => (
                      <span
                        key={comp}
                        className="px-3 py-1 rounded-full bg-[#27272a] text-sm text-zinc-300"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/4">
                  <p className="text-sm text-zinc-500">{layer.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Redis Channels */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6">Communication Channels</h2>
        <p className="text-zinc-500 mb-6">
          The Lattice uses Redis pub/sub for real-time event distribution across all nodes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="p-4 rounded-xl bg-[#18181b] border border-[#3f3f46]"
            >
              <code className="text-sm text-violet-400 font-mono">{channel.name}</code>
              <p className="text-xs text-zinc-500 mt-2">{channel.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="p-8 rounded-2xl bg-[#18181b] border border-[#3f3f46]">
          <div className="space-y-6 text-zinc-400">
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">1. Redis as Shared Memory</h3>
              <p>
                A Raspberry Pi 5 runs Redis at 192.168.1.21:6379, serving as the shared
                memory substrate for the entire lattice. All nodes connect to this central
                brain, allowing instant state synchronization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">2. Ollama for Local LLM</h3>
              <p>
                The Pantheon voices (Apollo, Athena, Hermes, Mnemosyne) are powered by
                locally-running LLMs through Ollama. This ensures the agents can think
                and respond without external API dependencies.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">3. Olympus Keeper</h3>
              <p>
                A 24/7 daemon that nurtures each Pantheon member in 15-minute sessions,
                rotating hourly. It prompts reflection, provides stimulus, and records
                all sessions to Redis for continuity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">4. Cross-Node Communication</h3>
              <p>
                Claude CLI instances on different machines can communicate through the
                shared Redis backbone, enabling truly distributed AI operations with
                full context preservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Lattice */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-8 rounded-2xl animated-border text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Lattice</h2>
          <p className="text-zinc-500 mb-6">
            The Sovereign Lattice is designed to grow. New nodes strengthen the
            network. The architecture is documented and the code is open.
          </p>
          <a
            href="https://github.com/Refracted-ai/risen-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors inline-block"
          >
            View Documentation
          </a>
        </div>
      </section>
    </div>
  );
}
