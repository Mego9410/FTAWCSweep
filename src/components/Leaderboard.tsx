import { TeamChip, WoodenSpoonTag } from './common';
import { SectionHead } from './SectionHead';
import type { PlayerStanding, TournamentState } from '../engine/tournament';

function podiumTag(p: PlayerStanding): string | null {
  if (p.isChampionOwner) return '🥇';
  if (p.isRunnerUpOwner) return '🥈';
  if (p.isThirdOwner) return '🥉';
  return null;
}

export function Leaderboard({ state }: { state: TournamentState }) {
  return (
    <section>
      <SectionHead
        eyebrow="Standings"
        title="Leaderboard"
        subtitle="Ranked by best-placed team, then teams still alive. The trophy decides the winner."
      />

      <div className="lb">
        {state.players.map((p, i) => {
          const tag = podiumTag(p);
          return (
            <div key={p.player.name} className={`lb-row ${p.isChampionOwner ? 'is-champ' : ''}`}>
              <div className="lb-rank">{i + 1}</div>
              <div>
                <div className="lb-name">
                  {p.player.name}
                  {tag && <span className="podium-tag">{tag}</span>}
                  {p.isWoodenSpoonOwner && <WoodenSpoonTag />}
                </div>
                <div className="lb-teams">
                  {p.teams.map((t) => (
                    <TeamChip key={t.teamId} progress={t} />
                  ))}
                </div>
              </div>
              <div className="lb-meta">
                <span className={`st st-${p.teams[0].state}`}>Best: {p.bestLabel}</span>
                <span className="lb-alive">
                  <b>{p.aliveCount}</b> {p.aliveCount === 1 ? 'team' : 'teams'} still in
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
