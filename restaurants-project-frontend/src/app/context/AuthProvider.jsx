"use client";

import { createContext } from "react";
import { isUserLoggedIn } from "../service/auth";
import { useQuery } from "@tanstack/react-query";
import CircularIndeterminate from "../components/CircularIndeterminate";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: isUserLoggedIn,
    retry: 1,
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <AuthContext.Provider value={{ currentUser: data?.user }}>
      {children}
    </AuthContext.Provider>
  );
};
