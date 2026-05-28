// Deterministic seed data for Pipeline CRM.

export const DEMO_USER = { email: 'demo@hominis.test', password: 'password', name: 'Riley Chen' }

export const STAGES = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won']

export const CONTACTS = [
  { id: 'c1', name: 'Amara Okafor', title: 'VP Engineering', company: 'Lumen Labs', email: 'amara@lumenlabs.io', phone: '(415) 555-0142' },
  { id: 'c2', name: 'Diego Martins', title: 'Head of Ops', company: 'Brightwave', email: 'diego@brightwave.co', phone: '(512) 555-0198' },
  { id: 'c3', name: 'Sophie Tremblay', title: 'CTO', company: 'Northstar Health', email: 'sophie@northstar.health', phone: '(212) 555-0177' },
  { id: 'c4', name: 'Marcus Bell', title: 'Procurement Lead', company: 'Atlas Freight', email: 'marcus@atlasfreight.com', phone: '(312) 555-0123' },
  { id: 'c5', name: 'Yuki Tanaka', title: 'Product Director', company: 'Kite & Co', email: 'yuki@kite.co', phone: '(206) 555-0156' },
  { id: 'c6', name: 'Fatima Al-Rashid', title: 'CEO', company: 'Verda Energy', email: 'fatima@verda.energy', phone: '(617) 555-0188' },
  { id: 'c7', name: 'Liam O’Connor', title: 'IT Manager', company: 'Pinecrest Schools', email: 'liam@pinecrest.edu', phone: '(503) 555-0133' },
  { id: 'c8', name: 'Priya Nair', title: 'Finance Director', company: 'Cobalt Retail', email: 'priya@cobalt.shop', phone: '(646) 555-0109' },
  { id: 'c9', name: 'Tom Becker', title: 'Founder', company: 'Drift Studios', email: 'tom@driftstudios.tv', phone: '(323) 555-0190' },
  { id: 'c10', name: 'Hannah Kim', title: 'Ops Manager', company: 'Maple & Stone', email: 'hannah@mapleandstone.com', phone: '(917) 555-0164' },
]

export const DEALS = [
  { id: 'd1', title: 'Lumen Labs — Platform license', company: 'Lumen Labs', contactId: 'c1', value: 48000, stage: 'Qualified', owner: 'Riley Chen', close: '2026-07-15',
    notes: [{ id: 'n1', at: '2026-05-20', text: 'Intro call went well. Looping in their security team.' }] },
  { id: 'd2', title: 'Brightwave — Annual plan', company: 'Brightwave', contactId: 'c2', value: 22000, stage: 'Proposal', owner: 'Riley Chen', close: '2026-06-30',
    notes: [{ id: 'n2', at: '2026-05-18', text: 'Sent proposal v2 with the ops add-on.' }] },
  { id: 'd3', title: 'Northstar Health — Enterprise', company: 'Northstar Health', contactId: 'c3', value: 120000, stage: 'Negotiation', owner: 'Riley Chen', close: '2026-06-20',
    notes: [{ id: 'n3', at: '2026-05-22', text: 'Negotiating multi-year discount. Legal reviewing MSA.' }] },
  { id: 'd4', title: 'Atlas Freight — Pilot', company: 'Atlas Freight', contactId: 'c4', value: 15000, stage: 'Lead', owner: 'Riley Chen', close: '2026-08-01', notes: [] },
  { id: 'd5', title: 'Kite & Co — Team seats', company: 'Kite & Co', contactId: 'c5', value: 9500, stage: 'Lead', owner: 'Riley Chen', close: '2026-08-10', notes: [] },
  { id: 'd6', title: 'Verda Energy — Platform', company: 'Verda Energy', contactId: 'c6', value: 76000, stage: 'Qualified', owner: 'Riley Chen', close: '2026-07-05',
    notes: [{ id: 'n4', at: '2026-05-15', text: 'Strong exec sponsor. Budget approved for Q3.' }] },
  { id: 'd7', title: 'Pinecrest Schools — District deal', company: 'Pinecrest Schools', contactId: 'c7', value: 31000, stage: 'Proposal', owner: 'Riley Chen', close: '2026-07-22', notes: [] },
  { id: 'd8', title: 'Cobalt Retail — Renewal + upsell', company: 'Cobalt Retail', contactId: 'c8', value: 54000, stage: 'Won', owner: 'Riley Chen', close: '2026-05-10',
    notes: [{ id: 'n5', at: '2026-05-10', text: 'Closed! Upsold analytics module. Kickoff next week.' }] },
  { id: 'd9', title: 'Drift Studios — Creator tier', company: 'Drift Studios', contactId: 'c9', value: 6800, stage: 'Negotiation', owner: 'Riley Chen', close: '2026-06-12', notes: [] },
  { id: 'd10', title: 'Maple & Stone — Starter', company: 'Maple & Stone', contactId: 'c10', value: 4200, stage: 'Won', owner: 'Riley Chen', close: '2026-04-28', notes: [] },
]
