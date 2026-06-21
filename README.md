# XoXoCafe — Booking + Deposit System

Table reservation and deposit collection for XoXoCafe, powered by Paddle.

## Features

- 4-step customer booking flow: service, time, details, payment
- Paddle-powered deposit collection (overlay checkout)
- Printable confirmation ticket with unique ticket number
- Dispatch board with live stats and booking management
- No-show / cancel / confirm status controls
- Fully client-side — no backend required for demo; bookings stored in localStorage

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Paddle credentials:

```bash
copy .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_client_token
NEXT_PUBLIC_PADDLE_SANDBOX=true  # set to false for production

NEXT_PUBLIC_PADDLE_PRICE_BRUNCH_CLASSIC=pri_xxxxxxxx
NEXT_PUBLIC_PADDLE_PRICE_BRUNCH_BOTTOMLESS=pri_xxxxxxxx
NEXT_PUBLIC_PADDLE_PRICE_AFTERNOON_TEA=pri_xxxxxxxx
NEXT_PUBLIC_PADDLE_PRICE_PRIVATE_DINING=pri_xxxxxxxx
```

### 3. Paddle Setup

1. Create a [Paddle account](https://www.paddle.com)
2. Go to **Developer Tools > Authentication** and copy your Client-side token
3. Go to **Catalog > Products** and create one product per service
4. For each product, create a **Price** — set it to the deposit amount (e.g., $10)
5. Copy each `pri_xxxx` Price ID into `.env.local`
6. For sandbox testing, use the sandbox dashboard at `sandbox-vendors.paddle.com`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push the project to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add the environment variables in **Settings > Environment Variables**
4. Deploy

> Set `NEXT_PUBLIC_PADDLE_SANDBOX=false` and use production Price IDs for live payments.

---

## Project Structure

```
app/
  layout.tsx       — root layout, loads Paddle.js CDN
  page.tsx         — tab switcher (Booking / Dispatch)
  globals.css      — brand tokens and base styles

components/
  Header.tsx            — brand header + tab nav
  BookingView.tsx        — 4-step booking shell
  ServicePicker.tsx      — service selection cards
  TimePicker.tsx         — date + time slot grid
  GuestForm.tsx          — guest details form
  PaymentPanel.tsx       — Paddle checkout integration
  ConfirmationTicket.tsx — post-payment ticket

lib/
  types.ts    — TypeScript interfaces
  data.ts     — service catalog, time slots, formatters
  storage.ts  — localStorage booking persistence
```
