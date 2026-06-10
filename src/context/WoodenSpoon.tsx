import { createContext, useContext } from 'react';

const WoodenSpoonContext = createContext<string | null>(null);

export function WoodenSpoonProvider({
  teamId,
  children,
}: {
  teamId: string | null;
  children: React.ReactNode;
}) {
  return (
    <WoodenSpoonContext.Provider value={teamId}>{children}</WoodenSpoonContext.Provider>
  );
}

export function useWoodenSpoonTeamId(): string | null {
  return useContext(WoodenSpoonContext);
}
