import { StatusBadge, TeamName } from './common';
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
        {standing.teams.map((t) => (
          <div className="teamline" key={t.teamId}>
            <TeamName teamId={t.teamId} out={t.state.startsWith('out')} />
            <StatusBadge progress={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
