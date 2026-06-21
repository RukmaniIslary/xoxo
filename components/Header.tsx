"use client";

interface HeaderProps {
  activeTab: "booking" | "dispatch";
  onTabChange: (tab: "booking" | "dispatch") => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header
      style={{
        background: "var(--brand-dark)",
        borderBottom: "3px solid var(--brand-primary)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          minHeight: 64,
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "var(--brand-primary)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#fff",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            XO
          </div>
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
              }}
            >
              XoXoCafe
            </div>
            <div
              style={{
                color: "var(--brand-secondary)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Reservations
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: "flex", gap: "0.25rem" }}>
          {(["booking", "dispatch"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: 4,
                border: "1px solid",
                fontSize: "0.82rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
                transition: "all 0.15s",
                background:
                  activeTab === tab ? "var(--brand-primary)" : "transparent",
                borderColor:
                  activeTab === tab
                    ? "var(--brand-primary)"
                    : "rgba(255,255,255,0.3)",
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              {tab === "booking" ? "Customer Booking" : "Dispatch Board"}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
