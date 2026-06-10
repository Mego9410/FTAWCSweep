import { getTeam } from '../data/teams';
import { useOpenTeam } from '../context/TeamNav';
import { useWoodenSpoonTeamId } from '../context/WoodenSpoon';
import type { TeamProgress, TeamState } from '../engine/tournament';

export function WoodenSpoonTag({ title }: { title?: string }) {
  return (
    <span
      className="wooden-spoon"
      role="img"
      aria-label="Wooden spoon"
      title={title ?? 'Wooden spoon — most goals conceded in the group stage'}
    >
      🥄
    </span>
  );
}

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
  link = true,
}: {
  teamId: string | null;
  size?: 'sm' | 'lg';
  out?: boolean;
  link?: boolean;
}) {
  if (!teamId) {
    return <span className="team tbd">To be decided</span>;
  }
  const team = getTeam(teamId);
  const openTeam = useOpenTeam();
  const woodenSpoonTeamId = useWoodenSpoonTeamId();
  const showWoodenSpoon = teamId === woodenSpoonTeamId;
  const cls = ['team', size ?? '', out ? 'out' : ''].filter(Boolean).join(' ');
  const inner = (
    <>
      <Flag iso={team.iso} />
      <span>{team.name}</span>
      {showWoodenSpoon && <WoodenSpoonTag />}
    </>
  );

  if (link && openTeam) {
    return (
      <button
        type="button"
        className={`team-link ${cls}`}
        onClick={() => openTeam(teamId)}
        title={`View ${team.name}`}
      >
        {inner}
      </button>
    );
  }

  return <span className={cls}>{inner}</span>;
}

export function TeamChip({ progress }: { progress: TeamProgress }) {
  const team = getTeam(progress.teamId);
  const isOut = OUT_STATES.includes(progress.state);
  const openTeam = useOpenTeam();
  const woodenSpoonTeamId = useWoodenSpoonTeamId();
  const showWoodenSpoon = progress.teamId === woodenSpoonTeamId;
  const inner = (
    <>
      <Flag iso={team.iso} />
      {team.name}
      {showWoodenSpoon && <WoodenSpoonTag />}
    </>
  );

  if (openTeam) {
    return (
      <button
        type="button"
        className={`team-link chip ${isOut ? 'out' : ''}`}
        title={progress.label}
        onClick={() => openTeam(progress.teamId)}
      >
        {inner}
      </button>
    );
  }

  return (
    <span className={`chip ${isOut ? 'out' : ''}`} title={progress.label}>
      {inner}
    </span>
  );
}

export function StatusBadge({ progress }: { progress: TeamProgress }) {
  return <span className={`st st-${progress.state}`}>{progress.label}</span>;
}
