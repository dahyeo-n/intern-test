import { LinkProps } from 'react-router-dom';

export interface RegisterData {
  id: string;
  password: string;
  nickname: string;
}

export interface LoginData {
  id: string;
  password: string;
}

export interface ProfileData {
  nickname: string;
  avatar?: string;
}

export interface UpdateProfileData {
  nickname: string;
  avatar: File | null;
}

export interface ButtonLinkProps extends LinkProps {
  className?: string;
}

export type ActiveQueryType = 'todos' | 'todo' | null;

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
