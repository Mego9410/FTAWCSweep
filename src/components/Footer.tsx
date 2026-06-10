import { Wordmark } from './common';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Wordmark variant="footer" />
          <p>
            Frank Taylor &amp; Associates · World Cup 2026 Sweepstake. 48 teams, 18 players,
            one trophy — whoever owns the champions takes the pot.
          </p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-head">Tournament</div>
            <span className="footer-link">11 June – 19 July 2026</span>
            <span className="footer-link">Canada · Mexico · USA</span>
            <span className="footer-link">104 matches · 12 groups</span>
          </div>
          <div className="footer-col">
            <div className="footer-head">Sweepstake</div>
            <span className="footer-link">18 players</span>
            <span className="footer-link">Winner takes all</span>
            <span className="footer-link">Teams drawn at random</span>
          </div>
          <div className="footer-col">
            <div className="footer-head">Updates</div>
            <span className="footer-link">Edit src/data/results.ts</span>
            <span className="footer-link">Scores update automatically</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
