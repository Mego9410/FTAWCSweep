import { useEffect, useState } from 'react';
import { Wordmark } from './common';
import { WcEmblem } from './WcBrand';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }

    function onResize() {
      if (window.matchMedia('(min-width: 981px)').matches) setMenuOpen(false);
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  function selectTab(next: Tab) {
    onTab(next);
    setMenuOpen(false);
  }

  function lock() {
    onLock();
    setMenuOpen(false);
  }

  return (
    <header className="nav-header">
      <div className="nav-wc-stripe" aria-hidden />
      <div className="nav">
        <div className="nav-inner container">
          <div className="nav-brand">
            <Wordmark />
            <WcEmblem className="nav-wc-emblem" />
          </div>
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
          <button
            type="button"
            className={`nav-menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-menu-bars" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            <span className="nav-menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        id="nav-mobile-menu"
        className={`nav-mobile-menu ${menuOpen ? 'is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="nav-mobile-links container" aria-label="Sweepstake sections">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`nav-link ${tab === l.id ? 'active' : ''}`}
              onClick={() => selectTab(l.id)}
              aria-current={tab === l.id ? 'page' : undefined}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-mobile-footer container">
          <button type="button" className="btn btn-outline-ink nav-mobile-lock" onClick={lock}>
            Lock
          </button>
        </div>
      </div>
    </header>
  );
}
