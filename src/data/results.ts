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
  37: null, // H · Uruguay v Cabo Verde
  38: { home: 4, away: 0 }, // H · Spain v Saudi Arabia
  39: null, // G · Belgium v IR Iran
  40: null, // G · New Zealand v Egypt
  41: null, // I · Norway v Senegal
  42: null, // I · France v Iraq
  43: null, // J · Argentina v Austria
  44: null, // J · Jordan v Algeria
  45: null, // L · England v Ghana
  46: null, // L · Panama v Croatia
  47: null, // K · Portugal v Uzbekistan
  48: null, // K · Colombia v Congo DR

  // -- Matchday 3 --
  49: null, // C · Scotland v Brazil
  50: null, // C · Morocco v Haiti
  51: null, // B · Switzerland v Canada
  52: null, // B · Bosnia and Herzegovina v Qatar
  53: null, // A · Czechia v Mexico
  54: null, // A · South Africa v Korea Republic
  55: null, // E · Curaçao v Côte d'Ivoire
  56: null, // E · Ecuador v Germany
  57: null, // F · Japan v Sweden
  58: null, // F · Tunisia v Netherlands
  59: null, // D · Türkiye v USA
  60: null, // D · Paraguay v Australia
  61: null, // I · Norway v France
  62: null, // I · Senegal v Iraq
  63: null, // G · Egypt v IR Iran
  64: null, // G · New Zealand v Belgium
  65: null, // H · Cabo Verde v Saudi Arabia
  66: null, // H · Uruguay v Spain
  67: null, // L · Panama v England
  68: null, // L · Croatia v Ghana
  69: null, // J · Algeria v Austria
  70: null, // J · Jordan v Argentina
  71: null, // K · Colombia v Portugal
  72: null, // K · Congo DR v Uzbekistan

  // ---------------- ROUND OF 32 ----------------
  73: null, // Runner-up A v Runner-up B
  74: null, // Winner E v best third (A/B/C/D/F)
  75: null, // Winner F v Runner-up C
  76: null, // Winner C v Runner-up F
  77: null, // Winner I v best third (C/D/F/G/H)
  78: null, // Runner-up E v Runner-up I
  79: null, // Winner A v best third (C/E/F/H/I)
  80: null, // Winner L v best third (E/H/I/J/K)
  81: null, // Winner D v best third (B/E/F/I/J)
  82: null, // Winner G v best third (A/E/H/I/J)
  83: null, // Runner-up K v Runner-up L
  84: null, // Winner H v Runner-up J
  85: null, // Winner B v best third (E/F/G/I/J)
  86: null, // Winner J v Runner-up H
  87: null, // Winner K v best third (D/E/I/J/L)
  88: null, // Runner-up D v Runner-up G

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
