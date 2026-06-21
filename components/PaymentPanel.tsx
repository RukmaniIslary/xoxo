"use client";

import { useState, useEffect } from "react";
import { Service, BookingFormData, Booking } from "@/lib/types";
import { formatCurrency, generateTicketNumber, formatDate, formatTime } from "@/lib/data";
import { saveBooking } from "@/lib/storage";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Paddle?: any;
  }
}

interface PaymentPanelProps {
  service: Service | null;
  formData: BookingFormData;
  formValid: boolean;
  onSuccess: (booking: Booking) => void;
}

export default function PaymentPanel({
  service,
  formData,
  formValid,
  onSuccess,
}: PaymentPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paddleReady, setPaddleReady] = useState(false);

  useEffect(() => {
    const checkPaddle = setInterval(() => {
      if (window.Paddle) {
        const clientToken =
          process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
        const isSandbox =
          process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true";

        try {
          if (isSandbox) {
            window.Paddle.Environment.set("sandbox");
          }
          window.Paddle.Initialize({ token: clientToken });
          setPaddleReady(true);
        } catch {
          // Already initialized
          setPaddleReady(true);
        }
        clearInterval(checkPaddle);
      }
    }, 200);

    return () => clearInterval(checkPaddle);
  }, []);

  const handlePay = () => {
    if (!service || !formValid || !paddleReady) return;
    setError(null);
    setLoading(true);

    const ticketNumber = generateTicketNumber();

    try {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: service.paddlePriceId,
            quantity: 1,
          },
        ],
        customer: {
          email: formData.email,
        },
        customData: {
          ticketNumber,
          serviceId: formData.serviceId,
          date: formData.date,
          time: formData.time,
          guestName: formData.guestName,
          phone: formData.phone,
          partySize: formData.partySize,
        },
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
          successUrl: window.location.href,
        },
        eventCallback: (data: { name: string; data?: { transaction_id?: string } }) => {
          if (data.name === "checkout.completed") {
            const booking: Booking = {
              ...formData,
              id: crypto.randomUUID(),
              ticketNumber,
              depositPaid: service.deposit,
              status: "confirmed",
              createdAt: new Date().toISOString(),
              paddleTransactionId: data.data?.transaction_id,
            };
            saveBooking(booking);
            setLoading(false);
            onSuccess(booking);
          }
          if (data.name === "checkout.closed") {
            setLoading(false);
          }
          if (data.name === "checkout.error") {
            setError("Payment failed. Please try again.");
            setLoading(false);
          }
        },
      });
    } catch {
      setError("Unable to open payment. Please refresh and try again.");
      setLoading(false);
    }
  };

  const canPay = service && formValid && paddleReady && !loading;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Order summary */}
      <div
        style={{
          background: "var(--brand-muted)",
          border: "1px solid var(--brand-border)",
          borderRadius: 6,
          padding: "1rem 1.1rem",
        }}
      >
        {service ? (
          <>
            <div
              style={{
                fontWeight: 700,
                color: "var(--brand-dark)",
                marginBottom: "0.5rem",
                fontSize: "0.95rem",
              }}
            >
              {service.name}
            </div>
            {formData.date && formData.time && (
              <div style={{ fontSize: "0.83rem", color: "#555", marginBottom: "0.4rem" }}>
                {formatDate(formData.date)} at {formatTime(formData.time)}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "0.6rem",
                borderTop: "1px solid var(--brand-border)",
                marginTop: "0.4rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "#555" }}>
                Deposit due now
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "var(--brand-primary)",
                }}
              >
                {formatCurrency(service.deposit)}
              </span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#777", marginTop: "0.4rem" }}>
              Applied to your total at the appointment. Refunded in full if you
              reschedule more than 24 hours before your slot.
            </div>
          </>
        ) : (
          <div style={{ color: "#999", fontSize: "0.88rem" }}>
            Select a service above to see your deposit amount.
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: "0.6rem 0.85rem",
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: 5,
            fontSize: "0.85rem",
            color: "#b91c1c",
          }}
        >
          {error}
        </div>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={!canPay}
        style={{
          width: "100%",
          padding: "0.85rem",
          borderRadius: 6,
          border: "none",
          background: canPay ? "var(--brand-primary)" : "#ccc",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.03em",
          cursor: canPay ? "pointer" : "not-allowed",
          transition: "background 0.15s",
        }}
      >
        {loading
          ? "Opening payment..."
          : `Pay Deposit${service ? ` — ${formatCurrency(service.deposit)}` : ""} & Confirm`}
      </button>

      <p style={{ fontSize: "0.75rem", color: "#888", textAlign: "center", margin: 0 }}>
        Secured by{" "}
        <span style={{ fontWeight: 700, color: "#0e4f8a" }}>Paddle</span>. No-shows
        forfeit the deposit.
      </p>
    </div>
  );
}
