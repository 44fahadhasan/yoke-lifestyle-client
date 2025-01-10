"use client";
import { usePathname } from "next/navigation";
import HeaderMain from "./HeaderMain/HeaderMain";

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="bg-background mb-[65px] xs:mb-[73px] md:mb-[81px] lg:mb-0">
      <HeaderMain />
    </header>
  );
};

export default Header;
