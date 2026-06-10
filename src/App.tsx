import { useEffect, useMemo, useState } from 'react';
import { Gate } from './components/Gate';
import { Hero } from './components/Hero';
import { Leaderboard } from './components/Leaderboard';
import { Groups } from './components/Groups';
import { Bracket } from './components/Bracket';
import { Players } from './components/Players';
import { Matches } from './components/Matches';
import { TeamPage } from './components/TeamPage';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { TeamNavProvider } from './context/TeamNav';
import { WoodenSpoonProvider } from './context/WoodenSpoon';
import { useTeamRoute } from './hooks/useTeamRoute';
import { computeTournament } from './engine/tournament';

const UNLOCK_KEY = 'fta-wc-unlocked';
type Tab = 'leaderboard' | 'groups' | 'bracket' | 'players' | 'matches';

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(UNLOCK_KEY) === '1',
  );
  const [tab, setTab] = useState<Tab>('leaderboard');

  const state = useMemo(() => computeTournament(), []);

  function lock() {
    sessionStorage.removeItem(UNLOCK_KEY);
    setUnlocked(false);
  }

  if (!unlocked) {
    return (
      <Gate
        onUnlock={() => {
          sessionStorage.setItem(UNLOCK_KEY, '1');
          setUnlocked(true);
        }}
      />
    );
  }

  return (
    <AppShell tab={tab} onTab={setTab} onLock={lock} state={state} />
  );
}

function AppShell({
  tab,
  onTab,
  onLock,
  state,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  onLock: () => void;
  state: ReturnType<typeof computeTournament>;
}) {
  const { teamId, openTeam, closeTeam } = useTeamRoute();

  function selectTab(next: Tab) {
    closeTeam();
    onTab(next);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, teamId]);

  return (
    <WoodenSpoonProvider teamId={state.woodenSpoonTeamId}>
      <TeamNavProvider openTeam={openTeam}>
      <Nav tab={tab} onTab={selectTab} onLock={onLock} />
      {teamId ? (
        <main className="band">
          <TeamPage teamId={teamId} state={state} onBack={closeTeam} />
        </main>
      ) : (
        <>
          {tab === 'leaderboard' && <Hero state={state} />}
          <main>
            <div className={`band ${tab === 'leaderboard' ? '' : 'band-hidden'}`}>
              <div className="container section">
                <Leaderboard state={state} />
              </div>
            </div>
            <div className={`band ${tab === 'matches' ? '' : 'band-hidden'}`}>
              <div className="container section">
                <Matches state={state} />
              </div>
            </div>
            <div className={`band ${tab === 'groups' ? '' : 'band-hidden'}`}>
              <div className="container section">
                <Groups state={state} />
              </div>
            </div>
            <div className={`band ${tab === 'bracket' ? '' : 'band-hidden'}`}>
              <div className="container section">
                <Bracket state={state} />
              </div>
            </div>
            <div className={`band ${tab === 'players' ? '' : 'band-hidden'}`}>
              <div className="container section">
                <Players state={state} />
              </div>
            </div>
          </main>
        </>
      )}
      <Footer />
      </TeamNavProvider>
    </WoodenSpoonProvider>
  );
}
