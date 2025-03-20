"use client"

import { useState } from "react"

const FeedTabs = () => {
  const [activeTab, setActiveTab] = useState("para-ti")

  return (
    <div className="feed-tabs">
      <button className={`tab-btn ${activeTab === "para-ti" ? "active" : ""}`} onClick={() => setActiveTab("para-ti")}>
        Para ti
      </button>
      <button
        className={`tab-btn ${activeTab === "siguiendo" ? "active" : ""}`}
        onClick={() => setActiveTab("siguiendo")}
      >
        Siguiendo
      </button>
    </div>
  )
}

export default FeedTabs

