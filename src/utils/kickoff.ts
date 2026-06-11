import { getKickoffUk } from '../data/kickoffs';

/** Format 24h UK time (BST) as e.g. "8pm UK", "9:30pm UK", "2am UK". */
export function formatKickoffUk(time24: string): string {
  const [hourStr, minStr] = time24.split(':');
  const hour24 = parseInt(hourStr, 10);
  const mins = parseInt(minStr, 10);
  const ampm = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 || 12;
  const minPart = mins > 0 ? `:${minStr}` : '';
  return `${hour12}${minPart}${ampm} UK`;
}

export function formatMatchKickoffUk(matchNo: number): string | null {
  const time = getKickoffUk(matchNo);
  return time ? formatKickoffUk(time) : null;
}
