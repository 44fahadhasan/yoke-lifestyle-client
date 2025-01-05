"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  CirclePlus,
  HousePlus,
  Info,
  LayoutDashboard,
  Settings,
  SquareChartGantt,
} from "lucide-react";
import { MdOutlinePostAdd } from "react-icons/md";
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
          title: "Mange Categories",
          url: "/dashboard/categories",
          icon: CirclePlus,
        },
        {
          title: "Mange Tags",
          url: "/dashboard/tags",
          icon: CirclePlus,
        },
      ],
    },

    {
      title: "Post",
      icon: MdOutlinePostAdd,
      isActive: true,
      items: [
        {
          title: "Mange Attributes",
          url: "/dashboard/attributes",
          icon: CirclePlus,
        },
        {
          title: "Add Product",
          url: "/dashboard/add-product",
          icon: CirclePlus,
        },
      ],
    },

    {
      title: "Info",
      icon: Info,
      isActive: true,
      items: [
        {
          title: "All Product",
          url: "/dashboard/all-product",
          icon: SquareChartGantt,
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
