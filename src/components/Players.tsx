import { getTeam } from '../data/teams';
import { Flag, StatusBadge } from './common';
import { SectionHead } from './SectionHead';
import type { PlayerStanding, TournamentState } from '../engine/tournament';

export function Players({ state }: { state: TournamentState }) {
  return (
    <section>
      <SectionHead
        eyebrow="The draw"
        title="Players"
        subtitle="Everyone's drawn teams and how they're faring."
      />

      <div className="players-grid">
        {state.players.map((p) => (
          <PlayerCard key={p.player.name} standing={p} />
        ))}
      </div>
    </section>
  );
}

function PlayerCard({ standing }: { standing: PlayerStanding }) {
  const win = standing.isChampionOwner;
  return (
    <div className={`player-card ${win ? 'win' : ''}`}>
      <div className="ph">
        <span className="pn">{standing.player.name}</span>
        {win && <span style={{ fontSize: 22 }}>🏆</span>}
        {!win && standing.isRunnerUpOwner && <span style={{ fontSize: 20 }}>🥈</span>}
        {!win && standing.isThirdOwner && <span style={{ fontSize: 20 }}>🥉</span>}
      </div>
      <div>
        {standing.teams.map((t) => {
          const team = getTeam(t.teamId);
          const isOut = t.state.startsWith('out');
          return (
            <div className="teamline" key={t.teamId}>
              <span className={`team ${isOut ? 'out' : ''}`}>
                <Flag iso={team.iso} />
                {team.name}
              </span>
              <StatusBadge progress={t} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
