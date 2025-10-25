import { Rocket, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-800/80 backdrop-blur bg-neutral-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/10 ring-1 ring-yellow-400/30">
            <Rocket size={18} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-neutral-400">Live Tracker</p>
            <h1 className="font-semibold leading-none">Hackathon Radar</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <a href="#" className="rounded-md px-3 py-2 text-sm hover:text-neutral-200">Docs</a>
          <a href="#" className="rounded-md px-3 py-2 text-sm hover:text-neutral-200">API</a>
          <button className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}
