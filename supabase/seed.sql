-- ============================================================
-- MWTA Supabase Seed
-- Run this once in Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. Create programs table ─────────────────────────────────
create table if not exists programs (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('junior', 'adult')),
  program_id  text,
  name        text not null,
  time        text not null,
  description text,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz default now()
);

alter table programs enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='programs' and policyname='Public read programs') then
    create policy "Public read programs" on programs for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='programs' and policyname='Authenticated manage programs') then
    create policy "Authenticated manage programs" on programs for all using (auth.role() = 'authenticated');
  end if;
end $$;

-- ── 2. Seed junior programs ──────────────────────────────────
insert into programs (type, program_id, name, time, description, active, sort_order)
values
  ('junior', 'peewees',     'Pee-Wees',     'Mon & Wed 4:30–5:30pm',
   'Perfect for beginners ages 5–10. We focus on fun fundamentals, coordination, and learning how to rally with confidence. Emphasis on core fundamentals.',
   true, 1),

  ('junior', 'champions',   'Champions',    'Mon–Thurs 4:30–6:00pm',
   'Designed for the younger beginner up to Age 12. For developing players ready to train consistently. Emphasis on technique, movement, and match-style drills.',
   true, 2),

  ('junior', 'elite',       'Elite',        'Mon–Thurs 5:00–7:00pm',
   'Highschool aged or near highschool aged players looking to make varsity or play varsity. High-intensity training for competitive juniors, focusing on strategy, fitness, and match play.',
   true, 3),

  ('junior', 'collegeprep', 'College Prep', 'Mon–Fri 3:00–5:00pm',
   'Players must get permission to register for this class. All participants must be actively participating in tournaments. Includes strategy, video-style feedback, fitness, and structured match play.',
   true, 4)
on conflict do nothing;

-- ── 3. Seed adult programs ───────────────────────────────────
insert into programs (type, program_id, name, time, description, active, sort_order)
values
  ('adult', 'feb9',  'Feb 9th - 11th',  '10:30am–12:30pm',
   'Start the year strong with a fun, high-rep clinic focused on groundstrokes, volleys, and serves. Perfect for beginners and intermediate players who want to build consistency and confidence.',
   true, 1),

  ('adult', 'feb16', 'Feb 16th - 20th', '10:30am–12:30pm',
   'Take the next step with more live-ball drills, movement, and point play. Great for players who want to improve strategy for singles/doubles and get match-ready in a supportive group.',
   true, 2)
on conflict do nothing;

-- ── 4. Create coaches table ───────────────────────────────────
create table if not exists coaches (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  title              text,
  email              text,
  phone              text,
  image              text,
  image_url          text,
  years_experience   integer default 0,
  main_certification text,
  key_specialties    text[] default '{}',
  active             boolean not null default true,
  sort_order         integer not null default 0,
  created_at         timestamptz default now()
);

alter table coaches enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='coaches' and policyname='Public read coaches') then
    create policy "Public read coaches" on coaches for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='coaches' and policyname='Authenticated manage coaches') then
    create policy "Authenticated manage coaches" on coaches for all using (auth.role() = 'authenticated');
  end if;
end $$;

-- ── 5. Seed default coaches ──────────────────────────────────
insert into coaches (name, title, image, years_experience, main_certification, key_specialties, active, sort_order)
values
  ('Mike White',   'Head Pro & Owner', 'mikeportrait.png',  10,
   'USPTA Certified Professional',
   array['Junior Development','Competitive Training','Match Strategy'],
   true, 1),

  ('Becca Little', 'Assistant Coach',  'beccaportrait.png',  5,
   'USPTA Certified',
   array['Beginner Instruction','Youth Programs','Group Clinics'],
   true, 2)
on conflict do nothing;

-- ── 6. Create staff_availability table ───────────────────────
create table if not exists staff_availability (
  id          uuid primary key default gen_random_uuid(),
  coach_id    uuid references coaches(id) on delete cascade,
  day_of_week text not null,
  start_time  text not null,
  end_time    text not null
);

alter table staff_availability enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='staff_availability' and policyname='Public read availability') then
    create policy "Public read availability" on staff_availability for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='staff_availability' and policyname='Authenticated manage availability') then
    create policy "Authenticated manage availability" on staff_availability for all using (auth.role() = 'authenticated');
  end if;
end $$;

-- ── 7. Create lesson_bookings table ──────────────────────────
create table if not exists lesson_bookings (
  id                 uuid primary key default gen_random_uuid(),
  coach_id           uuid references coaches(id),
  coach_name         text,
  lesson_type        text,
  duration           text,
  preferred_date     date,
  preferred_time     text,
  alternate_datetime text,
  first_name         text,
  last_name          text,
  email              text,
  phone              text,
  player_name        text,
  notes              text,
  status             text not null default 'pending',
  created_at         timestamptz default now()
);

alter table lesson_bookings enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='lesson_bookings' and policyname='Public insert bookings') then
    create policy "Public insert bookings" on lesson_bookings for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='lesson_bookings' and policyname='Authenticated manage bookings') then
    create policy "Authenticated manage bookings" on lesson_bookings for all using (auth.role() = 'authenticated');
  end if;
end $$;

-- ── 8. Create registrations table ────────────────────────────
create table if not exists registrations (
  id            uuid primary key default gen_random_uuid(),
  type          text,
  program       text,
  program_type  text,
  program_name  text,
  program_display_name text,
  participant_name text,
  first_name    text,
  last_name     text,
  responsible_party text,
  email         text,
  phone         text,
  address       text,
  city          text,
  state         text,
  zip           text,
  country       text,
  days_selected text[],
  monthly_price numeric,
  prorated_first_payment numeric,
  cancellation_policy_agreed boolean default false,
  troute_customer_id text,
  troute_payment_id text,
  status        text not null default 'pending',
  notes         text,
  created_at    timestamptz default now()
);

alter table registrations add column if not exists program_type text;
alter table registrations add column if not exists program_name text;
alter table registrations add column if not exists program_display_name text;
alter table registrations add column if not exists participant_name text;
alter table registrations add column if not exists responsible_party text;
alter table registrations add column if not exists country text;
alter table registrations add column if not exists prorated_first_payment numeric;
alter table registrations add column if not exists cancellation_policy_agreed boolean default false;
alter table registrations add column if not exists troute_customer_id text;
alter table registrations add column if not exists troute_payment_id text;

alter table registrations enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='registrations' and policyname='Public insert registrations') then
    create policy "Public insert registrations" on registrations for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='registrations' and policyname='Authenticated manage registrations') then
    create policy "Authenticated manage registrations" on registrations for all using (auth.role() = 'authenticated');
  end if;
end $$;
