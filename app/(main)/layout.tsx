import { Sidebar } from "@/src/shared/components/layout/sidebar";
import "./globals.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hidden md:block h-full">
      <div className="border-t h-full">
        <div className="bg-background h-full">
          <div className="grid lg:grid-cols-5 h-full">
            <Sidebar className="hidden lg:block" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
