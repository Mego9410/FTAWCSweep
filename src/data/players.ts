// ============================================================
//  Sweepstake players & their teams (tier-balanced draw)
//
//  All 48 teams were ranked into three tiers (top / mid / lower)
//  based on expected World Cup strength, then shuffled within
//  each tier and distributed fairly:
//
//    • 12 players with 3 teams → one top, one mid, one lower each
//    •  6 players with 2 teams → mixed pairs (top+mid, mid+lower,
//      or top+lower) so no one gets two from the same tier
//
//  Each player wins if THEY own the team that wins the World Cup.
// ============================================================

export interface Player {
  name: string;
  teams: string[]; // team ids (see data/teams.ts)
}

export const PLAYERS: Player[] = [
  { name: 'Andy',     teams: ['GER', 'GHA', 'JOR'] },
  { name: 'Chris',    teams: ['USA', 'CAN', 'IRQ'] },
  { name: 'Chloe',    teams: ['ARG', 'AUS', 'NZL'] },
  { name: 'Emma',     teams: ['NED', 'ECU', 'TUN'] },
  { name: 'Georgia',  teams: ['ENG', 'IRN', 'HAI'] },
  { name: 'Electra',  teams: ['MAR', 'SCO', 'QAT'] },
  { name: 'Henry',    teams: ['JPN', 'EGY', 'CPV'] },
  { name: 'Lis',      teams: ['BRA', 'CZE', 'KSA'] },
  { name: 'Kristi',   teams: ['COL', 'SEN', 'BIH'] },
  { name: 'Oliver',   teams: ['URU', 'SWE', 'PAN'] },
  { name: 'Michelle', teams: ['ESP', 'ALG', 'CUW'] },
  { name: 'Zach',     teams: ['BEL', 'SUI', 'UZB'] },
  { name: 'Drew',     teams: ['FRA', 'AUT'] },
  { name: 'Maxine',   teams: ['POR', 'KOR'] },
  { name: 'Helen',    teams: ['TUR', 'CIV'] },
  { name: 'David',    teams: ['NOR', 'PAR'] },
  { name: 'James',    teams: ['MEX', 'COD'] },
  { name: 'Sarah',    teams: ['CRO', 'RSA'] },
];

// teamId -> player name (for quick "who owns this team?" lookups)
export const TEAM_OWNER: Record<string, string> = Object.fromEntries(
  PLAYERS.flatMap((p) => p.teams.map((teamId) => [teamId, p.name])),
);

export function ownerOf(teamId: string): string | undefined {
  return TEAM_OWNER[teamId];
}
