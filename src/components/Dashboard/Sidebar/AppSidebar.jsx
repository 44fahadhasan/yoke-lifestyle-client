"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CirclePlus, HousePlus, LayoutDashboard, Settings } from "lucide-react";

import NavMain from "./NavMain";
import NavOthers from "./NavOthers";
import NavUser from "./NavUser";
import SidebarLogo from "./SidebarLogo";

// data of sidebar
const data = {
  header: {
    title: "Dashboard",
    logo: LayoutDashboard,
    sub_title: "Yoke Lifestyle",
  },

  nav_main: [
    {
      title: "Texonomy",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: CirclePlus,
        },
        {
          title: "Tags",
          url: "/dashboard/tags",
          icon: CirclePlus,
        },
      ],
    },
  ],

  nav_others: [
    {
      name: "Home",
      url: "/",
      icon: HousePlus,
    },
  ],
};

const AppSidebar = (props) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* header of sidebar */}
      <SidebarHeader>
        <SidebarLogo data={data.header} />
      </SidebarHeader>

      {/* main content of sidebar */}
      <SidebarContent>
        <NavMain items={data.nav_main} />
        <NavOthers items={data.nav_others} />
      </SidebarContent>

      {/* footer of sidebar */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
