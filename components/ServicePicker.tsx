"use client";

import { Service } from "@/lib/types";
import { SERVICES, formatCurrency } from "@/lib/data";

interface ServicePickerProps {
  selectedId: string;
  onSelect: (service: Service) => void;
}

export default function ServicePicker({ selectedId, onSelect }: ServicePickerProps) {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      {SERVICES.map((service) => {
        const selected = service.id === selectedId;
        return (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1rem 1.1rem",
              border: `2px solid ${selected ? "var(--brand-primary)" : "var(--brand-border)"}`,
              borderRadius: 6,
              background: selected ? "#fff8f3" : "#fff",
              textAlign: "left",
              transition: "all 0.15s",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  color: selected ? "var(--brand-primary)" : "var(--brand-dark)",
                  fontSize: "0.95rem",
                  marginBottom: "0.2rem",
                }}
              >
                {service.name}
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#666",
                  lineHeight: 1.4,
                  marginBottom: "0.25rem",
                }}
              >
                {service.description}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#999" }}>
                {service.duration}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--brand-dark)",
                  fontSize: "1rem",
                }}
              >
                {formatCurrency(service.price)}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--brand-primary)",
                  marginTop: "0.15rem",
                }}
              >
                {formatCurrency(service.deposit)} deposit
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
