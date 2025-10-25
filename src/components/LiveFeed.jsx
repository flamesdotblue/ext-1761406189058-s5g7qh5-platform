import { useMemo } from 'react';

const SOURCE_COLORS = {
  devpost: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30',
  mlh: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30',
  eventbrite: 'bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30',
  hackclub: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
};

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.max(1, Math.floor(diff))}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function LiveFeed({ items }) {
  const count = items.length;

  const grouped = useMemo(() => {
    const bySource = {};
    for (const item of items) {
      bySource[item.source] ||= 0;
      bySource[item.source] += 1;
    }
    return bySource;
  }, [items]);

  return (
    <div id="feed" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-6 shadow-lg">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Live Feed</h3>
          <p className="text-sm text-neutral-400">Streaming new hackathons from your selected sources in real time.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {Object.entries(grouped).map(([src, c]) => (
            <span key={src} className={`rounded-full px-3 py-1 ${SOURCE_COLORS[src] || 'bg-neutral-800 text-neutral-300 ring-1 ring-neutral-700'}`}>
              {src} • {c}
            </span>
          ))}
          <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-yellow-200 ring-1 ring-yellow-400/30">total • {count}</span>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-neutral-800">
        {items.map((item) => (
          <li key={item.id} className="grid gap-3 py-4 md:grid-cols-12">
            <div className="md:col-span-7">
              <a href={item.url} className="font-medium text-neutral-100 hover:text-yellow-200">{item.title}</a>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                <span className={`rounded-full px-2 py-0.5 ${SOURCE_COLORS[item.source] || 'bg-neutral-800 text-neutral-300 ring-1 ring-neutral-700'}`}>{item.source}</span>
                <span className="rounded-full bg-neutral-800 px-2 py-0.5">{item.location}</span>
                <span className="rounded-full bg-neutral-800 px-2 py-0.5">Prize: {item.prize}</span>
              </div>
            </div>
            <div className="md:col-span-3 md:text-center text-neutral-400">
              <p className="text-sm">{new Date(item.time).toLocaleString()}</p>
              <p className="text-xs">{timeAgo(item.time)}</p>
            </div>
            <div className="md:col-span-2 md:text-right">
              <a href={item.url} className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800">Open</a>
            </div>
          </li>
        ))}

        {items.length === 0 && (
          <li className="py-10 text-center text-neutral-500">No items yet. Enable sources or add keywords to start streaming.</li>
        )}
      </ul>
    </div>
  );
}
