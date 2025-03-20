import { Post } from "@/components/post"

export function PostList() {
  // Sample data for posts
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }]

  return (
    <div className="space-y-4 mt-4">
      {posts.map((post) => (
        <Post key={post.id} />
      ))}
    </div>
  )
}

