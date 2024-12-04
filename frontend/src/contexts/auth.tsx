import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import axios from "axios";
import { api } from "../utils/api";

export type UserDataDto = {
  id: number;
  email: string;
  name: string;
};

export type AuthResponseDto = {
  accessToken: string;
  userData: UserDataDto;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextData = {
  signInByEmail: (
    email: string,
    password: string
  ) => Promise<UserDataDto | null>;
  registerNewUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserDataDto | null>;
  signOut: () => void;
  user: UserDataDto | null;
  isAuthenticated: boolean;
  updateUser: (updatedUser: UserDataDto) => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDataDto | null>(() => {
    const userLocalStorage = localStorage.getItem("quiker");
    return userLocalStorage ? JSON.parse(userLocalStorage) : null;
  });

  const verifyToken = async () => {
    try {
      const { data } = await api.get<UserDataDto>("/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${parseCookies()["quiker.auth.token"]}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.error("Token verification failed", error);
      signOut();
      return null;
    }
  };

  const authChannel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    authChannel.current = new BroadcastChannel("auth");

    authChannel.current.onmessage = (message) => {
      if (message.data === "signOut") {
        signOut();
      }
    };

    return () => {
      authChannel.current?.close();
    };
  }, []);

  useEffect(() => {
    getUserInfos();
  }, []);

  const registerNewUser = async (
    email: string,
    password: string,
    name: string
  ): Promise<UserDataDto | null> => {
    try {
      const { data } = await api.post<AuthResponseDto>(
        "/auth/register-new-client",
        {
          email,
          password,
          name,
        }
      );

      setCookie(null, "quiker.auth.token", data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      localStorage.setItem("quiker", JSON.stringify(data.userData));
      setUser(data.userData);
      return data.userData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Registration failed", error);
      } else {
        console.error("Registration failed", error);
      }
      return null;
    }
  };

  const signInByEmail = async (
    email: string,
    password: string
  ): Promise<UserDataDto | null> => {
    try {
      const { data } = await api.post<AuthResponseDto>("/auth/login", {
        email,
        password,
      });

      setCookie(null, "quiker.auth.token", data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      localStorage.setItem("quiker", JSON.stringify(data.userData));
      setUser(data.userData);
      return data.userData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed", error);
      } else {
        console.error("Login failed", error);
      }
      return null;
    }
  };

  const signOut = () => {
    destroyCookie(null, "quiker.auth.token", { path: "/" });
    localStorage.removeItem("quiker");
    setUser(null);
    authChannel.current?.postMessage("signOut");
  };

  const updateUser = (updatedUser: UserDataDto) => {
    localStorage.setItem("quiker", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const getUserInfos = async () => {
    const { "quiker.auth.token": token } = parseCookies();
    const userDataString = localStorage.getItem("quiker");

    if (token && userDataString) {
      try {
        const response = await verifyToken();
        if (response) {
          setUser(response);
        }
      } catch (error) {
        console.log(error);
        signOut();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInByEmail,
        registerNewUser,
        signOut,
        user,
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
