import TypographyMuted from "@/components/reusable/Typography/TypographyMuted";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted flex items-center justify-center py-5 border-t">
      <TypographyMuted className={"font-light"}>
        Copyright © {new Date().getFullYear()} Yoke Lifestyle.
      </TypographyMuted>

      <TypographyMuted className={"font-light inline"}>
        ❤️ Design & developed by{" "}
        <Link
          className="hover:underline transition-all duration-300"
          href={"https://www.blankspacer.com/"}
          target="_blank"
        >
          blankspacer
        </Link>
      </TypographyMuted>
    </footer>
  );
};

export default Footer;
