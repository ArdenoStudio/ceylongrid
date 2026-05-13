import AppShell from "@/components/layout/AppShell";
import dynamic from "next/dynamic";

const DistrictMap = dynamic(() => import("@/components/map/DistrictMap"), {
  ssr: false,
  loading: () => (
    <div className="size-full animate-pulse bg-cg-surface rounded" />
  ),
});

export const metadata = { title: "The Grid — CeylonGrid" };

export default function GridPage() {
  return (
    <AppShell activeView="grid">
      <div className="size-full">
        <DistrictMap />
      </div>
    </AppShell>
  );
}
