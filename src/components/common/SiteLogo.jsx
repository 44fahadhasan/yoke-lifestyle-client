import Link from "next/link";

const SiteLogo = () => {
  return (
    <div className="min-w-10 max-w-12 xs:max-w-14 md:min-w-16 lg:max-w-32">
      <Link href={"/"}>
        <img
          src="/assets/images/yoke-lifestyle-logo.png"
          alt="Brand Logo"
          className="w-full object-cover rounded-full"
        />
      </Link>
    </div>
  );
};

export default SiteLogo;
