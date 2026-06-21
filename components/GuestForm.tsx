"use client";

import { BookingFormData } from "@/lib/types";

interface GuestFormProps {
  formData: BookingFormData;
  onChange: (field: keyof BookingFormData, value: string | number) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.85rem",
  border: "1.5px solid var(--brand-border)",
  borderRadius: 5,
  fontSize: "0.95rem",
  color: "var(--brand-dark)",
  background: "#fff",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#555",
  marginBottom: "0.35rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function GuestForm({ formData, onChange }: GuestFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        <Field label="Your Name">
          <input
            type="text"
            placeholder="Full name"
            value={formData.guestName}
            onChange={(e) => onChange("guestName", e.target.value)}
            style={inputStyle}
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            style={inputStyle}
          />
        </Field>
      </div>

      <Field label="Email">
        <input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          style={inputStyle}
        />
      </Field>

      <Field label="Party Size">
        <select
          value={formData.partySize}
          onChange={(e) => onChange("partySize", parseInt(e.target.value))}
          style={inputStyle}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Special Requests (optional)">
        <textarea
          placeholder="Allergies, dietary requirements, celebrations..."
          value={formData.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={3}
          style={{
            ...inputStyle,
            resize: "vertical",
            lineHeight: 1.5,
          }}
        />
      </Field>
    </div>
  );
}
