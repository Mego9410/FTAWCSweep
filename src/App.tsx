import { useMemo, useState } from 'react';
import { Gate } from './components/Gate';
import { Hero } from './components/Hero';
import { Leaderboard } from './components/Leaderboard';
import { Groups } from './components/Groups';
import { Bracket } from './components/Bracket';
import { Players } from './components/Players';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { computeTournament } from './engine/tournament';

const UNLOCK_KEY = 'fta-wc-unlocked';
type Tab = 'leaderboard' | 'groups' | 'bracket' | 'players';

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
    <>
      <Nav tab={tab} onTab={setTab} onLock={lock} />
      <Hero state={state} />

      <main>
        <div className={`band ${tab === 'leaderboard' ? '' : 'band-hidden'}`}>
          <div className="container section">
            <Leaderboard state={state} />
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

      <Footer />
    </>
  );
}
