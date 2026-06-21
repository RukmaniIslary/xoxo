"use client";

import { Booking } from "@/lib/types";
import { SERVICES, formatCurrency, formatDate, formatTime } from "@/lib/data";

interface ConfirmationTicketProps {
  booking: Booking;
  onBookAnother: () => void;
}

export default function ConfirmationTicket({
  booking,
  onBookAnother,
}: ConfirmationTicketProps) {
  const service = SERVICES.find((s) => s.id === booking.serviceId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Ticket */}
      <div
        style={{
          border: "2px solid #000",
          borderRadius: 8,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Ticket header */}
        <div
          style={{
            background: "#000",
            color: "#fff",
            padding: "0.85rem 1.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", opacity: 0.85, textTransform: "uppercase" }}>
              Booking Confirmed
            </div>
            <div style={{ fontWeight: 700, fontSize: "1.05rem", marginTop: "0.15rem" }}>
              XoXoCafe
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7rem", opacity: 0.8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Ticket
            </div>
            <div style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "1rem" }}>
              {booking.ticketNumber}
            </div>
          </div>
        </div>

        {/* Ticket body */}
        <div style={{ padding: "1.2rem" }}>
          {/* Service + time */}
          <div
            style={{
              paddingBottom: "0.85rem",
              borderBottom: "1px dashed var(--brand-border)",
              marginBottom: "0.85rem",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "var(--brand-dark)",
                marginBottom: "0.25rem",
              }}
            >
              {service?.name}
            </div>
            <div style={{ fontSize: "0.88rem", color: "#444" }}>
              {formatDate(booking.date)} at {formatTime(booking.time)}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#777", marginTop: "0.15rem" }}>
              Party of {booking.partySize}
            </div>
          </div>

          {/* Guest details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.6rem 1rem",
              fontSize: "0.83rem",
            }}
          >
            <div>
              <div style={{ color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Guest
              </div>
              <div style={{ color: "var(--brand-dark)", fontWeight: 600, marginTop: "0.1rem" }}>
                {booking.guestName}
              </div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Phone
              </div>
              <div style={{ color: "var(--brand-dark)", fontWeight: 600, marginTop: "0.1rem" }}>
                {booking.phone}
              </div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Email
              </div>
              <div style={{ color: "var(--brand-dark)", fontWeight: 600, marginTop: "0.1rem" }}>
                {booking.email}
              </div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Deposit Paid
              </div>
              <div
                style={{
                  color: "#000",
                  fontWeight: 700,
                  marginTop: "0.1rem",
                  fontSize: "0.95rem",
                }}
              >
                {formatCurrency(booking.depositPaid)}
              </div>
            </div>
          </div>

          {booking.notes && (
            <div
              style={{
                marginTop: "0.85rem",
                padding: "0.6rem 0.75rem",
                background: "var(--brand-muted)",
                borderRadius: 4,
                fontSize: "0.82rem",
                color: "#555",
              }}
            >
              <span style={{ fontWeight: 600 }}>Notes:</span> {booking.notes}
            </div>
          )}
        </div>

        {/* Ticket footer */}
        <div
          style={{
            background: "var(--brand-muted)",
            borderTop: "1px dashed var(--brand-border)",
            padding: "0.7rem 1.2rem",
            fontSize: "0.75rem",
            color: "#666",
            lineHeight: 1.5,
          }}
        >
          No-shows forfeit the deposit. Reschedule free up to 24 hours before your
          slot — call or text the number in your confirmation email.
        </div>
      </div>

      <p
        style={{
          fontSize: "0.78rem",
          color: "#888",
          textAlign: "center",
          margin: 0,
        }}
      >
        A copy of this confirmation has been sent to your dispatch board.
      </p>

      <button
        onClick={onBookAnother}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: 6,
          border: "2px solid #000",
          background: "#fff",
          color: "#000",
          fontWeight: 700,
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        Book Another Appointment
      </button>
    </div>
  );
}
