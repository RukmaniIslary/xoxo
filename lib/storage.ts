import { Booking } from "./types";

const STORAGE_KEY = "xoxocafe_bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  if (typeof window === "undefined") return;
  const existing = getBookings();
  existing.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function updateBookingStatus(
  ticketNumber: string,
  status: Booking["status"]
): void {
  if (typeof window === "undefined") return;
  const bookings = getBookings();
  const idx = bookings.findIndex((b) => b.ticketNumber === ticketNumber);
  if (idx !== -1) {
    bookings[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function getWeekBookings(): Booking[] {
  const bookings = getBookings();
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return bookings.filter((b) => {
    const d = new Date(b.date + "T12:00:00");
    return d >= startOfWeek && d < endOfWeek;
  });
}
