-- Create notes table
create extension if not exists "pgcrypto";

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notes enable row level security;

create policy "Users can view their own notes"
on public.notes for select
using (auth.uid() = user_id);

create policy "Users can insert their own notes"
on public.notes for insert
with check (auth.uid() = user_id);

create policy "Users can update their own notes"
on public.notes for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own notes"
on public.notes for delete
using (auth.uid() = user_id);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on public.notes
for each row
execute function public.handle_updated_at();
