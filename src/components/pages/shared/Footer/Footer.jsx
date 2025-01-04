"use client";
import { usePathname } from "next/navigation";
import FooterMain from "./FooterMain/FooterMain";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-gradient-to-r from-[#223242] via-[#283848] to-[#223242]">
      <FooterMain />
    </footer>
  );
};

export default Footer;
