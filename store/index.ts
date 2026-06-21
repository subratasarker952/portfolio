import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ==========================================
// 1. Theme Store (Persisted in localStorage)
// ==========================================
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark', // Default theme
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // localStorage key name
    }
  )
);

// ==========================================
// 2. Auth Store (Persisted in localStorage)
// ==========================================
interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // localStorage key name
    }
  )
);

// ==========================================
// 3. UI Store (Not Persisted - Resets on refresh)
// ==========================================
interface UIStore {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));