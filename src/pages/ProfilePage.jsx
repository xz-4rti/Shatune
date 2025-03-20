import ProfileTabs from "../components/ProfileTabs"
import Post from "../components/Post"

const ProfilePage = () => {
  // Sample data for posts
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }]

  return (
    <section className="profile-container">
      {/* Profile header with cover image */}
      <div className="profile-header">
        <div className="cover-image">
          <div className="song-info-overlay">
            <div className="song-title-overlay">Blue</div>
            <div className="song-artist-overlay">By Yung kai</div>
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-picture">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Name Surname</h2>
            <div className="profile-stats">
              <span>10 Followers</span>
              <span>10 Following</span>
            </div>
          </div>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>

      <ProfileTabs />

      {/* Profile posts */}
      <div className="profile-posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default ProfilePage

