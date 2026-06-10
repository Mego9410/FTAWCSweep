import { createContext, useContext, type ReactNode } from 'react';

type OpenTeam = (teamId: string) => void;

const TeamNavContext = createContext<OpenTeam | null>(null);

export function TeamNavProvider({
  openTeam,
  children,
}: {
  openTeam: OpenTeam;
  children: ReactNode;
}) {
  return (
    <TeamNavContext.Provider value={openTeam}>{children}</TeamNavContext.Provider>
  );
}

export function useOpenTeam(): OpenTeam | undefined {
  return useContext(TeamNavContext) ?? undefined;
}
