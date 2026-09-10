import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <UserContext.Provider value={{ name, setName, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}