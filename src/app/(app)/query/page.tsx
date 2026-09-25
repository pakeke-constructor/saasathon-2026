import type { Metadata } from "next";
import { QueryConsole } from "@/components/query/query-console";

export const metadata: Metadata = {
  title: "Diagnose",
  description: "Query global and site-specific machine knowledge.",
};

export default function QueryPage() {
  return <QueryConsole />;
}
