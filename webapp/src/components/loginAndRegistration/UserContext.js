import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserContextProvider({ children, baseUser = null }) {
  const [user, setUser] = useState(baseUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}


