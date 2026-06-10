import { useState } from 'react';
import { Wordmark } from './common';
import { WcEmblem, WcWordmark } from './WcBrand';

const PASSWORD = 'Fr@nk';

export function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) {
      onUnlock();
    } else {
      setError('Incorrect password. Try again.');
      setValue('');
    }
  }

  return (
    <div className="gate">
      <div className="gate-frame">
        <div className="gate-bg" aria-hidden>
          <img src="/wc-hero.jpg" alt="" className="gate-bg-photo" />
          <div className="gate-bg-accent" />
        </div>
        <WcEmblem className="gate-emblem-watermark" />
        <div className="gate-inner">
          <Wordmark variant="gate" />
          <div className="gate-content">
            <WcWordmark className="gate-wc-wordmark" />
            <p className="eyebrow">Office sweepstake</p>
            <h1>World Cup Sweepstake</h1>
            <p className="gate-sub">Enter the password to view draws, fixtures, and the live leaderboard.</p>
          </div>
          <div className="gate-panel">
            <form onSubmit={submit}>
              <label className="gate-label" htmlFor="gate-password">
                Password
              </label>
              <input
                id="gate-password"
                className="field"
                type="password"
                placeholder="Enter password"
                value={value}
                autoFocus
                onChange={(e) => {
                  setValue(e.target.value);
                  setError('');
                }}
              />
              <div className="gate-err" role="alert">
                {error}
              </div>
              <button type="submit" className="btn btn-primary btn-lg gate-btn">
                Enter
                <svg className="arw" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
