// ============================================================
//  >>>  THIS IS THE ONLY FILE YOU NEED TO EDIT  <<<
//  FIFA World Cup 2026 — Match results
//
//  HOW TO ENTER A RESULT:
//   • Find the match number below (the comment shows who plays who).
//   • Replace `null` with the score, e.g.   2: { home: 3, away: 1 },
//     means the HOME team won 3–1.
//   • Leave a match as `null` until it has been played.
//
//  KNOCKOUT MATCHES (no. 73+):
//   • Enter the score the same way.
//   • If a knockout match is DRAWN after normal/extra time and decided
//     on PENALTIES, add who won the shoot-out:
//        90: { home: 1, away: 1, pens: 'home' },
//     (`pens` is ignored for the group stage.)
//
//  After saving this file the website recalculates everything
//  automatically: group tables, who qualifies, the full bracket,
//  and which player owns the champion / runner-up / third place.
// ============================================================

export interface MatchResult {
  home: number;            // home team goals
  away: number;            // away team goals
  pens?: 'home' | 'away';  // knockout only: shoot-out winner if drawn
}

export const RESULTS: Record<number, MatchResult | null> = {
  // ---------------- GROUP STAGE ----------------
  // -- Matchday 1 --
  1:  { home: 2, away: 0 }, // A · Mexico v South Africa
  2:  { home: 2, away: 1 }, // A · Korea Republic v Czechia
  3:  { home: 1, away: 1 }, // B · Canada v Bosnia and Herzegovina
  4:  { home: 4, away: 1 }, // D · USA v Paraguay
  5:  { home: 0, away: 1 }, // C · Haiti v Scotland
  6:  { home: 2, away: 0 }, // D · Australia v Türkiye
  7:  { home: 1, away: 1 }, // C · Brazil v Morocco
  8:  { home: 1, away: 1 }, // B · Qatar v Switzerland
  9:  { home: 1, away: 0 }, // E · Côte d'Ivoire v Ecuador
  10: { home: 7, away: 1 }, // E · Germany v Curaçao
  11: { home: 2, away: 2 }, // F · Netherlands v Japan
  12: { home: 5, away: 1 }, // F · Sweden v Tunisia
  13: { home: 1, away: 1 }, // H · Saudi Arabia v Uruguay
  14: { home: 0, away: 0 }, // H · Spain v Cabo Verde
  15: { home: 2, away: 2 }, // G · IR Iran v New Zealand
  16: { home: 1, away: 1 }, // G · Belgium v Egypt
  17: { home: 3, away: 1 }, // I · France v Senegal
  18: { home: 1, away: 4 }, // I · Iraq v Norway
  19: { home: 3, away: 0 }, // J · Argentina v Algeria
  20: { home: 3, away: 1 }, // J · Austria v Jordan
  21: { home: 1, away: 0 }, // L · Ghana v Panama
  22: { home: 4, away: 2 }, // L · England v Croatia
  23: { home: 1, away: 1 }, // K · Portugal v Congo DR
  24: { home: 1, away: 3 }, // K · Uzbekistan v Colombia

  // -- Matchday 2 --
  25: { home: 1, away: 1 }, // A · Czechia v South Africa
  26: { home: 4, away: 1 }, // B · Switzerland v Bosnia and Herzegovina
  27: { home: 6, away: 0 }, // B · Canada v Qatar
  28: { home: 1, away: 0 }, // A · Mexico v Korea Republic
  29: { home: 3, away: 0 }, // C · Brazil v Haiti
  30: { home: 0, away: 1 }, // C · Scotland v Morocco
  31: { home: 0, away: 1 }, // D · Türkiye v Paraguay
  32: { home: 2, away: 0 }, // D · USA v Australia
  33: { home: 2, away: 1 }, // E · Germany v Côte d'Ivoire
  34: { home: 0, away: 0 }, // E · Ecuador v Curaçao
  35: { home: 5, away: 1 }, // F · Netherlands v Sweden
  36: { home: 0, away: 4 }, // F · Tunisia v Japan
  37: { home: 2, away: 2 }, // H · Uruguay v Cabo Verde
  38: { home: 4, away: 0 }, // H · Spain v Saudi Arabia
  39: { home: 0, away: 0 }, // G · Belgium v IR Iran
  40: { home: 1, away: 3 }, // G · New Zealand v Egypt
  41: { home: 3, away: 2 }, // I · Norway v Senegal
  42: { home: 3, away: 0 }, // I · France v Iraq
  43: { home: 2, away: 0 }, // J · Argentina v Austria
  44: { home: 1, away: 2 }, // J · Jordan v Algeria
  45: { home: 0, away: 0 }, // L · England v Ghana
  46: { home: 0, away: 1 }, // L · Panama v Croatia
  47: { home: 5, away: 0 }, // K · Portugal v Uzbekistan
  48: { home: 1, away: 0 }, // K · Colombia v Congo DR

  // -- Matchday 3 --
  49: { home: 0, away: 3 }, // C · Scotland v Brazil
  50: { home: 4, away: 2 }, // C · Morocco v Haiti
  51: { home: 2, away: 1 }, // B · Switzerland v Canada
  52: { home: 3, away: 1 }, // B · Bosnia and Herzegovina v Qatar
  53: { home: 0, away: 3 }, // A · Czechia v Mexico
  54: { home: 1, away: 0 }, // A · South Africa v Korea Republic
  55: { home: 0, away: 2 }, // E · Curaçao v Côte d'Ivoire
  56: { home: 2, away: 1 }, // E · Ecuador v Germany
  57: { home: 1, away: 1 }, // F · Japan v Sweden
  58: { home: 1, away: 3 }, // F · Tunisia v Netherlands
  59: { home: 3, away: 2 }, // D · Türkiye v USA
  60: { home: 0, away: 0 }, // D · Paraguay v Australia
  61: { home: 1, away: 4 }, // I · Norway v France
  62: { home: 5, away: 0 }, // I · Senegal v Iraq
  63: { home: 1, away: 1 }, // G · Egypt v IR Iran
  64: { home: 1, away: 5 }, // G · New Zealand v Belgium
  65: { home: 0, away: 0 }, // H · Cabo Verde v Saudi Arabia
  66: { home: 0, away: 1 }, // H · Uruguay v Spain
  67: { home: 0, away: 2 }, // L · Panama v England
  68: { home: 2, away: 1 }, // L · Croatia v Ghana
  69: { home: 3, away: 3 }, // J · Algeria v Austria
  70: { home: 1, away: 3 }, // J · Jordan v Argentina
  71: { home: 0, away: 0 }, // K · Colombia v Portugal
  72: { home: 3, away: 1 }, // K · Congo DR v Uzbekistan

  // ---------------- ROUND OF 32 ----------------
  73: { home: 0, away: 1 }, // Runner-up A v Runner-up B (South Africa v Canada)
  74: { home: 1, away: 1, pens: 'away' }, // Winner E v best third (Germany v Paraguay)
  75: { home: 1, away: 1, pens: 'away' }, // Winner F v Runner-up C (Netherlands v Morocco)
  76: { home: 2, away: 1 }, // Winner C v Runner-up F (Brazil v Japan)
  77: { home: 3, away: 0 }, // Winner I v best third (France v Sweden)
  78: { home: 1, away: 2 }, // Runner-up E v Runner-up I (Côte d'Ivoire v Norway)
  79: { home: 2, away: 0 }, // Winner A v best third (Mexico v Ecuador)
  80: { home: 2, away: 1 }, // Winner L v best third (England v Congo DR)
  81: { home: 2, away: 0 }, // Winner D v best third (USA v Bosnia and Herzegovina)
  82: { home: 3, away: 2 }, // Winner G v best third (Belgium v Senegal, a.e.t.)
  83: { home: 2, away: 1 }, // Runner-up K v Runner-up L (Portugal v Croatia)
  84: { home: 3, away: 0 }, // Winner H v Runner-up J (Spain v Austria)
  85: { home: 2, away: 0 }, // Winner B v best third (Switzerland v Algeria)
  86: { home: 3, away: 2 }, // Winner J v Runner-up H (Argentina v Cabo Verde, a.e.t.)
  87: { home: 1, away: 0 }, // Winner K v best third (Colombia v Ghana)
  88: { home: 1, away: 1, pens: 'away' }, // Runner-up D v Runner-up G (Australia v Egypt, 2–4 pens)

  // ---------------- ROUND OF 16 ----------------
  89: null, // Winner M74 v Winner M77
  90: null, // Winner M73 v Winner M75
  91: null, // Winner M76 v Winner M78
  92: null, // Winner M79 v Winner M80
  93: null, // Winner M83 v Winner M84
  94: null, // Winner M81 v Winner M82
  95: null, // Winner M86 v Winner M88
  96: null, // Winner M85 v Winner M87

  // ---------------- QUARTER-FINALS ----------------
  97:  null, // Winner M89 v Winner M90
  98:  null, // Winner M93 v Winner M94
  99:  null, // Winner M91 v Winner M92
  100: null, // Winner M95 v Winner M96

  // ---------------- SEMI-FINALS ----------------
  101: null, // Winner M97 v Winner M98
  102: null, // Winner M99 v Winner M100

  // ---------------- FINALS ----------------
  103: null, // Third-place play-off: Loser M101 v Loser M102
  104: null, // FINAL: Winner M101 v Winner M102
};
