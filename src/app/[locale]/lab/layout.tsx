import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Package, Wrench, Boxes, FileText } from "lucide-react";
import { cookies } from "next/headers";
import { LabLoginForm } from "@/components/lab/LabLoginForm";

export const metadata = {
  title: "ISA Lab Management System",
  description: "Asset, Inventory, Project & Lab Operations Management by AIOT Club",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('lab_access')?.value === 'true';

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-light-bg dark:bg-background min-h-screen">
          <div className="container mx-auto px-4 md:px-6 py-8">
            <LabLoginForm />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Lab Sub-navigation */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto py-3 gap-6 text-sm font-medium hide-scrollbar">
            <Link href="/lab" className="flex items-center gap-2 whitespace-nowrap text-foreground hover:text-primary transition-colors">
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link href="/lab/assets" className="flex items-center gap-2 whitespace-nowrap text-muted-foreground hover:text-primary transition-colors">
              <Package size={16} /> Tài sản
            </Link>
            <Link href="/lab/inventory" className="flex items-center gap-2 whitespace-nowrap text-muted-foreground hover:text-primary transition-colors">
              <Boxes size={16} /> Vật tư
            </Link>
            <Link href="/lab/projects" className="flex items-center gap-2 whitespace-nowrap text-muted-foreground hover:text-primary transition-colors">
              <FileText size={16} /> Dự án
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-light-bg dark:bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy dark:text-white">ISA Lab Management</h1>
            <p className="text-muted-foreground mt-1">Asset &bull; Inventory &bull; Project &bull; Lab Operations</p>
          </div>
          
          {children}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
