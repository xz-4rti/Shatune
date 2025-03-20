"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<"posts" | "playlists">("posts")

  return (
    <div className="flex border-b border-gray-800 mt-6">
      <button
        className={cn(
          "flex-1 py-3 text-center",
          activeTab === "posts" ? "border-b-2 border-primary font-medium" : "text-gray-400",
        )}
        onClick={() => setActiveTab("posts")}
      >
        Posts
      </button>
      <button
        className={cn(
          "flex-1 py-3 text-center",
          activeTab === "playlists" ? "border-b-2 border-primary font-medium" : "text-gray-400",
        )}
        onClick={() => setActiveTab("playlists")}
      >
        Playlists
      </button>
    </div>
  )
}

