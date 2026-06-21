import { Service, TimeSlot } from "./types";

export const SERVICES: Service[] = [
  {
    id: "brunch-classic",
    name: "Classic Brunch Table",
    description: "Seated brunch service with full menu access. Perfect for small groups.",
    duration: "90 min",
    price: 45,
    deposit: 10,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_BRUNCH_CLASSIC ?? "pri_placeholder_01",
  },
  {
    id: "brunch-bottomless",
    name: "Bottomless Brunch",
    description: "Two hours of bottomless mimosas or bellinis with brunch plates.",
    duration: "120 min",
    price: 65,
    deposit: 15,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_BRUNCH_BOTTOMLESS ?? "pri_placeholder_02",
  },
  {
    id: "afternoon-tea",
    name: "Afternoon Tea",
    description: "Three-tiered afternoon tea with seasonal sandwiches, scones, and pastries.",
    duration: "75 min",
    price: 38,
    deposit: 10,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_AFTERNOON_TEA ?? "pri_placeholder_03",
  },
  {
    id: "private-dining",
    name: "Private Dining Room",
    description: "Exclusive use of our private dining room. Ideal for celebrations and events.",
    duration: "180 min",
    price: 120,
    deposit: 30,
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRIVATE_DINING ?? "pri_placeholder_04",
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { time: "09:00", label: "9:00 AM", available: true },
  { time: "09:30", label: "9:30 AM", available: true },
  { time: "10:00", label: "10:00 AM", available: true },
  { time: "10:30", label: "10:30 AM", available: true },
  { time: "11:00", label: "11:00 AM", available: true },
  { time: "11:30", label: "11:30 AM", available: true },
  { time: "12:00", label: "12:00 PM", available: true },
  { time: "12:30", label: "12:30 PM", available: true },
  { time: "13:00", label: "1:00 PM", available: true },
  { time: "13:30", label: "1:30 PM", available: true },
  { time: "14:00", label: "2:00 PM", available: true },
  { time: "14:30", label: "2:30 PM", available: true },
  { time: "15:00", label: "3:00 PM", available: true },
  { time: "15:30", label: "3:30 PM", available: true },
  { time: "16:00", label: "4:00 PM", available: true },
];

export function generateTicketNumber(): string {
  const prefix = "XO";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const slot = TIME_SLOTS.find((s) => s.time === time);
  return slot?.label ?? time;
}
