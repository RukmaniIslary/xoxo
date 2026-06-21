"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BookingView from "@/components/BookingView";
import DispatchBoard from "@/components/DispatchBoard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"booking" | "dispatch">("booking");

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === "booking" ? <BookingView /> : <DispatchBoard />}
      </main>
    </div>
  );
}
