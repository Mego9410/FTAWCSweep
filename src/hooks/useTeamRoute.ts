import { useCallback, useEffect, useState } from 'react';
import { TEAMS } from '../data/teams';

const TEAM_HASH = /^#team\/([A-Z]{3})$/;

function parseTeamHash(): string | null {
  const match = window.location.hash.match(TEAM_HASH);
  if (!match) return null;
  const id = match[1];
  return TEAMS.some((t) => t.id === id) ? id : null;
}

export function useTeamRoute() {
  const [teamId, setTeamId] = useState(parseTeamHash);

  useEffect(() => {
    const onHashChange = () => setTeamId(parseTeamHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openTeam = useCallback((id: string) => {
    window.location.hash = `team/${id}`;
    setTeamId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeTeam = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setTeamId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { teamId, openTeam, closeTeam };
}
