import TypographySmall from "@/components/reusable/Typography/TypographySmall";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { CircleUserRound, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import DropdownMenuProfile from "../DropdownMenu/DropdownMenuProfile";

const Ecommerce = ({ foreground }) => {
  const { auth } = useAuth();

  return (
    <div className="flex items-center sm:space-x-8 space-x-6">
      {/* wishlist */}
      <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
        <div className="relative">
          <Heart
            className={`inline ${foreground && "text-primary-foreground"}`}
          />
          <TypographySmall
            className={
              "absolute left-auto -ml-1 top-0 rounded-full bg-primary px-1 py-0 text-primary-foreground inline"
            }
          >
            0
          </TypographySmall>
        </div>
        <TypographySmall
          className={`inline ${foreground && "text-primary-foreground"}`}
        >
          Wishlist
        </TypographySmall>
      </div>

      {/* cart */}
      <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
        <div className="relative">
          <ShoppingCart
            className={`inline ${foreground && "text-primary-foreground"}`}
          />
          <TypographySmall
            className={
              "absolute left-auto -ml-1 top-0 rounded-full bg-primary px-1 py-0 text-primary-foreground inline"
            }
          >
            5
          </TypographySmall>
        </div>
        <TypographySmall
          className={`inline ${foreground && "text-primary-foreground"}`}
        >
          Cart
        </TypographySmall>
      </div>

      {auth ? (
        <>
          {/* user profile nav */}
          <DropdownMenuProfile />
        </>
      ) : (
        <>
          {/* login button */}
          <Link href={"/login"}>
            <Button
              className={`font-semibold ${
                foreground &&
                "bg-[#3c5873] hover:bg-[#2e4e6c] text-primary-foreground"
              }`}
            >
              <CircleUserRound className="hidden sm:flex" />
              Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Ecommerce;
