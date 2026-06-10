import { Wordmark } from './common';

type Tab = 'leaderboard' | 'groups' | 'bracket' | 'players';

const LINKS: { id: Tab; label: string }[] = [
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'groups', label: 'Groups' },
  { id: 'bracket', label: 'Knockout' },
  { id: 'players', label: 'Players' },
];

export function Nav({
  tab,
  onTab,
  onLock,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  onLock: () => void;
}) {
  return (
    <header className="nav">
      <div className="nav-inner container">
        <Wordmark />
        <nav className="nav-links" aria-label="Sweepstake sections">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`nav-link ${tab === l.id ? 'active' : ''}`}
              onClick={() => onTab(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="btn btn-outline-ink btn-sm" onClick={onLock}>
            Lock
          </button>
        </div>
      </div>
    </header>
  );
}
