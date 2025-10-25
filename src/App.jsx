import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import SourceControls from './components/SourceControls';
import LiveFeed from './components/LiveFeed';

const ALL_SOURCES = [
  { id: 'devpost', name: 'Devpost' },
  { id: 'mlh', name: 'MLH' },
  { id: 'eventbrite', name: 'Eventbrite' },
  { id: 'hackclub', name: 'Hack Club' },
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function useMockLiveScrape(enabledSources, keywords) {
  const [items, setItems] = useState([]);
  const timerRef = useRef(null);

  const activeSourceIds = useMemo(() => enabledSources.filter(s => s.enabled).map(s => s.id), [enabledSources]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Simulate live events every 1.5-3s
    timerRef.current = setInterval(() => {
      if (activeSourceIds.length === 0) return;
      const source = randomItem(activeSourceIds);
      const sampleTitles = [
        'AI for Social Good',
        'Web3 Builders Night',
        'Climate Tech Sprint',
        'Open Source Weekend',
        'HealthTech Datathon',
        'FinTech Challenge',
        'Education Innovation Jam',
      ];

      const locations = ['Remote', 'San Francisco, CA', 'New York, NY', 'Berlin, DE', 'Bengaluru, IN', 'London, UK'];
      const prizes = ['$5,000', '$10,000', '$2,000', 'Swag + Mentorship', 'Travel Stipend'];

      const title = randomItem(sampleTitles);
      const matchedKeyword = keywords.find(k => title.toLowerCase().includes(k.toLowerCase()));

      const newItem = {
        id: crypto.randomUUID(),
        title: matchedKeyword ? `${title} (${matchedKeyword})` : title,
        source,
        time: new Date().toISOString(),
        location: randomItem(locations),
        prize: randomItem(prizes),
        url: '#',
      };

      setItems(prev => [newItem, ...prev].slice(0, 100));
    }, 1200 + Math.random() * 1200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSourceIds, keywords]);

  return items;
}

export default function App() {
  const [sources, setSources] = useState(ALL_SOURCES.map(s => ({ ...s, enabled: true })));
  const [keywords, setKeywords] = useState(['AI', 'Health', 'Open Source']);

  const items = useMockLiveScrape(sources, keywords);

  const handleToggleSource = (id) => {
    setSources(prev => prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const handleKeywordsChange = (arr) => setKeywords(arr);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <HeroCover />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <section className="-mt-24">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur md:p-6 p-4 shadow-lg">
            <SourceControls
              sources={sources}
              onToggleSource={handleToggleSource}
              keywords={keywords}
              onKeywordsChange={handleKeywordsChange}
            />
          </div>
        </section>

        <section className="mt-8">
          <LiveFeed items={items} />
        </section>
      </main>
    </div>
  );
}
