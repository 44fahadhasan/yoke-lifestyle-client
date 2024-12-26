import Link from "next/link";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-[10px]">
      {/* facebook */}
      <Link
        href={"https://www.facebook.com/YokeLifestyles/"}
        target="_blank"
        className="text-[1.3rem] p-1.5 cursor-pointer rounded-full text-primary-foreground hover:bg-primary transition-all duration-300"
      >
        <CgFacebook />
      </Link>

      {/* twitter */}
      <Link
        href={"https://x.com/yokelifestyles"}
        target="_blank"
        className="text-[1.2rem] p-1.5 cursor-pointer rounded-full text-primary-foreground hover:bg-primary transition-all duration-300"
      >
        <BsTwitter />
      </Link>

      {/* instagram */}
      <Link
        href={"https://www.instagram.com/yokelifestyles/?hl=en"}
        target="_blank"
        className="text-[1.2rem] p-1.5 cursor-pointer rounded-full text-primary-foreground hover:bg-primary transition-all duration-300"
      >
        <BsInstagram />
      </Link>

      {/* linkedin */}
      <Link
        href={"http://linkedin.com/in/yokelifestyles"}
        target="_blank"
        className="text-[1.2rem] p-1.5 cursor-pointer rounded-full text-primary-foreground hover:bg-primary transition-all duration-300"
      >
        <BsLinkedin />
      </Link>
    </div>
  );
};

export default SocialIcons;
