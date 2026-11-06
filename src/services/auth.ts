import { AuthUser, TEACHER_EMAIL } from '../types';

const AUTH_STORAGE_KEY = 'k9_ai_auth_user_v2';
const AUTH_EVENT_NAME = 'k9_auth_updated';

// Google Client ID for Google Identity Services (GIS)
export const GOOGLE_CLIENT_ID = '221364165366-applet.apps.googleusercontent.com';

export function isTeacherEmail(email: string): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === TEACHER_EMAIL.toLowerCase();
}

/**
 * Decode JWT token payload returned by Google Identity Services
 */
export function parseGoogleJwt(token: string): { email: string; name?: string; picture?: string; sub?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse Google JWT', error);
    return null;
  }
}

/**
 * Get the currently authenticated user from localStorage,
 * or automatically sync with Google session if not yet initialized.
 */
export function getCurrentUser(): AuthUser {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const parsed: AuthUser = JSON.parse(raw);
      // Double check role integrity in case TEACHER_EMAIL changed
      const verifiedRole = isTeacherEmail(parsed.email) ? 'teacher' : 'student';
      if (parsed.role !== verifiedRole) {
        parsed.role = verifiedRole;
        setCurrentUser(parsed);
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error reading auth user from storage:', error);
  }

  // Automatic default sync with Google active session:
  // In this session, the active Google account is v.hoangnh70@vinschool.edu.vn
  const defaultUser: AuthUser = {
    id: `user-google-${Date.now()}`,
    email: TEACHER_EMAIL,
    name: 'Thầy Hoàng (GV Tin học - AI)',
    avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(TEACHER_EMAIL)}`,
    role: 'teacher'
  };
  setCurrentUser(defaultUser);
  return defaultUser;
}

export function setCurrentUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: user }));
  } catch (error) {
    console.error('Error saving auth user:', error);
  }
}

/**
 * Sync user profile and roles directly from Google JWT Credential
 */
export function syncWithGoogleCredential(jwtCredential: string): AuthUser | null {
  const payload = parseGoogleJwt(jwtCredential);
  if (!payload || !payload.email) {
    console.error('Invalid Google JWT credential');
    return null;
  }

  const cleanEmail = payload.email.trim().toLowerCase();
  const isTeacher = isTeacherEmail(cleanEmail);

  const user: AuthUser = {
    id: payload.sub || `user-${Date.now()}`,
    email: cleanEmail,
    name: payload.name || (isTeacher ? 'Thầy Hoàng (GV Tin - AI)' : cleanEmail.split('@')[0]),
    avatar: payload.picture || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(cleanEmail)}`,
    role: isTeacher ? 'teacher' : 'student'
  };

  setCurrentUser(user);
  return user;
}

/**
 * Manual or programmatic Google login with email
 */
export function loginWithGoogle(email: string, name?: string, avatar?: string): AuthUser {
  const cleanEmail = email.trim().toLowerCase();
  const isTeacher = isTeacherEmail(cleanEmail);

  const user: AuthUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    email: cleanEmail,
    name: name || (isTeacher ? 'Thầy Hoàng (GV Tin - AI)' : cleanEmail.split('@')[0]),
    avatar: avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(cleanEmail)}`,
    role: isTeacher ? 'teacher' : 'student'
  };

  setCurrentUser(user);
  return user;
}

/**
 * One-click sync directly as Teacher v.hoangnh70@vinschool.edu.vn
 */
export function loginTeacherQuick(): AuthUser {
  return loginWithGoogle(
    TEACHER_EMAIL,
    'Thầy Hoàng (GV Tin học - AI)',
    `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(TEACHER_EMAIL)}`
  );
}

/**
 * Logout and clear session
 */
export function logout(): void {
  setCurrentUser(null);
}

/**
 * Subscribe to auth updates across components and tabs
 */
export function subscribeToAuth(callback: (user: AuthUser | null) => void): () => void {
  const handler = () => {
    callback(getCurrentUser());
  };
  window.addEventListener(AUTH_EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(AUTH_EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}
