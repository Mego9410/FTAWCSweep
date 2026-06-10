import { getTeam } from '../data/teams';
import type { TeamProgress, TeamState } from '../engine/tournament';

export function Wordmark({ variant = 'nav' }: { variant?: 'nav' | 'footer' | 'gate' }) {
  return (
    <span className={`wordmark wordmark-${variant}`} aria-label="Frank Taylor & Associates">
      <img src="/fta-logo.png" alt="Frank Taylor & Associates" />
    </span>
  );
}

const OUT_STATES: TeamState[] = ['out-group', 'out-R32', 'out-R16', 'out-QF'];

export function Flag({ iso }: { iso: string }) {
  return <span className={`fi fi-${iso} flag`} aria-hidden />;
}

export function TeamName({
  teamId,
  size,
  out,
}: {
  teamId: string | null;
  size?: 'sm' | 'lg';
  out?: boolean;
}) {
  if (!teamId) {
    return <span className="team tbd">To be decided</span>;
  }
  const team = getTeam(teamId);
  const cls = ['team', size ?? '', out ? 'out' : ''].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <Flag iso={team.iso} />
      <span>{team.name}</span>
    </span>
  );
}

export function TeamChip({ progress }: { progress: TeamProgress }) {
  const team = getTeam(progress.teamId);
  const isOut = OUT_STATES.includes(progress.state);
  return (
    <span className={`chip ${isOut ? 'out' : ''}`} title={progress.label}>
      <Flag iso={team.iso} />
      {team.name}
    </span>
  );
}

export function StatusBadge({ progress }: { progress: TeamProgress }) {
  return <span className={`st st-${progress.state}`}>{progress.label}</span>;
}
