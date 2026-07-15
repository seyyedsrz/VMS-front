import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MOCK_USERS, permissionsForRole } from "./mock-data";
import type { Permission, User } from "./types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  permissions: Permission[];
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const STORAGE_KEY = "vms.session";

const AuthContext = createContext<AuthState | null>(null);

interface StoredSession {
  userId: string;
  loginAt: string;
}

function readSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    return MOCK_USERS.find((u) => u.id === parsed.userId) ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setHydrated(true);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    // Mock: password is same as username. Replace with real API call.
    await new Promise((r) => setTimeout(r, 400));
    const found = MOCK_USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.active,
    );
    if (!found || password !== username) {
      throw new Error("نام کاربری یا رمز عبور نادرست است");
    }
    const session: StoredSession = { userId: found.id, loginAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(found);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const permissions = useMemo(
    () => (user ? permissionsForRole(user.role) : []),
    [user],
  );

  const hasPermission = useCallback(
    (permission: Permission) => permissions.includes(permission),
    [permissions],
  );

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: !!user,
      permissions,
      login,
      logout,
      hasPermission,
    }),
    [user, permissions, login, logout, hasPermission],
  );

  // Avoid hydration mismatch — render children only after client-side session read
  if (!hydrated) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen bg-background" />
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
