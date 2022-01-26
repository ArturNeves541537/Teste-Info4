import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  usuario: null,
  setUsuario: () => null,
});

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;