"use client";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { API_URL, AUTHOR_KEY, TOKEN_ID, TOKEN_KEY } from "../api/Axios";
import type IUser from "../../utils/interface/user.interfaces";
import colors from "tailwindcss/colors";

type ContextType = {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    id: string | null;
    author: IUser | null;
  };
  onLogin: (email: string, password: string) => Promise<unknown | IUser>;
  onRegister: (name: string, email: string, password: string, type: string) => Promise<unknown | IUser>;
  onLogout?: () => void;
};

export const Context = createContext({} as ContextType);
export const useAuth = () => {
  return useContext(Context);
};

interface ProviderProps {
  children: ReactNode;
}

export default function Provider(props: ProviderProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    id: string | null;
    author: IUser | null;
  }>({
    token: null,
    authenticated: null,
    id: null,
    author: null,
  });

  useEffect(() => {
    let token = "";
    let author: IUser | null;
    const loadToken = async () => {
      const id = localStorage.getItem(TOKEN_ID);
      const tokenStringfy = localStorage.getItem(TOKEN_KEY);
      const authorStringfy = localStorage.getItem(AUTHOR_KEY);
      if (tokenStringfy && authorStringfy) {
        token = JSON.parse(tokenStringfy);
        author = JSON.parse(authorStringfy);
      }

      if (token) {
        setAuthState({
          id,
          token,
          author,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const id = result.data?.user.id;
      const token = result?.data?.auth.token;
      const author = result?.data?.user;
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
      localStorage.setItem(TOKEN_ID, author.id);
      localStorage.setItem(AUTHOR_KEY, JSON.stringify(author));

      setAuthState({
        id,
        token,
        author,
        authenticated: true,
      });
      toast("Seja-bem vindo, outra vez!", {
        style: {
          backgroundColor: colors.violet[800],
          color: colors.white,
          border: 0,
        },
      });
      router.replace("/dashboard");
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          return toast("E-mail ou Palavra-passe Invalida!", {
            style: {
              backgroundColor: colors.red[600],
              color: colors.white,
              border: 0,
            },
          });
        }
      }
      return toast("Falha ao acessar sua conta. Por favor, tente mais tarde!", {
        style: {
          backgroundColor: colors.red[600],
          color: colors.white,
          border: 0,
        },
      });
    }
  };

  const register = async (name: string, email: string, password: string, type: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/create`, {
        name,
        email,
        password,
        type
      });

      const id = result.data?.user.id;
      const token = result?.data?.auth.token;
      const author = result?.data?.user;
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
      localStorage.setItem(TOKEN_ID, author.id);
      localStorage.setItem(AUTHOR_KEY, JSON.stringify(author));

      setAuthState({
        id,
        token,
        author,
        authenticated: true,
      });
      toast("Seja-bem vindo!", {
        style: {
          backgroundColor: colors.violet[800],
          color: colors.white,
          border: 0,
        },
      });
      router.replace("/dashboard");
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          return toast("E-mail invalido ou ja registrado!", {
            style: {
              backgroundColor: colors.red[600],
              color: colors.white,
              border: 0,
            },
          });
        }
      }
      return toast("Falha ao criar sua conta. Por favor, tente mais tarde!", {
        style: {
          backgroundColor: colors.red[600],
          color: colors.white,
          border: 0,
        },
      });
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_ID);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTHOR_KEY);

    setAuthState({
      id: null,
      token: null,
      author: null,
      authenticated: false,
    });

    toast("Sessão terminada, até mais!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return router.push("/sign-in");
  };

  return (
    <Context.Provider
      value={{
        onLogin: login,
        onRegister: register,
        authState,
        onLogout: logout,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {props.children}
        <Toaster />
      </QueryClientProvider>
    </Context.Provider>
  );
}

export const useContextAside = () => useContext(Context);
