import AppShell from "@/components/layout/AppShell";
import PulsePlaceholder from "@/components/pulse/PulsePlaceholder";

export const metadata = { title: "The Pulse — CeylonGrid" };

export default function PulsePage() {
  return (
    <AppShell activeView="pulse">
      <PulsePlaceholder />
    </AppShell>
  );
}
