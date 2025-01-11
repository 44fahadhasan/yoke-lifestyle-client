"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  // handle user logout
  const logout = async () => {
    try {
      const { data } = await axiosPublic.post("/api/users/logout");

      if (data.success) {
        // user data remove from local storage
        localStorage.removeItem("userData");

        // navigate to home page
        router.push("/");
      }

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  // auth sate auto update every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
