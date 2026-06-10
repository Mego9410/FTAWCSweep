import { GROUP_LETTERS, getTeam } from '../data/teams';
import { TeamName } from './common';
import { SectionHead } from './SectionHead';
import type { StandingRow, TournamentState } from '../engine/tournament';

export function Groups({ state }: { state: TournamentState }) {
  const qualifiedThirds = new Set(
    (state.thirdRanking ?? []).slice(0, 8).map((r) => r.teamId),
  );

  return (
    <section>
      <SectionHead
        eyebrow="Group stage"
        title="Groups"
        subtitle="Top two of each group qualify, plus the eight best third-placed teams."
      />

      <div className="groups-grid">
        {GROUP_LETTERS.map((g) => (
          <GroupCard
            key={g}
            letter={g}
            rows={state.groupTables[g]}
            qualifiedThirds={qualifiedThirds}
            complete={state.groupComplete[g]}
          />
        ))}
      </div>

      <div className="qlegend">
        <span><i className="dot" style={{ background: 'var(--available-fg)' }} /> Qualifies (top 2)</span>
        <span><i className="dot" style={{ background: 'var(--gold)' }} /> Qualifies (best third)</span>
      </div>

      {state.thirdRanking && <ThirdPlaceTable rows={state.thirdRanking} qualified={qualifiedThirds} />}
    </section>
  );
}

function rowClass(row: StandingRow, qualifiedThirds: Set<string>): string {
  if (row.rank === 1) return 'q1';
  if (row.rank === 2) return 'q2';
  if (row.rank === 3 && qualifiedThirds.has(row.teamId)) return 'q3';
  return '';
}

function GroupCard({
  letter,
  rows,
  qualifiedThirds,
  complete,
}: {
  letter: string;
  rows: StandingRow[];
  qualifiedThirds: Set<string>;
  complete: boolean;
}) {
  return (
    <div className="group-card">
      <h3>
        <span className="lt">{letter}</span> Group {letter}
        {complete && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-3)', fontWeight: 600 }}>Final</span>}
      </h3>
      <div className="table-scroll">
      <table className="gt">
        <thead>
          <tr>
            <th className="tl">Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th className="pts">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            return (
              <tr key={r.teamId} className={rowClass(r, qualifiedThirds)}>
                <td className="tl">
                  <span className="team team-in-table">
                    <span className="posn">{r.rank}</span>
                    <TeamName teamId={r.teamId} size="sm" />
                  </span>
                </td>
                <td>{r.played}</td>
                <td>{r.won}</td>
                <td>{r.drawn}</td>
                <td>{r.lost}</td>
                <td>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                <td className="pts">{r.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function ThirdPlaceTable({ rows, qualified }: { rows: StandingRow[]; qualified: Set<string> }) {
  return (
    <div className="third-card">
      <h3>Third-placed teams — best eight qualify</h3>
      <div className="table-scroll">
      <table className="third-table">
        <thead>
          <tr>
            <th>#</th>
            <th className="tl">Team</th>
            <th>Group</th>
            <th>Pts</th>
            <th>GD</th>
            <th>GF</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const team = getTeam(r.teamId);
            return (
              <tr key={r.teamId} className={qualified.has(r.teamId) ? 'in' : ''}>
                <td>{i + 1}</td>
                <td className="tl"><TeamName teamId={r.teamId} size="sm" /></td>
                <td>{team.group}</td>
                <td>{r.points}</td>
                <td>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                <td>{r.gf}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
