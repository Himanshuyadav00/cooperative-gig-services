# Cooperative Gig Services

A modern, community-powered gig platform connecting local workers with households and businesses through intelligent, fair and location-aware service matching.

## Smart India Hackathon 2026

**Problem Statement ID:** SIH26089  
**Organisation:** Ministry of Cooperation  
**Theme:** Cooperative Gig Services Platform for Household & Community Services

## Firebase authentication

The app is wired to a real Firebase Auth backend. To enable sign-in, create a Firebase project and add your web app config values to a local `.env` file before running the app.

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Email/Password sign-in under Authentication → Sign-in method
3. Add a web app to the project and copy the config values
4. Create a `.env` file in the project root based on `.env.example`

Example:

```bash
cp .env.example .env
```

Then update `.env` with your Firebase values:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Once configured, the Sign in button will authenticate against Firebase instead of using a local mock state.

## Local development

1. Install dependencies:
   npm install
2. Start the Vite dev server:
   npm run dev -- --host 0.0.0.0
3. Open the local URL shown in the terminal (usually http://localhost:5173)

## Problem

Households looking for local services and workers looking for jobs rarely find each other efficiently. This mismatch wastes time, increases travel, and can lead to uneven worker utilisation.

## Solution

Cooperative Gig Services is a two-sided matching platform that connects service requests with suitable available workers using:

- **Skill** — matches worker capabilities with the requested service.
- **Distance** — prioritises suitable workers who are closer to the request.
- **Availability** — considers whether a worker is currently available.
- **Fairness** — helps distribute opportunities across the worker pool.

## Matching Model

```text
Utility Score =
0.50 × Skill Fit
+ 0.30 × Distance Score
+ 0.20 × Availability
```

The matching system can be evaluated against a **nearest-available baseline** using:

- Match acceptance rate
- Mean travel distance
- Worker-utilisation fairness

## Project Objectives

1. Build a two-sided matcher for service requests and available workers.
2. Evaluate at least **1,000 simulated requests** against **200 worker profiles**.
3. Compare the matcher with a nearest-available baseline.
4. Analyse acceptance, travel distance and worker-utilisation fairness.

## Features

- Modern responsive landing page
- Worker and business user journeys
- Interactive service-matching concept
- Skill, distance and availability based matching
- Fairness-focused worker allocation
- Community-oriented platform design
- Mobile-friendly interface
- GitHub Pages-ready deployment

## Tech Stack

- React
- JavaScript / JSX
- Vite
- CSS3
- Responsive Web Design

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

The production files are generated in the `dist/` directory.

## Project Structure

```text
src/
├── assets/
├── App.jsx
├── App.css
├── index.css
└── main.jsx

public/
├── favicon.svg
└── icons.svg

index.html
package.json
vite.config.js
README.md
```

## Future Scope

- Real-time GPS-based matching
- Worker registration and verification
- User authentication
- Booking and scheduling
- Ratings and reviews
- Online payments
- Notifications
- Backend database and APIs
- AI/ML-based worker ranking
- Advanced fairness and utilisation analytics

## SIH Reference

Smart India Hackathon 2026 — **SIH26089**

Official portal:  
https://sih.gov.in/sih2026PS

## Developer

**Himanshu Yadav**

GitHub:  
https://github.com/Himanshuyadav00

---

Built as a Smart India Hackathon 2026 project prototype.

Additional files:

- `src/firebase.js` – Firebase configuration and auth helpers
- `.env.example` – required Firebase environment variable names
- `vite.config.js` – Vite config with a relative base path for deployability
