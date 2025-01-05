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

        <main className="p-5 bg-muted min-h-[calc(100vh-125px)]">
          {children}
        </main>

        {/* footer */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
