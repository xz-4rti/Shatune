"use client"

import { useState } from "react"

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="profile-tabs">
      <button className={`tab-btn ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>
        Posts
      </button>
      <button
        className={`tab-btn ${activeTab === "playlists" ? "active" : ""}`}
        onClick={() => setActiveTab("playlists")}
      >
        Playlists
      </button>
    </div>
  )
}

export default ProfileTabs

