# Cooperative Gig Services

A modern, community-powered gig platform connecting local workers with households and businesses through intelligent, fair and location-aware service matching.

## Smart India Hackathon 2026

**Problem Statement ID:** SIH26089  
**Organisation:** Ministry of Cooperation  
**Theme:** Cooperative Gig Services Platform for Household & Community Services

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
