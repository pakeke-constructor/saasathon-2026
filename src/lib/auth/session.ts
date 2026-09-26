import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  organizationId: string;
  organizationName: string;
  isDemo: boolean;
}

// Fixed demo identity used by the dev auth bypass. Stable ids so seeded/mock data can reference them.
export const DEMO_USER: SessionUser = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "operator@demo.factory",
  name: "Dana Reyes",
  organizationId: "00000000-0000-4000-8000-0000000000a1",
  organizationName: "Kestrel Precision Machining",
  isDemo: true,
};

/**
 * Dev auth bypass: in `next dev` every request is treated as logged in as DEMO_USER, so agents
 * and screenshots can open any page instantly. Never active in production builds.
 *   - Disable globally: DEV_AUTH_BYPASS=0 in .env.local (to test real Supabase login).
 *   - Disable per browser: cookie `dev-auth=off` (what `npm run shot -- --logged-out` sets).
 */
async function devBypassActive() {
  if (process.env.NODE_ENV === "production") return false;
  if (process.env.DEV_AUTH_BYPASS === "0") return false;
  const cookieStore = await cookies();
  return cookieStore.get("dev-auth")?.value !== "off";
}

/** The current user, or null when logged out. ALL auth checks must go through this. */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (await devBypassActive()) return DEMO_USER;
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, organization_id, organizations(name)")
    .eq("id", data.user.id)
    .maybeSingle<{ name: string; organization_id: string; organizations: { name: string } | null }>();

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    name: profile?.name ?? data.user.email ?? "Operator",
    organizationId: profile?.organization_id ?? "",
    organizationName: profile?.organizations?.name ?? "",
    isDemo: false,
  };
}

/** Use at the top of any logged-in page/layout. Redirects anonymous visitors to /login. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}
