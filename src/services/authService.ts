// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
}

export async function register(credentials: RegisterCredentials): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
}

export function logout(): void {
  localStorage.removeItem('user');
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}