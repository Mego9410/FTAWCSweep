// ============================================================
//  FIFA World Cup 2026 — Full fixture STRUCTURE (104 matches)
//  Source: official FIFA 2026 match schedule + competition regulations.
//
//  This file defines WHO plays WHO (structurally). You do NOT edit
//  this file to enter results — edit `results.ts` instead.
// ============================================================

import type { GroupLetter } from './teams';

export type Stage =
  | 'group'
  | 'R32'
  | 'R16'
  | 'QF'
  | 'SF'
  | 'bronze'
  | 'final';

export const STAGE_LABEL: Record<Stage, string> = {
  group: 'Group Stage',
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarter-final',
  SF: 'Semi-final',
  bronze: 'Third-place Play-off',
  final: 'Final',
};

// Order of knockout rounds, used to compute "furthest round reached".
export const ROUND_ORDER: Stage[] = ['group', 'R32', 'R16', 'QF', 'SF', 'final'];

/** A "slot" describes how a match participant is determined. */
export type Slot =
  | { kind: 'team'; teamId: string }                       // group stage — fixed team
  | { kind: 'groupRank'; group: GroupLetter; rank: 1 | 2 } // 1A = winner A, 2B = runner-up B
  | { kind: 'third'; winnerSlot: GroupLetter }             // best-third assigned via Annex C
  | { kind: 'winner'; match: number }                      // winner of an earlier match
  | { kind: 'loser'; match: number };                      // loser of an earlier match (bronze final)

export interface Fixture {
  no: number;
  stage: Stage;
  group?: GroupLetter;
  date: string;   // human readable
  venue: string;
  home: Slot;
  away: Slot;
}

const t = (teamId: string): Slot => ({ kind: 'team', teamId });
const w1 = (group: GroupLetter): Slot => ({ kind: 'groupRank', group, rank: 1 });
const r2 = (group: GroupLetter): Slot => ({ kind: 'groupRank', group, rank: 2 });
const third = (winnerSlot: GroupLetter): Slot => ({ kind: 'third', winnerSlot });
const win = (match: number): Slot => ({ kind: 'winner', match });
const lose = (match: number): Slot => ({ kind: 'loser', match });

// ---- GROUP STAGE (matches 1–72) ----
const groupFixtures: Fixture[] = [
  // Matchday 1
  { no: 1,  stage: 'group', group: 'A', date: 'Thu 11 Jun', venue: 'Mexico City Stadium',            home: t('MEX'), away: t('RSA') },
  { no: 2,  stage: 'group', group: 'A', date: 'Thu 11 Jun', venue: 'Estadio Guadalajara',            home: t('KOR'), away: t('CZE') },
  { no: 3,  stage: 'group', group: 'B', date: 'Fri 12 Jun', venue: 'Toronto Stadium',                home: t('CAN'), away: t('BIH') },
  { no: 4,  stage: 'group', group: 'D', date: 'Fri 12 Jun', venue: 'Los Angeles Stadium',            home: t('USA'), away: t('PAR') },
  { no: 5,  stage: 'group', group: 'C', date: 'Sat 13 Jun', venue: 'Boston Stadium',                 home: t('HAI'), away: t('SCO') },
  { no: 6,  stage: 'group', group: 'D', date: 'Sat 13 Jun', venue: 'BC Place Vancouver',             home: t('AUS'), away: t('TUR') },
  { no: 7,  stage: 'group', group: 'C', date: 'Sat 13 Jun', venue: 'New York New Jersey Stadium',    home: t('BRA'), away: t('MAR') },
  { no: 8,  stage: 'group', group: 'B', date: 'Sat 13 Jun', venue: 'San Francisco Bay Area Stadium', home: t('QAT'), away: t('SUI') },
  { no: 9,  stage: 'group', group: 'E', date: 'Sun 14 Jun', venue: 'Philadelphia Stadium',           home: t('CIV'), away: t('ECU') },
  { no: 10, stage: 'group', group: 'E', date: 'Sun 14 Jun', venue: 'Houston Stadium',                home: t('GER'), away: t('CUW') },
  { no: 11, stage: 'group', group: 'F', date: 'Sun 14 Jun', venue: 'Dallas Stadium',                 home: t('NED'), away: t('JPN') },
  { no: 12, stage: 'group', group: 'F', date: 'Sun 14 Jun', venue: 'Estadio Monterrey',              home: t('SWE'), away: t('TUN') },
  { no: 13, stage: 'group', group: 'H', date: 'Mon 15 Jun', venue: 'Miami Stadium',                  home: t('KSA'), away: t('URU') },
  { no: 14, stage: 'group', group: 'H', date: 'Mon 15 Jun', venue: 'Atlanta Stadium',                home: t('ESP'), away: t('CPV') },
  { no: 15, stage: 'group', group: 'G', date: 'Mon 15 Jun', venue: 'Los Angeles Stadium',            home: t('IRN'), away: t('NZL') },
  { no: 16, stage: 'group', group: 'G', date: 'Mon 15 Jun', venue: 'Seattle Stadium',                home: t('BEL'), away: t('EGY') },
  { no: 17, stage: 'group', group: 'I', date: 'Tue 16 Jun', venue: 'New York New Jersey Stadium',    home: t('FRA'), away: t('SEN') },
  { no: 18, stage: 'group', group: 'I', date: 'Tue 16 Jun', venue: 'Boston Stadium',                 home: t('IRQ'), away: t('NOR') },
  { no: 19, stage: 'group', group: 'J', date: 'Tue 16 Jun', venue: 'Kansas City Stadium',            home: t('ARG'), away: t('ALG') },
  { no: 20, stage: 'group', group: 'J', date: 'Tue 16 Jun', venue: 'San Francisco Bay Area Stadium', home: t('AUT'), away: t('JOR') },
  { no: 21, stage: 'group', group: 'L', date: 'Wed 17 Jun', venue: 'Toronto Stadium',                home: t('GHA'), away: t('PAN') },
  { no: 22, stage: 'group', group: 'L', date: 'Wed 17 Jun', venue: 'Dallas Stadium',                 home: t('ENG'), away: t('CRO') },
  { no: 23, stage: 'group', group: 'K', date: 'Wed 17 Jun', venue: 'Houston Stadium',                home: t('POR'), away: t('COD') },
  { no: 24, stage: 'group', group: 'K', date: 'Wed 17 Jun', venue: 'Mexico City Stadium',            home: t('UZB'), away: t('COL') },

  // Matchday 2
  { no: 25, stage: 'group', group: 'A', date: 'Thu 18 Jun', venue: 'Atlanta Stadium',                home: t('CZE'), away: t('RSA') },
  { no: 26, stage: 'group', group: 'B', date: 'Thu 18 Jun', venue: 'Los Angeles Stadium',            home: t('SUI'), away: t('BIH') },
  { no: 27, stage: 'group', group: 'B', date: 'Thu 18 Jun', venue: 'BC Place Vancouver',             home: t('CAN'), away: t('QAT') },
  { no: 28, stage: 'group', group: 'A', date: 'Thu 18 Jun', venue: 'Estadio Guadalajara',            home: t('MEX'), away: t('KOR') },
  { no: 29, stage: 'group', group: 'C', date: 'Fri 19 Jun', venue: 'Philadelphia Stadium',           home: t('BRA'), away: t('HAI') },
  { no: 30, stage: 'group', group: 'C', date: 'Fri 19 Jun', venue: 'Boston Stadium',                 home: t('SCO'), away: t('MAR') },
  { no: 31, stage: 'group', group: 'D', date: 'Fri 19 Jun', venue: 'San Francisco Bay Area Stadium', home: t('TUR'), away: t('PAR') },
  { no: 32, stage: 'group', group: 'D', date: 'Fri 19 Jun', venue: 'Seattle Stadium',                home: t('USA'), away: t('AUS') },
  { no: 33, stage: 'group', group: 'E', date: 'Sat 20 Jun', venue: 'Toronto Stadium',                home: t('GER'), away: t('CIV') },
  { no: 34, stage: 'group', group: 'E', date: 'Sat 20 Jun', venue: 'Kansas City Stadium',            home: t('ECU'), away: t('CUW') },
  { no: 35, stage: 'group', group: 'F', date: 'Sat 20 Jun', venue: 'Houston Stadium',                home: t('NED'), away: t('SWE') },
  { no: 36, stage: 'group', group: 'F', date: 'Sat 20 Jun', venue: 'Estadio Monterrey',              home: t('TUN'), away: t('JPN') },
  { no: 37, stage: 'group', group: 'H', date: 'Sun 21 Jun', venue: 'Miami Stadium',                  home: t('URU'), away: t('CPV') },
  { no: 38, stage: 'group', group: 'H', date: 'Sun 21 Jun', venue: 'Atlanta Stadium',                home: t('ESP'), away: t('KSA') },
  { no: 39, stage: 'group', group: 'G', date: 'Sun 21 Jun', venue: 'Los Angeles Stadium',            home: t('BEL'), away: t('IRN') },
  { no: 40, stage: 'group', group: 'G', date: 'Sun 21 Jun', venue: 'BC Place Vancouver',             home: t('NZL'), away: t('EGY') },
  { no: 41, stage: 'group', group: 'I', date: 'Mon 22 Jun', venue: 'New York New Jersey Stadium',    home: t('NOR'), away: t('SEN') },
  { no: 42, stage: 'group', group: 'I', date: 'Mon 22 Jun', venue: 'Philadelphia Stadium',           home: t('FRA'), away: t('IRQ') },
  { no: 43, stage: 'group', group: 'J', date: 'Mon 22 Jun', venue: 'Dallas Stadium',                 home: t('ARG'), away: t('AUT') },
  { no: 44, stage: 'group', group: 'J', date: 'Mon 22 Jun', venue: 'San Francisco Bay Area Stadium', home: t('JOR'), away: t('ALG') },
  { no: 45, stage: 'group', group: 'L', date: 'Tue 23 Jun', venue: 'Boston Stadium',                 home: t('ENG'), away: t('GHA') },
  { no: 46, stage: 'group', group: 'L', date: 'Tue 23 Jun', venue: 'Toronto Stadium',                home: t('PAN'), away: t('CRO') },
  { no: 47, stage: 'group', group: 'K', date: 'Tue 23 Jun', venue: 'Houston Stadium',                home: t('POR'), away: t('UZB') },
  { no: 48, stage: 'group', group: 'K', date: 'Tue 23 Jun', venue: 'Estadio Guadalajara',            home: t('COL'), away: t('COD') },

  // Matchday 3
  { no: 49, stage: 'group', group: 'C', date: 'Wed 24 Jun', venue: 'Miami Stadium',                  home: t('SCO'), away: t('BRA') },
  { no: 50, stage: 'group', group: 'C', date: 'Wed 24 Jun', venue: 'Atlanta Stadium',                home: t('MAR'), away: t('HAI') },
  { no: 51, stage: 'group', group: 'B', date: 'Wed 24 Jun', venue: 'BC Place Vancouver',             home: t('SUI'), away: t('CAN') },
  { no: 52, stage: 'group', group: 'B', date: 'Wed 24 Jun', venue: 'Seattle Stadium',                home: t('BIH'), away: t('QAT') },
  { no: 53, stage: 'group', group: 'A', date: 'Wed 24 Jun', venue: 'Mexico City Stadium',            home: t('CZE'), away: t('MEX') },
  { no: 54, stage: 'group', group: 'A', date: 'Wed 24 Jun', venue: 'Estadio Monterrey',              home: t('RSA'), away: t('KOR') },
  { no: 55, stage: 'group', group: 'E', date: 'Thu 25 Jun', venue: 'Philadelphia Stadium',           home: t('CUW'), away: t('CIV') },
  { no: 56, stage: 'group', group: 'E', date: 'Thu 25 Jun', venue: 'New York New Jersey Stadium',    home: t('ECU'), away: t('GER') },
  { no: 57, stage: 'group', group: 'F', date: 'Thu 25 Jun', venue: 'Dallas Stadium',                 home: t('JPN'), away: t('SWE') },
  { no: 58, stage: 'group', group: 'F', date: 'Thu 25 Jun', venue: 'Kansas City Stadium',            home: t('TUN'), away: t('NED') },
  { no: 59, stage: 'group', group: 'D', date: 'Thu 25 Jun', venue: 'Los Angeles Stadium',            home: t('TUR'), away: t('USA') },
  { no: 60, stage: 'group', group: 'D', date: 'Thu 25 Jun', venue: 'San Francisco Bay Area Stadium', home: t('PAR'), away: t('AUS') },
  { no: 61, stage: 'group', group: 'I', date: 'Fri 26 Jun', venue: 'Boston Stadium',                 home: t('NOR'), away: t('FRA') },
  { no: 62, stage: 'group', group: 'I', date: 'Fri 26 Jun', venue: 'Toronto Stadium',                home: t('SEN'), away: t('IRQ') },
  { no: 63, stage: 'group', group: 'G', date: 'Fri 26 Jun', venue: 'Seattle Stadium',                home: t('EGY'), away: t('IRN') },
  { no: 64, stage: 'group', group: 'G', date: 'Fri 26 Jun', venue: 'BC Place Vancouver',             home: t('NZL'), away: t('BEL') },
  { no: 65, stage: 'group', group: 'H', date: 'Fri 26 Jun', venue: 'Houston Stadium',                home: t('CPV'), away: t('KSA') },
  { no: 66, stage: 'group', group: 'H', date: 'Fri 26 Jun', venue: 'Estadio Guadalajara',            home: t('URU'), away: t('ESP') },
  { no: 67, stage: 'group', group: 'L', date: 'Sat 27 Jun', venue: 'New York New Jersey Stadium',    home: t('PAN'), away: t('ENG') },
  { no: 68, stage: 'group', group: 'L', date: 'Sat 27 Jun', venue: 'Philadelphia Stadium',           home: t('CRO'), away: t('GHA') },
  { no: 69, stage: 'group', group: 'J', date: 'Sat 27 Jun', venue: 'Kansas City Stadium',            home: t('ALG'), away: t('AUT') },
  { no: 70, stage: 'group', group: 'J', date: 'Sat 27 Jun', venue: 'Dallas Stadium',                 home: t('JOR'), away: t('ARG') },
  { no: 71, stage: 'group', group: 'K', date: 'Sat 27 Jun', venue: 'Miami Stadium',                  home: t('COL'), away: t('POR') },
  { no: 72, stage: 'group', group: 'K', date: 'Sat 27 Jun', venue: 'Atlanta Stadium',                home: t('COD'), away: t('UZB') },
];

// ---- ROUND OF 32 (matches 73–88) ----
const r32: Fixture[] = [
  { no: 73, stage: 'R32', date: 'Sun 28 Jun', venue: 'Los Angeles Stadium',            home: r2('A'),     away: r2('B') },
  { no: 74, stage: 'R32', date: 'Mon 29 Jun', venue: 'Boston Stadium',                 home: w1('E'),     away: third('E') },
  { no: 75, stage: 'R32', date: 'Mon 29 Jun', venue: 'Estadio Monterrey',              home: w1('F'),     away: r2('C') },
  { no: 76, stage: 'R32', date: 'Mon 29 Jun', venue: 'Houston Stadium',                home: w1('C'),     away: r2('F') },
  { no: 77, stage: 'R32', date: 'Tue 30 Jun', venue: 'New York New Jersey Stadium',    home: w1('I'),     away: third('I') },
  { no: 78, stage: 'R32', date: 'Tue 30 Jun', venue: 'Dallas Stadium',                 home: r2('E'),     away: r2('I') },
  { no: 79, stage: 'R32', date: 'Tue 30 Jun', venue: 'Mexico City Stadium',            home: w1('A'),     away: third('A') },
  { no: 80, stage: 'R32', date: 'Wed 1 Jul',  venue: 'Atlanta Stadium',                home: w1('L'),     away: third('L') },
  { no: 81, stage: 'R32', date: 'Wed 1 Jul',  venue: 'San Francisco Bay Area Stadium', home: w1('D'),     away: third('D') },
  { no: 82, stage: 'R32', date: 'Wed 1 Jul',  venue: 'Seattle Stadium',                home: w1('G'),     away: third('G') },
  { no: 83, stage: 'R32', date: 'Thu 2 Jul',  venue: 'Toronto Stadium',                home: r2('K'),     away: r2('L') },
  { no: 84, stage: 'R32', date: 'Thu 2 Jul',  venue: 'Los Angeles Stadium',            home: w1('H'),     away: r2('J') },
  { no: 85, stage: 'R32', date: 'Thu 2 Jul',  venue: 'BC Place Vancouver',             home: w1('B'),     away: third('B') },
  { no: 86, stage: 'R32', date: 'Fri 3 Jul',  venue: 'Miami Stadium',                  home: w1('J'),     away: r2('H') },
  { no: 87, stage: 'R32', date: 'Fri 3 Jul',  venue: 'Kansas City Stadium',            home: w1('K'),     away: third('K') },
  { no: 88, stage: 'R32', date: 'Fri 3 Jul',  venue: 'Dallas Stadium',                 home: r2('D'),     away: r2('G') },
];

// ---- ROUND OF 16 (89–96) ----
const r16: Fixture[] = [
  { no: 89, stage: 'R16', date: 'Sat 4 Jul', venue: 'Philadelphia Stadium',        home: win(74), away: win(77) },
  { no: 90, stage: 'R16', date: 'Sat 4 Jul', venue: 'Houston Stadium',             home: win(73), away: win(75) },
  { no: 91, stage: 'R16', date: 'Sun 5 Jul', venue: 'New York New Jersey Stadium', home: win(76), away: win(78) },
  { no: 92, stage: 'R16', date: 'Sun 5 Jul', venue: 'Mexico City Stadium',         home: win(79), away: win(80) },
  { no: 93, stage: 'R16', date: 'Mon 6 Jul', venue: 'Dallas Stadium',              home: win(83), away: win(84) },
  { no: 94, stage: 'R16', date: 'Mon 6 Jul', venue: 'Seattle Stadium',             home: win(81), away: win(82) },
  { no: 95, stage: 'R16', date: 'Tue 7 Jul', venue: 'Atlanta Stadium',             home: win(86), away: win(88) },
  { no: 96, stage: 'R16', date: 'Tue 7 Jul', venue: 'BC Place Vancouver',          home: win(85), away: win(87) },
];

// ---- QUARTER-FINALS (97–100) ----
const qf: Fixture[] = [
  { no: 97,  stage: 'QF', date: 'Thu 9 Jul',  venue: 'Boston Stadium',       home: win(89), away: win(90) },
  { no: 98,  stage: 'QF', date: 'Fri 10 Jul', venue: 'Los Angeles Stadium',  home: win(93), away: win(94) },
  { no: 99,  stage: 'QF', date: 'Sat 11 Jul', venue: 'Miami Stadium',        home: win(91), away: win(92) },
  { no: 100, stage: 'QF', date: 'Sat 11 Jul', venue: 'Kansas City Stadium',  home: win(95), away: win(96) },
];

// ---- SEMI-FINALS (101–102) ----
const sf: Fixture[] = [
  { no: 101, stage: 'SF', date: 'Tue 14 Jul', venue: 'Dallas Stadium',  home: win(97), away: win(98) },
  { no: 102, stage: 'SF', date: 'Wed 15 Jul', venue: 'Atlanta Stadium', home: win(99), away: win(100) },
];

// ---- BRONZE FINAL (103) & FINAL (104) ----
const finals: Fixture[] = [
  { no: 103, stage: 'bronze', date: 'Sat 18 Jul', venue: 'Miami Stadium',               home: lose(101), away: lose(102) },
  { no: 104, stage: 'final',  date: 'Sun 19 Jul', venue: 'New York New Jersey Stadium', home: win(101),  away: win(102) },
];

export const FIXTURES: Fixture[] = [
  ...groupFixtures,
  ...r32,
  ...r16,
  ...qf,
  ...sf,
  ...finals,
];

const FIXTURE_MAP: Record<number, Fixture> = Object.fromEntries(FIXTURES.map((f) => [f.no, f]));

export function getFixture(no: number): Fixture {
  const f = FIXTURE_MAP[no];
  if (!f) throw new Error(`Unknown fixture no: ${no}`);
  return f;
}

/**
 * The 8 Round-of-32 ties where a group winner faces a best-third team.
 * Order matches Annex C column header: 1A 1B 1D 1E 1G 1I 1K 1L
 */
export const THIRD_PLACE_WINNER_SLOTS: GroupLetter[] = ['A', 'B', 'D', 'E', 'G', 'I', 'K', 'L'];
