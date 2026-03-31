## smarthire

smarthire - Smart Hiring Assistant

This project uses Next.js, Tailwind CSS, MongoDB-backed authentication, and JWT cookies.

## Getting started

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment setup

This project now uses a single env file:

- `.env.local`

Configured MongoDB URI:

```bash
MONGODB_URI=mongodb+srv://mukulkumar_db:mukulkumar_db@mukul.4irialc.mongodb.net/smarthire?retryWrites=true&w=majority&appName=Mukul
```

Other active variables in `.env.local`:

```bash
MONGODB_DB_NAME=smarthire
JWT_SECRET=smarthire-development-secret-key-change-this
```

## Current auth flow

- Interviewer admin login is enabled
- Candidate signup and candidate login are enabled
- MongoDB stores both `interviewer` and `candidate` users
- Default user documents are seeded directly into MongoDB, not loaded from env

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
- `npm run seed:users` - insert default interviewer and candidate documents into MongoDB
