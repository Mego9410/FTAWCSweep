import { useState } from 'react';
import { Wordmark } from './common';

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
        <div className="gate-bg" aria-hidden />
        <div className="gate-scrim" aria-hidden />
        <div className="gate-card search-panel">
          <Wordmark variant="gate" />
          <h1>World Cup Sweepstake</h1>
          <p className="sub">Enter the password to view the office sweepstake.</p>
          <form onSubmit={submit}>
            <input
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
            <div className="gate-err">{error}</div>
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
  );
}
