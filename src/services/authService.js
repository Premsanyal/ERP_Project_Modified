// Auth service for login, register, and logout

const API_URL = '/api/auth';

// Login user
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

// Register user
export const register = async (name, email, password, role = 'Student') => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Registration failed');
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};