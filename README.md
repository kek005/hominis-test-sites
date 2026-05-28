# hominis-test-sites

Controlled demo environments for evaluating autonomous visual UI agents (Hominis).

These are self-contained, fake websites built specifically to test and benchmark
agents that interact with GUIs the way humans do — clicking, typing, scrolling,
and reading the screen visually. Running tests against these sites avoids the
legal, ethical, and reliability risks of pointing an agent at production third-party
services.

## Layout

| Folder       | Purpose                                              |
|--------------|------------------------------------------------------|
| `ecommerce/` | Storefront, cart, checkout, order history, account   |
| `careers/`   | Job listings, multi-step application, company page   |
| `banking/`   | Accounts, transfers, bill pay, cards, insights       |
| `crm/`       | Contacts, companies, deal pipeline, activities       |
| `admin/`     | Admin panel with data table, audit log, roles, billing |
| `travel/`    | Flight + hotel booking with seat maps and trips      |
| `tickets/`   | Event tickets with seat selection and checkout       |
| `insurance/` | Policies, claim + quote wizards, payments, documents |
| `hospital/`  | Clinical staff dashboard: patients, beds, appointments |

Each folder is independent and can be developed, deployed, and torn down on its own.

## Design goals

- **Realistic but synthetic** — modern UI patterns, seeded fake data, no real users.
- **Intentional friction** — popups, loading states, validation errors, occasional
  layout changes — so agents are tested against the messiness of real software.
- **Reproducible** — every site is dockerized and seeded deterministically so a
  given test scenario can be re-run.
- **Independent** — environments don't share databases, auth, or state.

## Running the sites

Each site is an independent Vite + React + Tailwind app. To boot the landing
page and all nine sites at once:

```bash
./start.sh
```

Then open the landing page at **http://localhost:5000** and follow the links.
Press `Ctrl+C` to stop everything. Per-site logs are written to `./logs/`.

| Site              | Port | URL                   |
|-------------------|------|-----------------------|
| Landing page      | 5000 | http://localhost:5000 |
| Nimbus Store      | 5001 | http://localhost:5001 |
| Northwind Careers | 5002 | http://localhost:5002 |
| Meridian Bank     | 5003 | http://localhost:5003 |
| Pipeline CRM      | 5004 | http://localhost:5004 |
| Console Admin     | 5005 | http://localhost:5005 |
| Voyage Travel     | 5006 | http://localhost:5006 |
| Showtime Tickets  | 5007 | http://localhost:5007 |
| Assure Insurance  | 5008 | http://localhost:5008 |
| Pulse Hospital    | 5009 | http://localhost:5009 |

To run a single site on its own:

```bash
cd banking && npm run dev   # already has deps installed
```

## Demo credentials

Sites with a login accept **`demo@hominis.test`** / **`password`**.
Banking, CRM, Admin, Insurance, and Hospital require sign-in; the store,
careers, travel, and tickets sites are open.

## Resetting state

State persists in the browser's `localStorage`. Use the **“Reset demo”** control
in each site's navigation (or clear site data) to restore the original seeded
state before re-running a scenario.

## Smoke tests

Headless Playwright smoke tests verify each site renders and a core flow works.
With the sites running (`./start.sh` in another terminal):

```bash
cd tests && npm install && npx playwright install chromium   # first time only
npx playwright test
```

## Status

All nine sites + landing page are built and runnable via `./start.sh`,
with Playwright smoke tests covering each site's core flows.
