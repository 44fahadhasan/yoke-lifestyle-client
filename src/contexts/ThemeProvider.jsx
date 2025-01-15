"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children, ...props }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      // defaultTheme="system"
      // enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
