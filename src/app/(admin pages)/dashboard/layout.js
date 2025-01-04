import Footer from "@/components/Dashboard/shared/Footer";
import Header from "@/components/Dashboard/shared/Header";
import AppSidebar from "@/components/Dashboard/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      {/* sidebar */}
      <AppSidebar />
      
      <SidebarInset>
        {/* header */}
        <Header />

        <main className="min-h-[calc(100vh-495.36px)]">{children}</main>

        {/* footer */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
