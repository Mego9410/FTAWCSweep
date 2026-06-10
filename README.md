# Frank Taylor & Associates — World Cup 2026 Sweepstake

A self-contained website for the office World Cup 2026 sweepstake. All data is
hard-coded (no database, no server). Access is gated by a single password.

- **48 teams** across 12 groups, **all 104 fixtures**, and **18 players**.
- Teams were shared out by a **one-time random draw** (12 players hold 3 teams,
  6 hold 2). The draw is fixed in `src/data/players.ts`.
- **Winner = whoever owns the team that wins the World Cup.** Owners of the
  runner-up and third place are also highlighted.
- You enter scores; the site automatically computes group tables, qualification
  (including the eight best third-placed teams), the full knockout bracket using
  FIFA's official **Annex C** draw, and the final placings.

## Running it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into ./dist
npm run preview  # preview the production build
```

The password to enter the site is **`Fr@nk`**.

## Updating results (the only thing you edit)

Open **`src/data/results.ts`** and replace `null` with the score for each match.

```ts
2:  { home: 3, away: 1 },              // home team won 3–1
90: { home: 1, away: 1, pens: 'home' } // knockout drawn, home won on penalties
```

- Every match is listed by number with a comment showing who plays who.
- Leave matches as `null` until they are played.
- For knockout matches that finish level, add `pens: 'home'` or `pens: 'away'`.

Save the file and the website recalculates everything instantly.

## Project structure

| File | Purpose |
| --- | --- |
| `src/data/results.ts` | **Edit this** — the scores. |
| `src/data/players.ts` | Players and their drawn teams. |
| `src/data/teams.ts` | The 48 teams and groups. |
| `src/data/fixtures.ts` | The full 104-match structure. |
| `src/data/annexC.ts` | FIFA's 495 third-place combinations. |
| `src/engine/tournament.ts` | Turns scores into tables, bracket and standings. |
| `src/components/` | The UI (leaderboard, groups, bracket, players). |
| `src/styles/` | The Frank Taylor & Associates design system. |

## Notes

- Group and third-place tie-breaks use points, goal difference and goals scored
  (plus head-to-head within a group). The official final tie-breakers of fair-play
  record and FIFA ranking are not modelled; in the rare event of a dead tie the
  site falls back to alphabetical order — adjust a score if you need to force the
  real outcome.
