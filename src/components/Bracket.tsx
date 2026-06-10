import { TeamName } from './common';
import { SectionHead } from './SectionHead';
import type { ResolvedMatch, TournamentState } from '../engine/tournament';
import type { Stage } from '../data/fixtures';

export function Bracket({ state }: { state: TournamentState }) {
  const byStage = (stage: Stage) =>
    state.matches.filter((m) => m.stage === stage).sort((a, b) => a.no - b.no);

  return (
    <section>
      <SectionHead
        eyebrow="Knockout stage"
        title="Knockout bracket"
        subtitle="Pairings fill in automatically as group tables finalise, via the official Annex C draw."
      />

      {!state.allGroupsComplete && (
        <p className="bracket-note">
          The Round of 32 unlocks once every group has played all its matches. Until then the
          ties below show as “to be decided”.
        </p>
      )}

      <div className="rounds">
        <Round title="Round of 32" matches={byStage('R32')} />
        <Round title="Round of 16" matches={byStage('R16')} />
        <Round title="Quarter-finals" matches={byStage('QF')} />
        <Round title="Semi-finals" matches={byStage('SF')} />
        <div className="round center">
          <h4>Final</h4>
          {byStage('final').map((m) => (
            <Tie key={m.no} match={m} isFinal />
          ))}
          <h4 style={{ marginTop: 24 }}>Third place</h4>
          {byStage('bronze').map((m) => (
            <Tie key={m.no} match={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Round({ title, matches }: { title: string; matches: ResolvedMatch[] }) {
  return (
    <div className="round">
      <h4>{title}</h4>
      {matches.map((m) => (
        <Tie key={m.no} match={m} />
      ))}
    </div>
  );
}

function Tie({ match, isFinal }: { match: ResolvedMatch; isFinal?: boolean }) {
  const { result } = match;
  const homeWin = match.decided && match.winnerId === match.homeId;
  const awayWin = match.decided && match.winnerId === match.awayId;

  return (
    <div className={`tie ${match.decided ? 'done' : ''} ${isFinal ? 'final-tie' : ''}`}>
      <div className="no">Match {match.no}</div>
      <div className={`tie-row ${homeWin ? 'win' : ''}`}>
        <TeamName teamId={match.homeId} size="sm" out={match.decided && awayWin} />
        <span className="score">{result ? result.home : ''}</span>
      </div>
      <div className={`tie-row ${awayWin ? 'win' : ''}`}>
        <TeamName teamId={match.awayId} size="sm" out={match.decided && homeWin} />
        <span className="score">{result ? result.away : ''}</span>
      </div>
      {result?.pens && (
        <div className="pens">
          {result.pens === 'home' ? 'Home' : 'Away'} win on penalties
        </div>
      )}
    </div>
  );
}
