export type MachineStatus = "running" | "warning" | "down" | "offline";
export type TicketStatus = "open" | "diagnosing" | "resolved";
export type KnowledgeScope = "global" | "organization";

export interface Organization {
  id: string;
  name: string;
  created_at: string;
}

export interface Profile {
  id: string;
  organization_id: string;
  name: string;
  created_at: string;
}

export interface MachineModel {
  id: string;
  manufacturer: string;
  model: string;
  family: string;
  description: string | null;
  created_at: string;
}

export interface Machine {
  id: string;
  organization_id: string;
  machine_model_id: string;
  factory_id: string;
  serial_number: string | null;
  status: MachineStatus;
  created_at: string;
}

export interface Ticket {
  id: string;
  organization_id: string;
  machine_id: string;
  created_by: string;
  title: string;
  description: string;
  error_code: string | null;
  status: TicketStatus;
  resolved_at: string | null;
  created_at: string;
}

export interface KnowledgeDocument {
  id: string;
  scope: KnowledgeScope;
  organization_id: string | null;
  machine_model_id: string | null;
  title: string;
  content: string;
  source_url: string | null;
  source_language: string | null;
  created_at: string;
}
