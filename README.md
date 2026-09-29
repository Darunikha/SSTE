# Sri Sastha Textile Engineering

A full-stack web application for Sri Sastha Textile Engineering, a Coimbatore-based provider of spare parts, electronic servicing, and industrial automation support for textile machinery. The project pairs a React (Vite) marketing site and quote-request pipeline with a Node.js/Express/MongoDB backend for managing inbound leads and newsletter subscribers.

## What's Inside

- **Public site** — services, expertise, team, and FAQ content, plus a quote-request form that emails the team and stores every inquiry.
- **Admin portal** — a JWT-authenticated dashboard for reviewing quote requests, updating their status, and viewing newsletter subscribers.
- **Resilient backend** — if MongoDB isn't reachable, the API transparently falls back to in-memory data, so the site, forms, and demo admin login keep working during local development without any database setup.

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Axios
- Context API for authentication and toast notifications
- A plain CSS design system (`global.css`) built on CSS custom properties

**Backend**
- Node.js + Express, organized as MVC
- MongoDB via Mongoose, with automatic mock-data fallback when no database is available
- JWT authentication with bcrypt password hashing
- Helmet, CORS, Morgan, dotenv
- Nodemailer for quote-request email notifications

## Project Structure

```
SSTE/
├── frontend/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/images/logo.svg
│   │   ├── components/        # Navbar, Footer, Hero, ServiceCard, TeamCard, forms, etc.
│   │   ├── pages/              # HomePage, LoginPage, RegisterPage, DashboardPage, NotFoundPage
│   │   ├── layouts/MainLayout.jsx
│   │   ├── services/api.js     # Axios client + API calls
│   │   ├── context/             # AuthContext, ToastContext
│   │   ├── routes/AppRoutes.jsx
│   │   ├── styles/global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/db.js
│   ├── controllers/            # auth, quote, newsletter, data
│   ├── middleware/              # auth, error handling
│   ├── models/                  # User, Quote, Newsletter, Service, Stat, TeamMember, FAQ
│   ├── routes/
│   ├── utils/
│   │   ├── seedData.js         # Fallback content served when the database is empty or unreachable
│   │   └── sendEmail.js
│   ├── server.js
│   ├── package.json
│   └── .env                    # Not committed — see Environment Variables below
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB (optional — the backend runs in mock-data mode without it)

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The API starts at `http://localhost:5000`.

### 2. Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app starts at `http://localhost:5173` and proxies `/api` requests to the backend during development.

## Environment Variables

`backend/.env` is git-ignored and must be created locally. All variables are optional — the app degrades gracefully without them — but several are required for real (non-demo) behavior:

| Variable | Purpose | Default if unset |
|---|---|---|
| `PORT` | Backend port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/srisastha_db`; falls back to in-memory data if unreachable |
| `CLIENT_URL` | Allowed CORS origin | `*` |
| `JWT_SECRET` | Signing secret for admin auth tokens | An insecure built-in fallback — **set this explicitly for any real deployment** |
| `JWT_EXPIRE` | Admin token lifetime | `30d` |
| `SMTP_HOST` | SMTP host for quote-notification emails | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | — (email sending is skipped if unset; quotes are still saved) |
| `SMTP_PASS` | SMTP password or app password | — |
| `FROM_EMAIL` | "From" address on outbound notification emails | `"Sri Sastha Website" <SMTP_USER>` |
| `NOTIFICATION_EMAIL` | Recipient for new quote-request alerts | `SMTP_USER` |

## Demo Admin Access

To sign in to the Admin Control Center (`/dashboard`):

- **URL:** `http://localhost:5173/login`
- **Email:** `admin@srisastha.com`
- **Password:** `admin123`

This demo account works even without MongoDB connected.

## API Reference

**Authentication**
- `POST /api/auth/register` — Register a new admin account
- `POST /api/auth/login` — Log in and receive a JWT
- `GET /api/auth/me` — Verify the authenticated user's profile

**Quotes**
- `POST /api/quotes` — Submit a quote request (public)
- `GET /api/quotes` — List submitted quotes (admin)
- `PUT /api/quotes/:id` — Update a quote's status (admin)
- `DELETE /api/quotes/:id` — Delete a quote (admin)

**Newsletter**
- `POST /api/newsletter` — Subscribe to email updates (public)
- `GET /api/newsletter` — List subscribers (admin)

**Site content**
- `GET /api/services` — Core services
- `GET /api/expertise` — Areas of expertise
- `GET /api/stats` — Key metrics
- `GET /api/team` — Team directory
- `GET /api/faqs` — Frequently asked questions

## License

© 2026 Sri Sastha Textile Engineering. All rights reserved.

## Deploying the frontend to Vercel

The frontend (`frontend/`) deploys to Vercel as a static Vite site; the Express API is hosted separately (for example on Render using `render.yaml`).

1. **Deploy the backend first** and note its URL, e.g. `https://sri-sastha-api.onrender.com`. Set its `CLIENT_URL` env var to your Vercel URL (comma-separate several origins, e.g. `https://your-site.vercel.app,https://www.yourdomain.com`).
2. **Import the repo in Vercel** and set **Root Directory** to `frontend`. The included `frontend/vercel.json` sets the Vite build, SPA rewrites (so `/catalog`, `/privacy`, `/terms`, `/cookies` and `/warranty` work on refresh), cache and security headers.
3. **Add an environment variable** in Vercel: `VITE_API_URL` = your backend URL (with or without a trailing `/api`). Redeploy after changing it, because Vite bakes it in at build time.
4. Open the site and check that services, stats, the catalog and the quote form load.

Local development is unchanged: leave `VITE_API_URL` empty and Vite proxies `/api` to `http://localhost:5001`. See `frontend/.env.example`.
