import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";

export default async function CandidatePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "candidate") {
    redirect("/unauthorized");
  }

  return (
    <DashboardShell
      user={user}
      title="Candidate dashboard"
      description="Access interview invitations, view practice sessions, and keep track of personal interview feedback from a protected candidate area."
      items={[
        { label: "Permissions", value: "Join interviews" },
        { label: "Role guard", value: "Candidate only" },
        { label: "Session type", value: "JWT cookie" },
      ]}
    />
  );
}
