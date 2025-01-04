"use client";
import { usePathname } from "next/navigation";
import HeaderMain from "./HeaderMain/HeaderMain";

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="bg-background">
      <HeaderMain />
    </header>
  );
};

export default Header;
