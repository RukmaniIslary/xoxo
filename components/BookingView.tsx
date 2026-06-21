"use client";

import { useState } from "react";
import { Service, BookingFormData, Booking } from "@/lib/types";
import ServicePicker from "./ServicePicker";
import TimePicker from "./TimePicker";
import GuestForm from "./GuestForm";
import PaymentPanel from "./PaymentPanel";
import ConfirmationTicket from "./ConfirmationTicket";

const EMPTY_FORM: BookingFormData = {
  serviceId: "",
  date: "",
  time: "",
  guestName: "",
  phone: "",
  email: "",
  partySize: 2,
  notes: "",
};

function StepLabel({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "var(--brand-primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "0.82rem",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <h2
        style={{
          margin: 0,
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--brand-dark)",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--brand-border)",
        borderRadius: 8,
        padding: "1.25rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {children}
    </div>
  );
}

export default function BookingView() {
  const [formData, setFormData] = useState<BookingFormData>(EMPTY_FORM);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleFieldChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setFormData((prev) => ({ ...prev, serviceId: service.id }));
  };

  const formValid =
    !!formData.serviceId &&
    !!formData.date &&
    !!formData.time &&
    formData.guestName.trim().length > 1 &&
    formData.phone.trim().length > 5 &&
    formData.email.includes("@");

  const handleSuccess = (booking: Booking) => {
    setConfirmedBooking(booking);
  };

  const handleBookAnother = () => {
    setFormData(EMPTY_FORM);
    setSelectedService(null);
    setConfirmedBooking(null);
  };

  if (confirmedBooking) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "2rem 1.25rem" }}>
        <ConfirmationTicket
          booking={confirmedBooking}
          onBookAnother={handleBookAnother}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "2rem 1.25rem",
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "1.5rem",
        alignItems: "start",
      }}
    >
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Step 1 */}
        <Card>
          <StepLabel number={1} title="Choose a Service" />
          <ServicePicker
            selectedId={formData.serviceId}
            onSelect={handleServiceSelect}
          />
        </Card>

        {/* Step 2 */}
        <Card>
          <StepLabel number={2} title="Pick a Time" />
          <TimePicker
            selectedDate={formData.date}
            selectedTime={formData.time}
            onDateChange={(d) => handleFieldChange("date", d)}
            onTimeChange={(t) => handleFieldChange("time", t)}
          />
        </Card>

        {/* Step 3 */}
        <Card>
          <StepLabel number={3} title="Your Details" />
          <GuestForm formData={formData} onChange={handleFieldChange} />
          {!formValid && (formData.guestName || formData.phone || formData.email) && (
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.8rem",
                color: "#e05a2b",
                margin: "0.75rem 0 0",
              }}
            >
              Please fill in your name, phone, email, and select a date and time to continue.
            </p>
          )}
        </Card>
      </div>

      {/* Right column — sticky payment */}
      <div style={{ position: "sticky", top: "1.5rem" }}>
        <Card>
          <StepLabel number={4} title="Secure Your Spot" />
          <PaymentPanel
            service={selectedService}
            formData={formData}
            formValid={formValid}
            onSuccess={handleSuccess}
          />
        </Card>
      </div>
    </div>
  );
}
