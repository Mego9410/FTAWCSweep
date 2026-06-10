import { ownerOf } from '../data/players';
import { STAGE_LABEL } from '../data/fixtures';
import { getTeam } from '../data/teams';
import type { ResolvedMatch, StandingRow, TeamProgress, TournamentState } from './tournament';

export interface TeamMatchStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
}

export interface TeamProfile {
  teamId: string;
  owner: string | undefined;
  progress: TeamProgress;
  groupStanding: StandingRow | undefined;
  stats: TeamMatchStats;
  played: ResolvedMatch[];
  upcoming: ResolvedMatch[];
}

function matchInvolvesTeam(m: ResolvedMatch, teamId: string): boolean {
  return m.homeId === teamId || m.awayId === teamId;
}

export function computeTeamStats(matches: ResolvedMatch[], teamId: string): TeamMatchStats {
  const stats: TeamMatchStats = {
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
  };

  for (const m of matches) {
    if (!m.played || !m.result || !m.homeId || !m.awayId) continue;
    if (!matchInvolvesTeam(m, teamId)) continue;

    const isHome = m.homeId === teamId;
    const gf = isHome ? m.result.home : m.result.away;
    const ga = isHome ? m.result.away : m.result.home;

    stats.played += 1;
    stats.gf += gf;
    stats.ga += ga;

    if (m.decided) {
      if (m.winnerId === teamId) stats.won += 1;
      else stats.lost += 1;
    } else {
      stats.drawn += 1;
    }
  }

  stats.gd = stats.gf - stats.ga;
  return stats;
}

export function getTeamProfile(state: TournamentState, teamId: string): TeamProfile {
  const team = getTeam(teamId);
  const relevant = state.matches.filter((m) => matchInvolvesTeam(m, teamId));
  const played = relevant.filter((m) => m.played);
  const upcoming = relevant.filter((m) => !m.played);

  return {
    teamId,
    owner: ownerOf(teamId),
    progress: state.progress[teamId],
    groupStanding: state.groupTables[team.group].find((r) => r.teamId === teamId),
    stats: computeTeamStats(played, teamId),
    played,
    upcoming,
  };
}

export function stageLabel(m: ResolvedMatch): string {
  if (m.stage === 'group' && m.fixture.group) return `Group ${m.fixture.group}`;
  return STAGE_LABEL[m.stage];
}

export function opponentId(m: ResolvedMatch, teamId: string): string | null {
  if (m.homeId === teamId) return m.awayId;
  if (m.awayId === teamId) return m.homeId;
  return null;
}
