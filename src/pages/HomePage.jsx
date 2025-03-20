import FeedTabs from "../components/FeedTabs"
import Post from "../components/Post"

const HomePage = () => {
  // Sample data for posts
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

  return (
    <section className="feed-container">
      {/* Post creation area */}
      <div className="post-creation">
        <div className="user-icon">
          <i className="fas fa-user"></i>
        </div>
        <input type="text" placeholder="Escribe aquí tu post..." />
      </div>

      <FeedTabs />

      {/* Feed posts */}
      <div className="feed-posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default HomePage

