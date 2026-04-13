// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { authAPI } from '@/services/api';
// import { toast } from 'sonner';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     pincode?: string;
//     country?: string;
//   };
//   avatar?: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (userData: any) => Promise<void>;
//   logout: () => void;
//   updateProfile: (userData: any) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem('token');
//       const savedUser = localStorage.getItem('user');
      
//       if (token && savedUser) {
//         try {
//           setUser(JSON.parse(savedUser));
//           // Verify token with backend
//           await fetchProfile();
//         } catch (error) {
//           console.error('Failed to initialize auth:', error);
//           logout();
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await authAPI.getProfile();
//       // Handle both response formats
//       const userData = response.data.user || response.data;
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//     } catch (error) {
//       console.error('Failed to fetch profile:', error);
//       throw error;
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await authAPI.login({ email, password });
//       // Handle both response formats
//       const data = response.data;
//       const token = data.token;
//       const userData = data.user || data;
      
//       if (!token) {
//         throw new Error('No token received');
//       }
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
//       toast.success('Login successful! Welcome back!');
//     } catch (error: any) {
//       const message = error.response?.data?.message || error.message || 'Login failed';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const register = async (userData: any) => {
//     try {
//       const response = await authAPI.register(userData);
//       // Handle both response formats
//       const data = response.data;
//       const token = data.token;
//       const user = data.user || data;
      
//       if (!token) {
//         throw new Error('No token received');
//       }
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       toast.success('Registration successful! Welcome to Go-Mango!');
//     } catch (error: any) {
//       const message = error.response?.data?.message || error.message || 'Registration failed';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     toast.success('Logged out successfully');
//   };

//   const updateProfile = async (userData: any) => {
//     try {
//       const response = await authAPI.updateProfile(userData);
//       const updatedUser = response.data.user || response.data;
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       toast.success('Profile updated successfully!');
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Update failed';
//       toast.error(message);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/services/api';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          // Optionally verify token with backend
          await fetchProfile();
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      const userData = response.data.user || response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Don't logout here, just log the error
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const data = response.data;
      const token = data.token;
      const userData = data.user || data;
      
      if (!token) {
        throw new Error('No token received');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful! Welcome back!');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authAPI.register(userData);
      const data = response.data;
      const token = data.token;
      const user = data.user || data;
      
      if (!token) {
        throw new Error('No token received');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Registration successful! Welcome to Go-Mango!');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userData: any) => {
    try {
      const response = await authAPI.updateProfile(userData);
      const updatedUser = response.data.user || response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};