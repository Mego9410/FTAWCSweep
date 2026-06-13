// ============================================================
//  Tournament engine
//  Pure functions that turn raw match results into:
//   • group tables   • best-third ranking + qualification
//   • the resolved knockout bracket   • per-team outcomes
//   • the sweepstake leaderboard
//  No state is stored here — everything is derived from RESULTS.
// ============================================================

import {
  FIXTURES,
  getFixture,
  STAGE_LABEL,
  type Fixture,
  type Slot,
  type Stage,
} from '../data/fixtures';
import { TEAMS, GROUP_LETTERS, getTeam, type GroupLetter } from '../data/teams';
import { thirdPlaceAssignment } from '../data/annexC';
import { RESULTS, type MatchResult } from '../data/results';
import { PLAYERS, type Player } from '../data/players';

// ---------- Standings ----------
export interface StandingRow {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  rank: number; // 1-based position in the group
}

// ---------- Resolved match ----------
export interface ResolvedMatch {
  no: number;
  fixture: Fixture;
  stage: Stage;
  homeId: string | null;
  awayId: string | null;
  result: MatchResult | null;
  played: boolean;
  decided: boolean; // knockout: has a clear winner
  winnerId: string | null;
  loserId: string | null;
}

// ---------- Team outcome ----------
export type TeamState =
  | 'champion'
  | 'runner-up'
  | 'third'
  | 'fourth'
  | 'semifinalist' // lost SF, bronze not yet played
  | 'alive'        // still in it
  | 'group'        // group stage not finished yet
  | 'out-group'    // failed to qualify from the group
  | 'out-R32'
  | 'out-R16'
  | 'out-QF';

export interface TeamProgress {
  teamId: string;
  state: TeamState;
  alive: boolean;
  qualified: boolean | null; // null while group stage incomplete
  label: string;             // human readable status
  weight: number;            // for sorting (higher = better finish)
}

export interface PlayerStanding {
  player: Player;
  teams: TeamProgress[];
  aliveCount: number;
  bestWeight: number;
  bestLabel: string;
  totalPoints: number;
  totalGD: number;
  isChampionOwner: boolean;
  isRunnerUpOwner: boolean;
  isThirdOwner: boolean;
  isWoodenSpoonOwner: boolean;
}

export interface TournamentState {
  groupTables: Record<GroupLetter, StandingRow[]>;
  groupComplete: Record<GroupLetter, boolean>;
  allGroupsComplete: boolean;
  thirdRanking: StandingRow[] | null;        // 12 third-placed teams, ranked
  qualifiedThirdGroups: GroupLetter[] | null; // the 8 groups that advanced
  thirdAssignment: Record<GroupLetter, GroupLetter> | null;
  matches: ResolvedMatch[];
  matchMap: Record<number, ResolvedMatch>;
  progress: Record<string, TeamProgress>;
  champion: string | null;
  runnerUp: string | null;
  third: string | null;
  fourth: string | null;
  players: PlayerStanding[];
  playedCount: number;
  totalCount: number;
  /** Team with most group-stage goals conceded (GD tiebreaker). Null before any group match. */
  woodenSpoonTeamId: string | null;
}

const STATE_WEIGHT: Record<TeamState, number> = {
  champion: 100,
  'runner-up': 90,
  third: 80,
  fourth: 70,
  semifinalist: 60,
  alive: 30,
  group: 25,
  'out-QF': 50,
  'out-R16': 40,
  'out-R32': 35,
  'out-group': 0,
};

// ---------------------------------------------------------------
//  Group standings
// ---------------------------------------------------------------
function blankRow(teamId: string): StandingRow {
  return { teamId, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, rank: 0 };
}

function groupMatches(group: GroupLetter): Fixture[] {
  return FIXTURES.filter((f) => f.stage === 'group' && f.group === group);
}

/** Compute a table over the given fixtures, only counting played results. */
function tableFor(teamIds: string[], fixtures: Fixture[]): Map<string, StandingRow> {
  const rows = new Map<string, StandingRow>();
  teamIds.forEach((id) => rows.set(id, blankRow(id)));

  for (const f of fixtures) {
    const res = RESULTS[f.no];
    if (!res) continue;
    if (f.home.kind !== 'team' || f.away.kind !== 'team') continue;
    const home = rows.get(f.home.teamId);
    const away = rows.get(f.away.teamId);
    if (!home || !away) continue;

    home.played++; away.played++;
    home.gf += res.home; home.ga += res.away;
    away.gf += res.away; away.ga += res.home;
    if (res.home > res.away) { home.won++; home.points += 3; away.lost++; }
    else if (res.home < res.away) { away.won++; away.points += 3; home.lost++; }
    else { home.drawn++; away.drawn++; home.points++; away.points++; }
  }
  rows.forEach((r) => { r.gd = r.gf - r.ga; });
  return rows;
}

/** Primary comparison: points, goal difference, goals for. */
function cmpOverall(a: StandingRow, b: StandingRow): number {
  if (b.points !== a.points) return b.points - a.points;
  if (b.gd !== a.gd) return b.gd - a.gd;
  if (b.gf !== a.gf) return b.gf - a.gf;
  return 0;
}

function teamName(id: string): string {
  return getTeam(id).name;
}

/** Worst group-stage defence: most conceded, then lower goal difference. */
function cmpWoodenSpoon(a: StandingRow, b: StandingRow): number {
  if (b.ga !== a.ga) return b.ga - a.ga;
  if (a.gd !== b.gd) return a.gd - b.gd;
  return teamName(a.teamId).localeCompare(teamName(b.teamId));
}

function woodenSpoonTeamIdFromTables(
  groupTables: Record<GroupLetter, StandingRow[]>,
): string | null {
  const rows = GROUP_LETTERS.flatMap((g) => groupTables[g]);
  if (!rows.some((r) => r.played > 0)) return null;
  return [...rows].sort(cmpWoodenSpoon)[0].teamId;
}

/** Sort a group, applying head-to-head between teams tied on (pts, gd, gf). */
function sortGroup(rows: StandingRow[], fixtures: Fixture[]): StandingRow[] {
  const sorted = [...rows].sort((a, b) => {
    const c = cmpOverall(a, b);
    if (c !== 0) return c;
    return teamName(a.teamId).localeCompare(teamName(b.teamId));
  });

  // Break ties (equal pts/gd/gf) using a mini-table among the tied teams.
  const out: StandingRow[] = [];
  let i = 0;
  while (i < sorted.length) {
    let j = i + 1;
    while (
      j < sorted.length &&
      cmpOverall(sorted[i], sorted[j]) === 0
    ) j++;

    const tied = sorted.slice(i, j);
    if (tied.length > 1) {
      const tiedIds = new Set(tied.map((r) => r.teamId));
      const h2hFixtures = fixtures.filter((f) => {
        if (f.home.kind !== 'team' || f.away.kind !== 'team') return false;
        return tiedIds.has(f.home.teamId) && tiedIds.has(f.away.teamId);
      });
      const mini = tableFor([...tiedIds], h2hFixtures);
      tied.sort((a, b) => {
        const ma = mini.get(a.teamId)!;
        const mb = mini.get(b.teamId)!;
        const c = cmpOverall(ma, mb);
        if (c !== 0) return c;
        return teamName(a.teamId).localeCompare(teamName(b.teamId));
      });
    }
    out.push(...tied);
    i = j;
  }

  out.forEach((r, idx) => { r.rank = idx + 1; });
  return out;
}

// ---------------------------------------------------------------
//  Slot resolution
// ---------------------------------------------------------------
function resolveSlot(
  slot: Slot,
  ctx: {
    groupTables: Record<GroupLetter, StandingRow[]>;
    groupComplete: Record<GroupLetter, boolean>;
    allGroupsComplete: boolean;
    thirdAssignment: Record<GroupLetter, GroupLetter> | null;
    matchMap: Record<number, ResolvedMatch>;
  },
): string | null {
  switch (slot.kind) {
    case 'team':
      return slot.teamId;
    case 'groupRank': {
      if (!ctx.groupComplete[slot.group]) return null;
      const row = ctx.groupTables[slot.group][slot.rank - 1];
      return row ? row.teamId : null;
    }
    case 'third': {
      if (!ctx.allGroupsComplete || !ctx.thirdAssignment) return null;
      const fromGroup = ctx.thirdAssignment[slot.winnerSlot];
      if (!fromGroup) return null;
      const row = ctx.groupTables[fromGroup][2]; // 3rd placed
      return row ? row.teamId : null;
    }
    case 'winner': {
      const m = ctx.matchMap[slot.match];
      return m && m.decided ? m.winnerId : null;
    }
    case 'loser': {
      const m = ctx.matchMap[slot.match];
      return m && m.decided ? m.loserId : null;
    }
  }
}

// ---------------------------------------------------------------
//  Main
// ---------------------------------------------------------------
export function computeTournament(): TournamentState {
  // --- Group tables ---
  const groupTables = {} as Record<GroupLetter, StandingRow[]>;
  const groupComplete = {} as Record<GroupLetter, boolean>;

  for (const g of GROUP_LETTERS) {
    const fixtures = groupMatches(g);
    const ids = TEAMS.filter((t) => t.group === g).map((t) => t.id);
    const rows = [...tableFor(ids, fixtures).values()];
    groupTables[g] = sortGroup(rows, fixtures);
    groupComplete[g] = fixtures.every((f) => RESULTS[f.no] != null);
  }
  const allGroupsComplete = GROUP_LETTERS.every((g) => groupComplete[g]);
  const woodenSpoonTeamId = woodenSpoonTeamIdFromTables(groupTables);

  // --- Best third-placed teams ---
  let thirdRanking: StandingRow[] | null = null;
  let qualifiedThirdGroups: GroupLetter[] | null = null;
  let thirdAssignment: Record<GroupLetter, GroupLetter> | null = null;

  if (allGroupsComplete) {
    const thirds = GROUP_LETTERS.map((g) => groupTables[g][2]);
    thirdRanking = [...thirds].sort((a, b) => {
      const c = cmpOverall(a, b);
      if (c !== 0) return c;
      return teamName(a.teamId).localeCompare(teamName(b.teamId));
    });
    const top8 = thirdRanking.slice(0, 8);
    qualifiedThirdGroups = top8
      .map((r) => getTeam(r.teamId).group)
      .sort();
    thirdAssignment = thirdPlaceAssignment(qualifiedThirdGroups);
  }

  // --- Resolve matches in order (deps are always lower-numbered) ---
  const matchMap: Record<number, ResolvedMatch> = {};
  const ctx = { groupTables, groupComplete, allGroupsComplete, thirdAssignment, matchMap };
  const matches: ResolvedMatch[] = [];

  const ordered = [...FIXTURES].sort((a, b) => a.no - b.no);
  for (const f of ordered) {
    const homeId = resolveSlot(f.home, ctx);
    const awayId = resolveSlot(f.away, ctx);
    const result = RESULTS[f.no] ?? null;
    const played = result != null;

    let decided = false;
    let winnerId: string | null = null;
    let loserId: string | null = null;

    if (played && result && homeId && awayId) {
      if (result.home > result.away) { winnerId = homeId; loserId = awayId; decided = true; }
      else if (result.home < result.away) { winnerId = awayId; loserId = homeId; decided = true; }
      else if (f.stage !== 'group') {
        if (result.pens === 'home') { winnerId = homeId; loserId = awayId; decided = true; }
        else if (result.pens === 'away') { winnerId = awayId; loserId = homeId; decided = true; }
      }
    }

    const rm: ResolvedMatch = {
      no: f.no, fixture: f, stage: f.stage,
      homeId, awayId, result, played, decided, winnerId, loserId,
    };
    matchMap[f.no] = rm;
    matches.push(rm);
  }

  // --- Final placings ---
  const finalM = matchMap[104];
  const bronzeM = matchMap[103];
  const champion = finalM?.decided ? finalM.winnerId : null;
  const runnerUp = finalM?.decided ? finalM.loserId : null;
  const third = bronzeM?.decided ? bronzeM.winnerId : null;
  const fourth = bronzeM?.decided ? bronzeM.loserId : null;

  // --- Per-team progress ---
  const progress: Record<string, TeamProgress> = {};
  const qualifiedTeamIds = new Set<string>();
  if (allGroupsComplete) {
    for (const g of GROUP_LETTERS) {
      qualifiedTeamIds.add(groupTables[g][0].teamId);
      qualifiedTeamIds.add(groupTables[g][1].teamId);
    }
    (thirdRanking ?? []).slice(0, 8).forEach((r) => qualifiedTeamIds.add(r.teamId));
  }

  for (const team of TEAMS) {
    const id = team.id;
    let state: TeamState;
    let qualified: boolean | null = null;

    if (id === champion) state = 'champion';
    else if (id === runnerUp) state = 'runner-up';
    else if (id === third) state = 'third';
    else if (id === fourth) state = 'fourth';
    else {
      // Find a knockout match this team lost.
      const knockoutLosses = matches.filter(
        (m) => m.decided && m.loserId === id && m.stage !== 'group',
      );
      // Did it lose a semi-final (and bronze not yet decided)?
      const lostSF = knockoutLosses.some((m) => m.stage === 'SF');
      const elimMatch = knockoutLosses.find(
        (m) => m.stage === 'R32' || m.stage === 'R16' || m.stage === 'QF',
      );

      if (elimMatch) {
        state = elimMatch.stage === 'R32' ? 'out-R32'
          : elimMatch.stage === 'R16' ? 'out-R16'
          : 'out-QF';
        qualified = true;
      } else if (lostSF) {
        state = 'semifinalist';
        qualified = true;
      } else if (!allGroupsComplete) {
        state = 'group';
      } else if (qualifiedTeamIds.has(id)) {
        state = 'alive';
        qualified = true;
      } else {
        state = 'out-group';
        qualified = false;
      }
    }

    const alive = state === 'champion' || state === 'third'
      || state === 'semifinalist' || state === 'alive' || state === 'group';

    progress[id] = {
      teamId: id,
      state,
      alive,
      qualified,
      label: labelFor(state),
      weight: STATE_WEIGHT[state],
    };
  }

  // --- Player leaderboard ---
  // Build a flat lookup: teamId -> StandingRow (from whichever group they're in)
  const teamStandingRow: Record<string, StandingRow> = {};
  for (const g of GROUP_LETTERS) {
    for (const row of groupTables[g]) {
      teamStandingRow[row.teamId] = row;
    }
  }

  const players: PlayerStanding[] = PLAYERS.map((p) => {
    const teams = p.teams.map((id) => progress[id]);
    const best = teams.reduce((acc, t) => (t.weight > acc.weight ? t : acc), teams[0]);
    const totalPoints = p.teams.reduce((sum, id) => sum + (teamStandingRow[id]?.points ?? 0), 0);
    const totalGD = p.teams.reduce((sum, id) => sum + (teamStandingRow[id]?.gd ?? 0), 0);
    return {
      player: p,
      teams: [...teams].sort((a, b) => b.weight - a.weight),
      aliveCount: teams.filter((t) => t.alive).length,
      bestWeight: best.weight,
      bestLabel: best.label,
      totalPoints,
      totalGD,
      isChampionOwner: !!champion && p.teams.includes(champion),
      isRunnerUpOwner: !!runnerUp && p.teams.includes(runnerUp),
      isThirdOwner: !!third && p.teams.includes(third),
      isWoodenSpoonOwner: !!woodenSpoonTeamId && p.teams.includes(woodenSpoonTeamId),
    };
  }).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalGD !== a.totalGD) return b.totalGD - a.totalGD;
    if (b.aliveCount !== a.aliveCount) return b.aliveCount - a.aliveCount;
    return a.player.name.localeCompare(b.player.name);
  });

  const playedCount = matches.filter((m) => m.played).length;

  return {
    groupTables,
    groupComplete,
    allGroupsComplete,
    thirdRanking,
    qualifiedThirdGroups,
    thirdAssignment,
    matches,
    matchMap,
    progress,
    champion,
    runnerUp,
    third,
    fourth,
    players,
    playedCount,
    totalCount: FIXTURES.length,
    woodenSpoonTeamId,
  };
}

function labelFor(state: TeamState): string {
  switch (state) {
    case 'champion': return 'Champion';
    case 'runner-up': return 'Runner-up';
    case 'third': return 'Third place';
    case 'fourth': return 'Fourth place';
    case 'semifinalist': return 'Semi-finalist';
    case 'alive': return 'Still in';
    case 'group': return 'Group stage';
    case 'out-group': return 'Out · Group stage';
    case 'out-R32': return 'Out · Round of 32';
    case 'out-R16': return 'Out · Round of 16';
    case 'out-QF': return 'Out · Quarter-final';
  }
}

export { STAGE_LABEL, getFixture };
