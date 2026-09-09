import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getAuthenticatedUser,
  logout as cognitoLogout,
} from "../services/authService";

interface AuthUser {
  username: string;
  userId: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshUser() {
    const currentUser =
      await getAuthenticatedUser();

    setUser(currentUser);
  }

  async function logout() {
    await cognitoLogout();
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      await refreshUser();
      setLoading(false);
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider",
    );
  }

  return context;
}