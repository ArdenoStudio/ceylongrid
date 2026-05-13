import AppShell from "@/components/layout/AppShell";
import WireFeed from "@/components/wire/WireFeed";

export const metadata = { title: "The Wire — CeylonGrid" };

export default function WirePage() {
  return (
    <AppShell activeView="wire">
      <div className="h-full">
        <WireFeed />
      </div>
    </AppShell>
  );
}
