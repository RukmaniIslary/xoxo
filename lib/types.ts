export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  deposit: number;
  paddlePriceId: string;
}

export interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  guestName: string;
  phone: string;
  email: string;
  partySize: number;
  notes: string;
}

export interface Booking extends BookingFormData {
  id: string;
  ticketNumber: string;
  depositPaid: number;
  status: "confirmed" | "pending" | "no-show" | "cancelled";
  createdAt: string;
  paddleTransactionId?: string;
}

export interface DispatchStats {
  bookingsThisWeek: number;
  depositsCollected: number;
  noShowsPrevented: number;
}
