import AppShell from "@/components/layout/AppShell";
import WireFeed from "@/components/wire/WireFeed";
import WireFilters from "@/components/wire/WireFilters";

export const metadata = { title: "The Wire — CeylonGrid" };

export default function WirePage() {
  return (
    <AppShell activeView="wire">
      <div className="flex flex-col h-full">
        <WireFilters />
        <div className="flex-1 overflow-hidden">
          <WireFeed />
        </div>
      </div>
    </AppShell>
  );
}
