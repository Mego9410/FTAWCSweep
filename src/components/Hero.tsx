import { getTeam } from '../data/teams';
import { ownerOf } from '../data/players';
import { Flag } from './common';
import type { TournamentState } from '../engine/tournament';

export function Hero({ state }: { state: TournamentState }) {
  const { champion, playedCount, totalCount, allGroupsComplete } = state;

  return (
    <section className="hero container">
      <div className="hero-frame">
        <div className="hero-bg" aria-hidden />
        <div className="hero-scrim" aria-hidden />
        <div className="hero-content">
          <div className="eyebrow">FIFA World Cup 2026 · Canada · Mexico · USA</div>
          <h1 className="hero-title">The Office Sweepstake</h1>
          <p className="hero-sub">
            48 teams, 18 players, one trophy. Whoever owns the team that lifts the
            World Cup on 19 July takes the pot.
          </p>
        </div>

        <div className="hero-panel search-panel">
          <div className="hero-panel-label">Tournament progress</div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="n">{playedCount}/{totalCount}</div>
              <div className="l">Matches played</div>
            </div>
            <div className="hero-stat">
              <div className="n">{state.players.length}</div>
              <div className="l">Players</div>
            </div>
            <div className="hero-stat">
              <div className="n">{allGroupsComplete ? 'Knockouts' : 'Groups'}</div>
              <div className="l">Current phase</div>
            </div>
          </div>
          {champion && <ChampionBanner championId={champion} />}
        </div>
      </div>
    </section>
  );
}

function ChampionBanner({ championId }: { championId: string }) {
  const team = getTeam(championId);
  const owner = ownerOf(championId);
  return (
    <div className="champ-banner">
      <span className="trophy" aria-hidden>🏆</span>
      <div>
        <div className="ct">World Champions</div>
        <div className="cn">
          <Flag iso={team.iso} />
          {team.name}
        </div>
      </div>
      <div className="owner">
        <div className="ol">Winning player</div>
        <div className="on">{owner ?? '—'}</div>
      </div>
    </div>
  );
}
