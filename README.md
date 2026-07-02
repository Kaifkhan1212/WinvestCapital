# Winvest Capitals

Winvest Capitals is a premium, high-performance, responsive investment advisory and stock market research platform. Fully compliant with SEBI Research Analyst (RA) regulations, the platform delivers real-time market insights, interactive performance tracking, customizable plans, and live data-driven dashboards.

## Key Features

- **Meet The Market Expert**: An elegant, high-contrast spotlight section highlighting lead research analyst Shoeb Shaikh (SEBI Registration No: `INH000025124`), complete with professional credentials and integrated social media links.
- **Smart Advisory Form & WhatsApp Redirection**: A comprehensive, styled form designed to capture user inquiry details and seamlessly redirect to WhatsApp for immediate, personalized premium consulting.
- **Live Performance & Historical Track Records**: Beautiful interactive charting built with Recharts, enabling investors to inspect real-time trade signals, win rates, and target outcomes transparently.
- **Durable Accessibility Assistant**: Powerful side-drawer panel offering customizable contrast levels, zoom controls, highlighting, custom alignments, and speech assistant hooks, preserving preferences in client-side storage.
- **Real-Time AI Chat Assistant**: In-app AI chatbot powered by the server-side Gemini API providing real-time general market information and support.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

Clone or extract the project, then install the dependencies:

```bash
npm install
```

### Running Locally (Development Mode)

Start the combined Vite and Express development server:

```bash
npm run dev
```

The application will run locally on [http://localhost:3000](http://localhost:3000).

### Building for Production

Compile both the React client files and the bundled backend server:

```bash
npm run build
```

This will output static frontend assets inside `dist/` and a bundled production backend script `dist/server.cjs`.

### Production Execution

To run the production build locally or in a containerized environment:

```bash
npm run start
```

---

## Environment Variables

Copy the structure of `.env.example` into a new `.env` file and supply the correct credentials:

| Variable | Description | Required / Optional |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Server-side API Key for Gemini model features | Required for Chatbot AI |
| `APP_URL` | The base canonical URL where the app is hosted | Optional / Handled by server |
| `VITE_SUPABASE_URL` | Supabase API connection URL for client access | Required for DB actions |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anonymous Client Key | Required for DB actions |

---

## Deployment to Netlify

This project is fully configured for zero-config deployment to **Netlify** via GitHub:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Redirects**: Handled automatically via the included `netlify.toml` file to route standard single-page app (SPA) paths to `/index.html`.
