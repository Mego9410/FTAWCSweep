// ============================================================
//  FIFA World Cup 2026 — Teams & Groups (hard-coded)
//  Source: official FIFA 2026 match schedule.
// ============================================================

export type GroupLetter =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export interface Team {
  id: string;        // short code, used everywhere as the key
  name: string;      // display name
  iso: string;       // flag-icons code (ISO 3166-1 alpha-2, or gb-eng/gb-sct)
  group: GroupLetter;
}

export const TEAMS: Team[] = [
  // Group A
  { id: 'MEX', name: 'Mexico',                 iso: 'mx', group: 'A' },
  { id: 'RSA', name: 'South Africa',           iso: 'za', group: 'A' },
  { id: 'KOR', name: 'Korea Republic',         iso: 'kr', group: 'A' },
  { id: 'CZE', name: 'Czechia',                iso: 'cz', group: 'A' },
  // Group B
  { id: 'CAN', name: 'Canada',                 iso: 'ca', group: 'B' },
  { id: 'BIH', name: 'Bosnia and Herzegovina', iso: 'ba', group: 'B' },
  { id: 'QAT', name: 'Qatar',                  iso: 'qa', group: 'B' },
  { id: 'SUI', name: 'Switzerland',            iso: 'ch', group: 'B' },
  // Group C
  { id: 'HAI', name: 'Haiti',                  iso: 'ht', group: 'C' },
  { id: 'SCO', name: 'Scotland',               iso: 'gb-sct', group: 'C' },
  { id: 'BRA', name: 'Brazil',                 iso: 'br', group: 'C' },
  { id: 'MAR', name: 'Morocco',                iso: 'ma', group: 'C' },
  // Group D
  { id: 'USA', name: 'USA',                    iso: 'us', group: 'D' },
  { id: 'PAR', name: 'Paraguay',               iso: 'py', group: 'D' },
  { id: 'AUS', name: 'Australia',              iso: 'au', group: 'D' },
  { id: 'TUR', name: 'Türkiye',                iso: 'tr', group: 'D' },
  // Group E
  { id: 'CIV', name: "Côte d'Ivoire",          iso: 'ci', group: 'E' },
  { id: 'ECU', name: 'Ecuador',                iso: 'ec', group: 'E' },
  { id: 'GER', name: 'Germany',                iso: 'de', group: 'E' },
  { id: 'CUW', name: 'Curaçao',                iso: 'cw', group: 'E' },
  // Group F
  { id: 'NED', name: 'Netherlands',            iso: 'nl', group: 'F' },
  { id: 'JPN', name: 'Japan',                  iso: 'jp', group: 'F' },
  { id: 'SWE', name: 'Sweden',                 iso: 'se', group: 'F' },
  { id: 'TUN', name: 'Tunisia',                iso: 'tn', group: 'F' },
  // Group G
  { id: 'IRN', name: 'IR Iran',                iso: 'ir', group: 'G' },
  { id: 'NZL', name: 'New Zealand',            iso: 'nz', group: 'G' },
  { id: 'BEL', name: 'Belgium',                iso: 'be', group: 'G' },
  { id: 'EGY', name: 'Egypt',                  iso: 'eg', group: 'G' },
  // Group H
  { id: 'KSA', name: 'Saudi Arabia',           iso: 'sa', group: 'H' },
  { id: 'URU', name: 'Uruguay',                iso: 'uy', group: 'H' },
  { id: 'ESP', name: 'Spain',                  iso: 'es', group: 'H' },
  { id: 'CPV', name: 'Cabo Verde',             iso: 'cv', group: 'H' },
  // Group I
  { id: 'FRA', name: 'France',                 iso: 'fr', group: 'I' },
  { id: 'SEN', name: 'Senegal',                iso: 'sn', group: 'I' },
  { id: 'IRQ', name: 'Iraq',                   iso: 'iq', group: 'I' },
  { id: 'NOR', name: 'Norway',                 iso: 'no', group: 'I' },
  // Group J
  { id: 'ARG', name: 'Argentina',              iso: 'ar', group: 'J' },
  { id: 'ALG', name: 'Algeria',                iso: 'dz', group: 'J' },
  { id: 'AUT', name: 'Austria',                iso: 'at', group: 'J' },
  { id: 'JOR', name: 'Jordan',                 iso: 'jo', group: 'J' },
  // Group K
  { id: 'POR', name: 'Portugal',               iso: 'pt', group: 'K' },
  { id: 'COD', name: 'Congo DR',               iso: 'cd', group: 'K' },
  { id: 'UZB', name: 'Uzbekistan',             iso: 'uz', group: 'K' },
  { id: 'COL', name: 'Colombia',               iso: 'co', group: 'K' },
  // Group L
  { id: 'GHA', name: 'Ghana',                  iso: 'gh', group: 'L' },
  { id: 'PAN', name: 'Panama',                 iso: 'pa', group: 'L' },
  { id: 'ENG', name: 'England',                iso: 'gb-eng', group: 'L' },
  { id: 'CRO', name: 'Croatia',                iso: 'hr', group: 'L' },
];

export const GROUP_LETTERS: GroupLetter[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];

const TEAM_MAP: Record<string, Team> = Object.fromEntries(TEAMS.map((t) => [t.id, t]));

export function getTeam(id: string): Team {
  const t = TEAM_MAP[id];
  if (!t) throw new Error(`Unknown team id: ${id}`);
  return t;
}

export function teamsInGroup(group: GroupLetter): Team[] {
  return TEAMS.filter((t) => t.group === group);
}
