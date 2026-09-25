create extension if not exists pgcrypto;

create type public.machine_status as enum ('running', 'warning', 'down', 'offline');
create type public.ticket_status as enum ('open', 'diagnosing', 'resolved');
create type public.knowledge_scope as enum ('global', 'organization');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.machine_models (
  id uuid primary key default gen_random_uuid(),
  manufacturer text not null,
  model text not null,
  family text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (manufacturer, model)
);

create table public.machines (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  machine_model_id uuid not null references public.machine_models(id),
  factory_id text not null,
  serial_number text,
  status public.machine_status not null default 'offline',
  created_at timestamptz not null default now(),
  unique (organization_id, factory_id)
);

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  machine_id uuid not null references public.machines(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  title text not null,
  description text not null,
  error_code text,
  status public.ticket_status not null default 'open',
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  scope public.knowledge_scope not null,
  organization_id uuid references public.organizations(id) on delete cascade,
  machine_model_id uuid references public.machine_models(id) on delete cascade,
  title text not null,
  content text not null,
  source_url text,
  source_language text,
  created_at timestamptz not null default now(),
  constraint knowledge_scope_owner check (
    (scope = 'global' and organization_id is null)
    or (scope = 'organization' and organization_id is not null)
  )
);

create index profiles_organization_id_idx on public.profiles (organization_id);
create index machines_organization_id_idx on public.machines (organization_id);
create index machines_machine_model_id_idx on public.machines (machine_model_id);
create index tickets_organization_id_idx on public.tickets (organization_id);
create index tickets_machine_id_idx on public.tickets (machine_id);
create index knowledge_documents_organization_id_idx on public.knowledge_documents (organization_id);
create index knowledge_documents_machine_model_id_idx on public.knowledge_documents (machine_model_id);

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.machine_models enable row level security;
alter table public.machines enable row level security;
alter table public.tickets enable row level security;
alter table public.knowledge_documents enable row level security;

create function public.current_organization_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select organization_id
  from public.profiles
  where id = auth.uid()
$$;

create policy "authenticated users can read machine models"
on public.machine_models for select
to authenticated
using (true);

create policy "members can read their organization"
on public.organizations for select
to authenticated
using (id = public.current_organization_id());

create policy "members can read organization profiles"
on public.profiles for select
to authenticated
using (organization_id = public.current_organization_id());

create policy "members can read organization machines"
on public.machines for select
to authenticated
using (organization_id = public.current_organization_id());

create policy "members can insert organization machines"
on public.machines for insert
to authenticated
with check (organization_id = public.current_organization_id());

create policy "members can update organization machines"
on public.machines for update
to authenticated
using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());

create policy "members can read organization tickets"
on public.tickets for select
to authenticated
using (organization_id = public.current_organization_id());

create policy "members can insert organization tickets"
on public.tickets for insert
to authenticated
with check (
  organization_id = public.current_organization_id()
  and created_by = auth.uid()
);

create policy "members can update organization tickets"
on public.tickets for update
to authenticated
using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());

create policy "members can read available knowledge"
on public.knowledge_documents for select
to authenticated
using (
  scope = 'global'
  or organization_id = public.current_organization_id()
);

create policy "members can manage organization knowledge"
on public.knowledge_documents for all
to authenticated
using (
  scope = 'organization'
  and organization_id = public.current_organization_id()
)
with check (
  scope = 'organization'
  and organization_id = public.current_organization_id()
);
