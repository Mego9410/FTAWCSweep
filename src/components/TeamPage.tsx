import { useMemo } from 'react';
import { getTeam } from '../data/teams';
import { ownerOf } from '../data/players';
import {
  getTeamProfile,
  opponentId,
  stageLabel,
} from '../engine/teamProfile';
import type { ResolvedMatch, TournamentState } from '../engine/tournament';
import { Flag, StatusBadge, TeamName } from './common';

export function TeamPage({
  teamId,
  state,
  onBack,
}: {
  teamId: string;
  state: TournamentState;
  onBack: () => void;
}) {
  const team = getTeam(teamId);
  const profile = useMemo(() => getTeamProfile(state, teamId), [state, teamId]);
  const { stats, played, upcoming, groupStanding, progress } = profile;

  return (
    <div className="container section team-page">
      <button type="button" className="btn btn-ghost team-back" onClick={onBack}>
        ← Back
      </button>

      <header className="team-hero">
        <div className="team-hero-main">
          <span className="team-hero-flag">
            <Flag iso={team.iso} />
          </span>
          <div>
            <p className="eyebrow">Group {team.group}</p>
            <h1 className="team-hero-name">{team.name}</h1>
            <StatusBadge progress={progress} />
          </div>
        </div>
        <div className="team-owner-card">
          <div className="team-owner-label">Sweepstake owner</div>
          <div className="team-owner-name">{ownerOf(teamId) ?? 'Unassigned'}</div>
        </div>
      </header>

      <div className="team-stats-grid">
        <Stat label="Played" value={stats.played} />
        <Stat label="Won" value={stats.won} />
        <Stat label="Drawn" value={stats.drawn} />
        <Stat label="Lost" value={stats.lost} />
        <Stat label="Goals for" value={stats.gf} />
        <Stat label="Goals against" value={stats.ga} />
        <Stat label="Goal diff" value={stats.gd > 0 ? `+${stats.gd}` : stats.gd} />
        {groupStanding && (
          <Stat label="Group pts" value={groupStanding.points} highlight />
        )}
      </div>

      <MatchSection
        title="Results"
        empty="No matches played yet."
        matches={played}
        teamId={teamId}
      />
      <MatchSection
        title="Fixtures to come"
        empty={
          progress.alive
            ? 'No upcoming fixtures scheduled yet — check back after the next round is drawn.'
            : 'Eliminated — no further fixtures.'
        }
        matches={upcoming}
        teamId={teamId}
      />
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`team-stat ${highlight ? 'highlight' : ''}`}>
      <div className="team-stat-n">{value}</div>
      <div className="team-stat-l">{label}</div>
    </div>
  );
}

function MatchSection({
  title,
  empty,
  matches,
  teamId,
}: {
  title: string;
  empty: string;
  matches: ResolvedMatch[];
  teamId: string;
}) {
  return (
    <section className="team-matches">
      <h2 className="team-section-title">{title}</h2>
      {matches.length === 0 ? (
        <p className="team-empty">{empty}</p>
      ) : (
        <div className="team-match-list">
          {matches.map((m) => (
            <TeamMatchRow key={m.no} match={m} teamId={teamId} />
          ))}
        </div>
      )}
    </section>
  );
}

function TeamMatchRow({ match: m, teamId }: { match: ResolvedMatch; teamId: string }) {
  const isHome = m.homeId === teamId;
  const won = m.decided && m.winnerId === teamId;
  const lost = m.decided && m.loserId === teamId;
  const oppId = opponentId(m, teamId);

  const gf = m.result ? (isHome ? m.result.home : m.result.away) : null;
  const ga = m.result ? (isHome ? m.result.away : m.result.home) : null;

  return (
    <article className={`team-match-row ${m.played ? 'played' : ''} ${won ? 'win' : ''} ${lost ? 'loss' : ''}`}>
      <div className="team-match-meta">
        <span className="badge badge-tip">M{m.no}</span>
        <span className="team-match-stage">{stageLabel(m)}</span>
        <span className="meta team-match-venue">{m.fixture.venue}</span>
        <span className="meta team-match-date">{m.fixture.date}</span>
      </div>
      <div className="team-match-body">
        <span className="team-match-side">{isHome ? 'Home' : 'Away'}</span>
        <div className="team-match-vs">
          {oppId ? (
            <TeamName teamId={oppId} size="sm" />
          ) : (
            <span className="team tbd">To be decided</span>
          )}
        </div>
        <div className="team-match-score">
          {m.played && gf != null && ga != null ? (
            <>
              <span className={won ? 'win' : ''}>{gf}</span>
              <span className="team-match-sep">–</span>
              <span className={lost ? 'loss-score' : ''}>{ga}</span>
            </>
          ) : (
            <span className="team-match-tbd">vs</span>
          )}
        </div>
      </div>
      {m.result?.pens && (
        <div className="team-match-pens meta">
          {m.result.pens === (isHome ? 'home' : 'away') ? 'Won' : 'Lost'} on penalties
        </div>
      )}
    </article>
  );
}
