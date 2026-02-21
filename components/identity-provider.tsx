"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Role } from "@/lib/types";

interface IdentityContextType {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
}

const IdentityContext = createContext<IdentityContextType | undefined>(
  undefined,
);

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role>("developer");

  return (
    <IdentityContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity() {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return context;
}
