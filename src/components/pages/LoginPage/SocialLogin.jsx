"use client";
import { Button } from "@/components/ui/button";
import { FaFacebookF } from "react-icons/fa6";
import { ImGoogle } from "react-icons/im";

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="w-full">
        <ImGoogle />
        Login with Google
      </Button>
      <Button variant="outline" className="w-full">
        <FaFacebookF />
        Login with Facebook
      </Button>
    </div>
  );
};

export default SocialLogin;
