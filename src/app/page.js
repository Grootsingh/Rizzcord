import SecondaryNav from "@/components/SecondaryNav";
import Dashboard from "@/components/Dashboard";

export default function Page() {
  return (
    <div className="flex w-full overflow-hidden bg-theme-Driftwood-grey-light">
      <SecondaryNav />
      <Dashboard />
    </div>
  );
}
