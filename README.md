# Welcome to my project

- Isizathu sokwe

# Isixhosa Inyanga Zonyaka (Ikhalenda)

A small React + TypeScript calendar application with Xhosa translations and event management. The project provides a calendar grid, event creation form, event list, Google Calendar integration, and Supabase-backed persistence. The UI uses a component library organized under src/ui and follows a Vite+React+TypeScript setup.

## Key features

- Monthly calendar grid view
- Create, edit and list events
- Google Calendar connect (OAuth integration)
- Supabase integration for storing events and user data
- Xhosa translations / localization utilities
- Reusable UI components under src/ui

## Tech stack

- Vite
- React + TypeScript
- Supabase (client present in src/integrations/supabase)
- ESLint + TypeScript config
- shadcn-style UI primitives pattern (components in src/ui)

## Getting started

Prerequisites

- Node.js 18+ (or compatible LTS)
- npm or yarn

Install dependencies

npm install

Run development server

npm run dev

Build

npm run build

Preview production build

npm run preview

## Environment variables

Create a .env or .env.local file at the project root with the values required by the integrations you use. Common variables expected by this project:

- VITE_SUPABASE_URL - Your Supabase project URL
- VITE_SUPABASE_ANON_KEY - Supabase anon public key
- VITE_GOOGLE_CLIENT_ID - (Optional) Google OAuth client ID for Calendar integration
- VITE_GOOGLE_API_KEY - (Optional) Google API key if used by any calendar APIs

Ensure these variables are available to Vite (prefix with VITE_).

## Project structure (src)

- components/ - React components used by the app
  - CalendarGrid.tsx - main calendar grid view
  - CalendarHeader.tsx - header and navigation for calendar
  - EventForm.tsx - form UI for creating/editing events
  - EventList.tsx - list of events for selected date
  - GoogleCalendarConnect.tsx - UI/logic to connect to Google Calendar
  - QuickNavigation.tsx, SelectedDateInfo.tsx - helper components

- components/ui/ - small UI primitives and wrappers (button, input, dialog, toast, etc.)

- hooks/ - custom hooks (mobile detection, toast wrapper)

- integrations/supabase/ - Supabase client and types

- lib/ - shared utilities

- pages/ - top-level route pages (Auth, Index, NotFound)

- types/ - TypeScript types used across the app

- utils/ - app-specific utils (e.g., Xhosa translations)

## Notes on development

- Linting: ESLint is configured to work with TypeScript in the repo (see eslint.config.js)
- Calendar behavior and translations are driven by locale utilities in src/utils/xhosaTranslations.ts
- Google Calendar integration requires proper OAuth credentials and redirect setup in the Google Cloud Console

## Deployment

Build with npm run build and deploy the generated `dist` folder to your static host. If you use server-side functions with Supabase, configure environment variables on your host and ensure CORS/redirect URIs match.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests and create pull requests for changes. Keep changes small and focused, and include clear commit messages.

## License

Add a LICENSE file to the project root if you intend to open-source this repository. If not specified, consider adding an OSI-approved license.

## Contact

For setup questions or issues, open an issue in the repository with reproduction steps and environment details.

