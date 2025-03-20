import { Sidebar } from "@/components/sidebar"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileTabs } from "@/components/profile-tabs"
import { PostList } from "@/components/post-list"

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-primary h-12 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 max-w-2xl mx-auto">
          <ProfileHeader />
          <ProfileTabs />
          <PostList />
        </div>
      </div>
    </main>
  )
}

