# CHARCHIT PANCHAL — Developer Portfolio

Premium full-stack portfolio built with **Next.js 14**, **React**, **Tailwind CSS**, **Framer Motion**, **Express.js**, and **MongoDB**.

## Features

- Hero with typing animation, resume download, and project link modal
- About, Skills (progress bars + icons), Projects (cards + modals)
- System design flowchart + “How This Was Built” modal
- Contact form (validation, toast notifications, MongoDB + Nodemailer)
- Dark/light mode, particles, loading screen, scroll progress, custom cursor
- Hidden admin dashboard at `/admin` (projects, skills, messages)
- SEO metadata and `robots.txt`

## Folder Structure

```
portfolio-website/
├── frontend/                    # Next.js 14 (App Router)
│   ├── public/
│   │   └── resume.pdf
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/page.tsx   # Hidden admin panel
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── robots.ts
│   │   ├── components/
│   │   │   ├── effects/         # Loading, particles, cursor, scroll
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── providers/
│   │   │   ├── sections/        # Hero, About, Skills, Projects, etc.
│   │   │   └── ui/              # Modal
│   │   ├── data/defaults.ts
│   │   ├── hooks/useTypingEffect.ts
│   │   └── lib/api.ts
│   ├── .env.local.example
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── middleware/auth.js
│   │   ├── models/              # Project, Skill, Contact, Admin
│   │   ├── routes/              # contact, projects, skills, admin
│   │   ├── services/mailer.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail App Password (or other SMTP) for contact emails

## Local Setup

### 1. Backend

```bash
cd portfolio-website/backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, SMTP settings
npm install
npm run seed    # Seeds skills, projects, and admin user
npm run dev     # http://localhost:5000
```

### 2. Frontend

```bash
cd portfolio-website/frontend
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev     # http://localhost:3000
```

### 3. Admin Panel

- URL: `http://localhost:3000/admin`
- Login with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from backend `.env`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/contact` | No | Submit contact form |
| GET | `/api/contact` | Yes | List messages |
| GET | `/api/projects` | No | Public projects |
| GET/POST/PUT/DELETE | `/api/projects/*` | Yes | Admin CRUD |
| GET/POST/PUT/DELETE | `/api/skills/*` | Mixed | Skills management |
| POST | `/api/admin/login` | No | Admin JWT login |

## Email Options

**Primary (included):** Nodemailer on the backend — configure `SMTP_*` in `backend/.env`.

**Alternative:** [EmailJS](https://www.emailjs.com/) on the frontend — install `@emailjs/browser`, add service/template keys, and call from `Contact.tsx` instead of (or in addition to) the API.

## Deployment

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Database Access → create user with password.
3. Network Access → allow `0.0.0.0/0` (or Render/Vercel IPs).
4. Connect → copy connection string → set `MONGODB_URI` in Render.

### Backend on Render

1. Push repo to GitHub.
2. [Render Dashboard](https://dashboard.render.com) → **New Web Service**.
3. Root directory: `portfolio-website/backend`
4. Build: `npm install`
5. Start: `npm start`
6. Environment variables from `.env.example` (use production `CLIENT_URL`, strong `JWT_SECRET`).
7. Run seed once via Render shell: `npm run seed`

### Frontend on Vercel

1. Import GitHub repo on [vercel.com](https://vercel.com).
2. Root directory: `portfolio-website/frontend`
3. Environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api`
   - `NEXT_PUBLIC_RESUME_URL=/resume.pdf`
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
4. Deploy.

Update `CLIENT_URL` on Render to your Vercel URL (e.g. `https://your-app.vercel.app`).

## Customization

- Replace `public/resume.pdf` with your real resume.
- Update social links in `Footer.tsx` and `Hero.tsx`.
- Add project images and GitHub/live URLs via admin or `seed.js`.
- Set `robots.ts` `disallow` to keep `/admin` private.

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| frontend | `npm run dev` | Development server |
| frontend | `npm run build` | Production build |
| backend | `npm run dev` | API with watch |
| backend | `npm run seed` | Seed DB |

## License

MIT — © CHARCHIT PANCHAL
