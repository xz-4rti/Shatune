import { Post } from "@/components/post"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"

export function HomeContent() {
  // Sample data for posts
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

  return (
    <div className="flex-1 max-w-2xl mx-auto p-4">
      <div className="bg-gray-900 rounded-lg mb-4 p-4">
        <div className="flex items-center gap-2 mb-3">
          <User size={20} className="text-primary" />
          <Input placeholder="Escribe aquí tu post..." className="bg-primary/20 border-none" />
        </div>

        <Tabs defaultValue="para-ti" className="w-full">
          <TabsList className="w-full bg-gray-800">
            <TabsTrigger value="para-ti" className="flex-1">
              Para ti
            </TabsTrigger>
            <TabsTrigger value="siguiendo" className="flex-1">
              Siguiendo
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} />
        ))}
      </div>
    </div>
  )
}

