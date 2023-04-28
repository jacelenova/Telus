import React, { useState, createContext, FC } from "react";
import { login } from "../services/api-service";
import User from '../models/user';
import Props from "../models/props";

type AuthContextType = {
  user: User | null,
  loginUser: (username: string, password: string) => Promise<boolean>,
  logoutUser: () => void,
  getToken: () => string | null,
}

const initialContext = {
  user: null,
  loginUser: async (username: string, password: string) => true,
  logoutUser: () => { },
  getToken: () => "",
}

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = async (username: string, password: string) => {
    const res = await login(username, password);
    let isError = true;

    if (res.status === 200) {
      setUser(res.value.user);
      saveToken(res.value.token);
      isError = false;
    }

    return isError;
  }

  const getToken = () => {
    return localStorage.getItem('token');
  }

  const saveToken = (token: string) => {
    localStorage.setItem("token", token)
  }

  const logoutUser = () => {
    setUser(null);
  }

  const defaultContext = {
    user,
    loginUser,
    logoutUser,
    getToken
  }

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  )
}
