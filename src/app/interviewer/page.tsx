import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";

export default async function InterviewerPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "interviewer") {
    redirect("/unauthorized");
  }

  return (
    <DashboardShell
      user={user}
      title="Interviewer dashboard"
      description="Manage role-specific interview workflows, schedule sessions, and review candidate performance from a protected interviewer area."
      items={[
        { label: "Permissions", value: "Manage interviews" },
        { label: "Role guard", value: "Interviewer only" },
        { label: "Session type", value: "JWT cookie" },
      ]}
    />
  );
}
