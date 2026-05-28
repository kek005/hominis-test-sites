# hominis-test-sites

Controlled demo environments for evaluating autonomous visual UI agents (Hominis).

These are self-contained, fake websites built specifically to test and benchmark
agents that interact with GUIs the way humans do — clicking, typing, scrolling,
and reading the screen visually. Running tests against these sites avoids the
legal, ethical, and reliability risks of pointing an agent at production third-party
services.

## Layout

| Folder      | Purpose                                              |
|-------------|------------------------------------------------------|
| `ecommerce/`| Storefront, cart, checkout, order history, admin     |
| `careers/`  | Job listings, application forms, applicant tracking  |
| `banking/`  | Account dashboard, transfers, statements             |
| `crm/`      | Contacts, deals, pipeline, notes                     |
| `admin/`    | Generic admin panel with tables, filters, modals     |

Each folder is independent and can be developed, deployed, and torn down on its own.

## Design goals

- **Realistic but synthetic** — modern UI patterns, seeded fake data, no real users.
- **Intentional friction** — popups, loading states, validation errors, occasional
  layout changes — so agents are tested against the messiness of real software.
- **Reproducible** — every site is dockerized and seeded deterministically so a
  given test scenario can be re-run.
- **Independent** — environments don't share databases, auth, or state.

## Status

Scaffolding only. Sites will be generated incrementally.
