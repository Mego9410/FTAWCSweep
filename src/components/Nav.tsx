import { Wordmark } from './common';

export type Tab = 'leaderboard' | 'groups' | 'bracket' | 'players' | 'matches';

export const NAV_LINKS: { id: Tab; label: string }[] = [
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'matches', label: 'Matches' },
  { id: 'groups', label: 'Groups' },
  { id: 'bracket', label: 'Knockout' },
  { id: 'players', label: 'Players' },
];

function TabNav({
  tab,
  onTab,
  className,
  label,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  className: string;
  label: string;
}) {
  return (
    <nav className={className} aria-label={label}>
      {NAV_LINKS.map((l) => (
        <button
          key={l.id}
          type="button"
          className={`nav-link ${tab === l.id ? 'active' : ''}`}
          onClick={() => onTab(l.id)}
          aria-current={tab === l.id ? 'page' : undefined}
        >
          {l.label}
        </button>
      ))}
    </nav>
  );
}

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
    <header className="nav-header">
      <div className="nav">
        <div className="nav-inner container">
          <Wordmark />
          <TabNav
            tab={tab}
            onTab={onTab}
            className="nav-links"
            label="Sweepstake sections"
          />
          <div className="nav-actions">
            <button type="button" className="btn btn-outline-ink btn-sm" onClick={onLock}>
              Lock
            </button>
          </div>
        </div>
      </div>
      <TabNav
        tab={tab}
        onTab={onTab}
        className="nav-tabs-mobile container"
        label="Sweepstake sections (mobile)"
      />
    </header>
  );
}
