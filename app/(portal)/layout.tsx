// app/(portal)/layout.tsx
import Sidenavbar from "@/components/navbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      
      {/* Floating Modern Sidenavbar Component */}
      <Sidenavbar />

      {/* Main Workspace Frame container block */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        
        {/* Centered Floating Capsule Header */}
        <header className="w-full flex justify-center flex-shrink-0">
          <Sidenavbar />
        </header>

        {/* Content Render Target Area */}
        <main className="">
          {children}
        </main>
        
      </div>
    </div>
  );
}