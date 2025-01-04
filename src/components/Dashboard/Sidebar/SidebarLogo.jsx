"use client";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

const SidebarLogo = ({ data }) => {
  const { title, logo: LogoIcon, sub_title } = data || {};

  const router = useRouter();

  return (
    <SidebarMenuButton
      onClick={() => router.push("/dashboard")}
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <LogoIcon className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{title}</span>
        <span className="truncate text-xs">{sub_title}</span>
      </div>
    </SidebarMenuButton>
  );
};

export default SidebarLogo;
