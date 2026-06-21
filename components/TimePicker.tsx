"use client";

import { TIME_SLOTS, getTodayString } from "@/lib/data";

interface TimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function TimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: TimePickerProps) {
  const today = getTodayString();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Date */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#555",
            marginBottom: "0.4rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Date
        </label>
        <input
          type="date"
          min={today}
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.65rem 0.85rem",
            border: "1.5px solid var(--brand-border)",
            borderRadius: 5,
            fontSize: "0.95rem",
            color: "var(--brand-dark)",
            background: "#fff",
            outline: "none",
          }}
        />
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#555",
              marginBottom: "0.5rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Available Times
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
              gap: "0.4rem",
            }}
          >
            {TIME_SLOTS.map((slot) => {
              const selected = slot.time === selectedTime;
              return (
                <button
                  key={slot.time}
                  onClick={() => onTimeChange(slot.time)}
                  disabled={!slot.available}
                  style={{
                    padding: "0.5rem 0.4rem",
                    borderRadius: 4,
                    border: `1.5px solid ${selected ? "#000" : "var(--brand-border)"}`,
                    background: selected ? "#000" : "#fff",
                    color: selected ? "#fff" : "var(--brand-dark)",
                    fontSize: "0.82rem",
                    fontWeight: selected ? 700 : 400,
                    cursor: slot.available ? "pointer" : "not-allowed",
                    opacity: slot.available ? 1 : 0.4,
                    transition: "all 0.12s",
                  }}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
