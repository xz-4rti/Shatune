"use client"

import { useState } from "react"

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [commented, setCommented] = useState(false)
  const [shared, setShared] = useState(false)

  return (
    <div className="post">
      <div className="post-header">
        <div className="user-icon">
          <i className="fas fa-user"></i>
        </div>
        <div className="post-user">@user123</div>
      </div>
      <div className="post-content">Comparto una de mis canciones favoritas!!!</div>
      <div className="post-media">
        <div className="song-thumbnail">
          <img src="/placeholder.svg?height=60&width=60" alt="Song thumbnail" />
        </div>
        <div className="song-info">
          <div className="song-title">Blue</div>
          <div className="song-artist">By Yung kai</div>
        </div>
        <div className="song-actions">
          <button className={`action-btn ${liked ? "active" : ""}`} onClick={() => setLiked(!liked)}>
            <i className="fas fa-thumbs-up"></i>
          </button>
          <button className={`action-btn ${commented ? "active" : ""}`} onClick={() => setCommented(!commented)}>
            <i className="fas fa-comment"></i>
          </button>
          <button className={`action-btn ${shared ? "active" : ""}`} onClick={() => setShared(!shared)}>
            <i className="fas fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post

