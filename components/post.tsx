import Image from "next/image"
import { ThumbsUp, MessageSquare, Share2, User } from "lucide-react"

export function Post() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <User size={20} className="text-primary" />
          <span className="text-sm text-gray-400">@user123</span>
        </div>
        <p className="text-sm mb-4">Comparto una de mis canciones favoritas!!!</p>
      </div>

      <div className="flex items-center p-4 bg-primary/10">
        <div className="w-12 h-12 mr-3">
          <Image
            src="/placeholder.svg?height=48&width=48"
            alt="Song thumbnail"
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Blue</h3>
          <p className="text-xs text-gray-400">By Yung kai</p>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-400 hover:text-primary">
            <ThumbsUp size={18} />
          </button>
          <button className="text-gray-400 hover:text-primary">
            <MessageSquare size={18} />
          </button>
          <button className="text-gray-400 hover:text-primary">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

