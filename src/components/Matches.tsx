import { useMemo, useState } from 'react';
import { STAGE_LABEL, type Slot } from '../data/fixtures';
import { TEAMS, getTeam } from '../data/teams';
import { PLAYERS, ownerOf } from '../data/players';
import { MatchKickoff, TeamName } from './common';
import { SectionHead } from './SectionHead';
import type { ResolvedMatch, TournamentState } from '../engine/tournament';

function teamIdsInMatch(m: ResolvedMatch): string[] {
  const ids = new Set<string>();
  if (m.homeId) ids.add(m.homeId);
  if (m.awayId) ids.add(m.awayId);
  if (m.fixture.home.kind === 'team') ids.add(m.fixture.home.teamId);
  if (m.fixture.away.kind === 'team') ids.add(m.fixture.away.teamId);
  return [...ids];
}

function describeSlot(slot: Slot): string {
  switch (slot.kind) {
    case 'team':
      return getTeam(slot.teamId).name;
    case 'groupRank':
      return `${slot.rank === 1 ? 'Winner' : 'Runner-up'} Group ${slot.group}`;
    case 'third':
      return `Best 3rd place (Group ${slot.winnerSlot} slot)`;
    case 'winner':
      return `Winner of Match ${slot.match}`;
    case 'loser':
      return `Loser of Match ${slot.match}`;
  }
}

function stageBadge(stage: ResolvedMatch['stage'], group?: string): string {
  if (stage === 'group' && group) return `Group ${group}`;
  return STAGE_LABEL[stage];
}

export function Matches({ state }: { state: TournamentState }) {
  const [playerFilter, setPlayerFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');

  const playerTeams = useMemo(() => {
    if (!playerFilter) return null;
    const p = PLAYERS.find((x) => x.name === playerFilter);
    return p ? new Set(p.teams) : null;
  }, [playerFilter]);

  const filtered = useMemo(() => {
    return state.matches.filter((m) => {
      const ids = teamIdsInMatch(m);
      if (teamFilter && !ids.includes(teamFilter)) return false;
      if (playerTeams && !ids.some((id) => playerTeams.has(id))) return false;
      return true;
    });
  }, [state.matches, teamFilter, playerTeams]);

  const byDate = useMemo(() => {
    const map = new Map<string, ResolvedMatch[]>();
    for (const m of filtered) {
      const key = m.fixture.date;
      const list = map.get(key) ?? [];
      list.push(m);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <section>
      <SectionHead
        eyebrow="Full schedule"
        title="All matches"
        subtitle="Every fixture in the tournament. Filter by player or team to see who's involved."
      />

      <div className="fixtures-filters search-panel">
        <div className="fixtures-filter">
          <label className="fixtures-label" htmlFor="filter-player">Player</label>
          <select
            id="filter-player"
            className="field fixtures-select"
            value={playerFilter}
            onChange={(e) => setPlayerFilter(e.target.value)}
          >
            <option value="">All players</option>
            {PLAYERS.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="fixtures-filter">
          <label className="fixtures-label" htmlFor="filter-team">Team</label>
          <select
            id="filter-team"
            className="field fixtures-select"
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          >
            <option value="">All teams</option>
            {[...TEAMS]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
          </select>
        </div>
        {(playerFilter || teamFilter) && (
          <button
            type="button"
            className="btn btn-ghost fixtures-clear"
            onClick={() => {
              setPlayerFilter('');
              setTeamFilter('');
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="fixtures-count meta">
        Showing <b>{filtered.length}</b> of {state.totalCount} matches
      </p>

      {filtered.length === 0 ? (
        <div className="fixtures-empty feature-card">
          <p>No matches match those filters. Try clearing one or both.</p>
        </div>
      ) : (
        <div className="fixtures-list">
          {byDate.map(([date, matches]) => (
            <div key={date} className="fixtures-day">
              <h3 className="fixtures-day-title">{date}</h3>
              <div className="fixtures-day-matches">
                {matches.map((m) => (
                  <FixtureRow key={m.no} match={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function FixtureRow({ match: m }: { match: ResolvedMatch }) {
  const homeWin = m.decided && m.winnerId === m.homeId;
  const awayWin = m.decided && m.winnerId === m.awayId;
  const homeOwner = m.homeId ? ownerOf(m.homeId) : undefined;
  const awayOwner = m.awayId ? ownerOf(m.awayId) : undefined;

  return (
    <article className={`fixture-row ${m.played ? 'played' : ''}`}>
      <div className="fixture-meta">
        <span className="badge badge-tip">M{m.no}</span>
        <span className="fixture-stage">{stageBadge(m.stage, m.fixture.group)}</span>
        <MatchKickoff matchNo={m.no} />
        <span className="fixture-venue meta">{m.fixture.venue}</span>
      </div>

      <div className="fixture-teams">
        <div className={`fixture-side ${homeWin ? 'win' : ''}`}>
          {m.homeId ? (
            <TeamName teamId={m.homeId} out={m.decided && awayWin} />
          ) : (
            <span className="team tbd">{describeSlot(m.fixture.home)}</span>
          )}
          {homeOwner && <span className="fixture-owner">{homeOwner}</span>}
          <span className="fixture-score">
            {m.result ? m.result.home : '–'}
          </span>
        </div>

        <span className="fixture-vs">vs</span>

        <div className={`fixture-side away ${awayWin ? 'win' : ''}`}>
          {m.awayId ? (
            <TeamName teamId={m.awayId} out={m.decided && homeWin} />
          ) : (
            <span className="team tbd">{describeSlot(m.fixture.away)}</span>
          )}
          {awayOwner && <span className="fixture-owner">{awayOwner}</span>}
          <span className="fixture-score">
            {m.result ? m.result.away : '–'}
          </span>
        </div>
      </div>

      {m.result?.pens && (
        <div className="fixture-pens meta">
          {m.result.pens === 'home' ? 'Home' : 'Away'} win on penalties
        </div>
      )}
    </article>
  );
}
