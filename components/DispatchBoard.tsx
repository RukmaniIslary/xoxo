"use client";

import { useState, useEffect } from "react";
import { Booking } from "@/lib/types";
import { SERVICES, formatCurrency, formatDate, formatTime } from "@/lib/data";
import { getBookings, updateBookingStatus } from "@/lib/storage";

const STATUS_COLORS: Record<Booking["status"], { bg: string; text: string; label: string }> = {
  confirmed: { bg: "#dcfce7", text: "#166534", label: "Confirmed" },
  pending: { bg: "#fef9c3", text: "#854d0e", label: "Pending" },
  "no-show": { bg: "#fee2e2", text: "#991b1b", label: "No-show" },
  cancelled: { bg: "#f3f4f6", text: "#4b5563", label: "Cancelled" },
};

function StatBox({
  value,
  label,
  sub,
}: {
  value: string | number;
  label: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--brand-border)",
        borderRadius: 8,
        padding: "1rem 1.25rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          color: "#000",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: "#555",
          marginTop: "0.3rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: "0.25rem" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function DispatchBoard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<Booking["status"] | "all">("all");

  useEffect(() => {
    setBookings(getBookings().reverse());
  }, []);

  const refresh = () => {
    setBookings(getBookings().reverse());
  };

  const handleStatusChange = (ticketNumber: string, status: Booking["status"]) => {
    updateBookingStatus(ticketNumber, status);
    refresh();
  };

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const weekBookings = bookings.filter((b) => {
    const d = new Date(b.date + "T12:00:00");
    return d >= startOfWeek && d < endOfWeek;
  });

  const depositsCollected = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.depositPaid, 0);

  const noShowsPrevented = Math.round(
    weekBookings.filter((b) => b.status === "confirmed").length * 0.3
  );

  const filtered =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  return (
    <div
      style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1.25rem" }}
    >
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatBox value={weekBookings.length} label="Bookings this week" />
        <StatBox value={formatCurrency(depositsCollected)} label="Deposits collected" />
        <StatBox
          value={noShowsPrevented}
          label="No-shows prevented"
          sub="est. from industry averages — live tracking once deposits are required"
        />
      </div>

      {/* Filter + header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--brand-dark)",
          }}
        >
          Upcoming Jobs
        </h2>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {(["all", "confirmed", "pending", "no-show", "cancelled"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: "0.3rem 0.7rem",
                  borderRadius: 4,
                  border: "1px solid",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "capitalize",
                  cursor: "pointer",
                  background: filterStatus === s ? "var(--brand-dark)" : "#fff",
                  borderColor:
                    filterStatus === s ? "var(--brand-dark)" : "var(--brand-border)",
                  color: filterStatus === s ? "#fff" : "#555",
                }}
              >
                {s}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--brand-border)",
            borderRadius: 8,
            padding: "2.5rem",
            textAlign: "center",
            color: "#aaa",
            fontSize: "0.9rem",
          }}
        >
          No bookings yet. Confirmed bookings will appear here.
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--brand-border)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {filtered.map((booking, idx) => {
            const service = SERVICES.find((s) => s.id === booking.serviceId);
            const statusStyle = STATUS_COLORS[booking.status];
            return (
              <div
                key={booking.ticketNumber}
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom:
                    idx < filtered.length - 1
                      ? "1px solid var(--brand-border)"
                      : "none",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "0 1.25rem",
                  alignItems: "start",
                }}
              >
                {/* Ticket + date */}
                <div style={{ minWidth: 120 }}>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      color: "var(--brand-dark)",
                    }}
                  >
                    {booking.ticketNumber}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#888", marginTop: "0.2rem" }}>
                    {formatDate(booking.date)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#888" }}>
                    {formatTime(booking.time)}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--brand-dark)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {booking.guestName}
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#888",
                        marginLeft: "0.5rem",
                        fontSize: "0.82rem",
                      }}
                    >
                      party of {booking.partySize}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#555", marginTop: "0.1rem" }}>
                    {service?.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#888", marginTop: "0.1rem" }}>
                    {booking.phone} &bull; {booking.email}
                  </div>
                  {booking.notes && (
                    <div
                      style={{
                        fontSize: "0.76rem",
                        color: "#999",
                        fontStyle: "italic",
                        marginTop: "0.15rem",
                      }}
                    >
                      {booking.notes}
                    </div>
                  )}
                </div>

                {/* Status + deposit */}
                <div style={{ textAlign: "right", minWidth: 130 }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "0.2rem 0.6rem",
                      borderRadius: 20,
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {statusStyle.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#000",
                    }}
                  >
                    {formatCurrency(booking.depositPaid)}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#aaa" }}>deposit</div>

                  {/* Quick actions */}
                  <div
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      gap: "0.3rem",
                      justifyContent: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    {booking.status !== "no-show" && (
                      <button
                        onClick={() =>
                          handleStatusChange(booking.ticketNumber, "no-show")
                        }
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.2rem 0.45rem",
                          borderRadius: 3,
                          border: "1px solid #fca5a5",
                          background: "#fff",
                          color: "#b91c1c",
                          cursor: "pointer",
                        }}
                      >
                        No-show
                      </button>
                    )}
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() =>
                          handleStatusChange(booking.ticketNumber, "confirmed")
                        }
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.2rem 0.45rem",
                          borderRadius: 3,
                          border: "1px solid #86efac",
                          background: "#fff",
                          color: "#166534",
                          cursor: "pointer",
                        }}
                      >
                        Confirm
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          handleStatusChange(booking.ticketNumber, "cancelled")
                        }
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.2rem 0.45rem",
                          borderRadius: 3,
                          border: "1px solid #d1d5db",
                          background: "#fff",
                          color: "#6b7280",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
