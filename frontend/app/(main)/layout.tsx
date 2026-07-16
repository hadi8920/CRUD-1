import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/ui/navbar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar/>
        {children}
      </SidebarInset>
    </SidebarProvider>
    
  );
}