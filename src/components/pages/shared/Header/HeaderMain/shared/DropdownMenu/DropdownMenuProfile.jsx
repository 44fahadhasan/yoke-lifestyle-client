import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { CircleUserRound, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DropdownMenuProfile = () => {
  const router = useRouter();

  const { logout, auth } = useAuth();

  // handle logout
  const handleLogOut = async () => {
    const res = await logout();

    if (res.success) {
      toast.success(res.message);
      router.push("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={auth?.avatar} alt={auth?.name} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href={"/my-profile"}>
            <DropdownMenuItem>
              My Profile
              <DropdownMenuShortcut>
                <CircleUserRound size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {auth?.role === "admin" && (
          <>
            <DropdownMenuGroup>
              <Link href={"/dashboard"}>
                <DropdownMenuItem>
                  Dashboard
                  <DropdownMenuShortcut>
                    <LayoutDashboard size={16} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {/* logout */}
        <DropdownMenuItem>
          <button type="button" onClick={handleLogOut}>
            Log out
          </button>
          <DropdownMenuShortcut>
            <LogOut size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuProfile;
