import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

export default function SourceControls({ sources, onToggleSource, keywords, onKeywordsChange }) {
  const [input, setInput] = useState('');

  const enabledCount = useMemo(() => sources.filter(s => s.enabled).length, [sources]);

  const addKeyword = () => {
    const k = input.trim();
    if (!k) return;
    if (!keywords.includes(k)) onKeywordsChange([...keywords, k]);
    setInput('');
  };

  const removeKeyword = (k) => {
    onKeywordsChange(keywords.filter(x => x !== k));
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-400">Sources</h3>
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <button
              key={s.id}
              onClick={() => onToggleSource(s.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                s.enabled
                  ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-200 hover:bg-yellow-400/20'
                  : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.enabled ? '#FACC15' : '#525252' }} />
              {s.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500">{enabledCount} source(s) enabled</p>
      </div>

      <div className="md:col-span-1">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-400">Keywords</h3>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 pl-9 pr-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none ring-yellow-400/30 focus:ring-2"
              placeholder="Add keyword and press Enter"
            />
          </div>
          <button onClick={addKeyword} className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800">Add</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {keywords.map(k => (
            <span key={k} className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300">
              {k}
              <button onClick={() => removeKeyword(k)} className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400 hover:bg-neutral-700">×</button>
            </span>
          ))}
          {keywords.length === 0 && (
            <span className="text-sm text-neutral-500">No keywords. All items will appear.</span>
          )}
        </div>
      </div>
    </div>
  );
}
