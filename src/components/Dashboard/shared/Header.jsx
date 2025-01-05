"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // split path and without empty string
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="border flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        {/* sidebar trigger button */}
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />

        {/* breadcrumb navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              const isLastPath = index === pathSegments.length - 1;
              const href = "/" + pathSegments.slice(0, index + 1).join("/");

              return (
                <BreadcrumbItem
                  key={index}
                  className="hidden md:inline-flex items-center capitalize"
                >
                  {isLastPath ? (
                    // current page without link
                    <BreadcrumbPage>
                      {segment.replace(/-/g, " ")}
                    </BreadcrumbPage>
                  ) : (
                    // breadcrumb link
                    <BreadcrumbLink href={href}>
                      {segment.replace(/-/g, " ")}
                    </BreadcrumbLink>
                  )}

                  {/* separator for all without last path */}
                  {isLastPath || (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
