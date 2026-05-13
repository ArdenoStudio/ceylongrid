import NavBar from "./NavBar";
import ViewSwitcher from "./ViewSwitcher";

interface AppShellProps {
  children: React.ReactNode;
  activeView: "grid" | "wire" | "pulse";
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-full bg-cg-bg">
      <NavBar />
      <ViewSwitcher />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
