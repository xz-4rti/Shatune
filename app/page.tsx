import { Sidebar } from "@/components/sidebar"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-primary h-12 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <HomeContent />
        <div className="hidden lg:block w-72 bg-primary/20 rounded-lg m-4"></div>
      </div>
    </main>
  )
}

