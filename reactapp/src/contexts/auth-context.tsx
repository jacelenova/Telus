import React, { useState, createContext, FC, useEffect } from "react";
import { toast } from 'react-toastify';
import { login, getCurrentUser } from "../services/api-service";
import User from '../models/user';
import Props from "../models/props";

type AuthContextType = {
  user: User | null,
  loginUser: (username: string, password: string) => Promise<boolean>,
  logoutUser: () => void,
  getToken: () => string | null,
  successToast: (content?: string) => void,
  failToast: (content?: string) => void
}

const initialContext = {
  user: null,
  loginUser: async (username: string, password: string) => true,
  logoutUser: () => {},
  getToken: () => "",
  successToast: (content?: string) => {},
  failToast: (content?: string) => {}
}

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token && !user) {
      getLoggedInUser();
    }
  }, [token, user])

  const successToast = (content?: string) => {
    content = content ?? "Save success!";
    toast.success(content, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  const failToast = (content?: string) => {
    content = content ?? "Error saving!";
    toast.error(content, {
      position: "top-right",
      autoClose: 3000
    })
  }

  const getLoggedInUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUser(user.value);
    }
  }

  const loginUser = async (username: string, password: string) => {
    const res = await login(username, password);
    let isError = true;

    if (res.status === 200) {
      setUser(res.value.user);
      saveToken(res.value.token);
      isError = false;
    }
    else {
      failToast("Login failed!");
    }

    return isError;
  }

  const getToken = () => {
    return localStorage.getItem('token');
  }

  const saveToken = (token: string) => {
    localStorage.setItem("token", token)
  }

  const removeToken = () => {
    localStorage.removeItem("token");
  }

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    removeToken();
  }

  const defaultContext = {
    user,
    loginUser,
    logoutUser,
    getToken,
    successToast,
    failToast
  }

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  )
}
