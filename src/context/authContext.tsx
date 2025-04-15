import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import CustomModal from "../components/CustomModal/CustomModal";

// export const AuthContext:any = createContext({});

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: any):any => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

        

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  };