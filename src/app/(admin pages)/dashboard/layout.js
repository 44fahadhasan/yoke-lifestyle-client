import Footer from "@/components/Dashboard/shared/Footer";
import Header from "@/components/Dashboard/shared/Header";
import AppSidebar from "@/components/Dashboard/shared/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      {/* sidebar */}
      <AppSidebar />

      <SidebarInset>
        {/* header */}
        <Header />

        <main className="bg-muted min-h-[calc(100vh-125px)] xs:p-7">
          {children}
        </main>

        {/* footer */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
