import Link from "next/link"
import { Home, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="w-72 border-r border-gray-800 p-4 flex flex-col">
      <div className="flex-1 space-y-2">
        <Link href="/" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md">
          <Home size={20} />
          <span>home</span>
        </Link>
        <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md">
          <User size={20} />
          <span>@usuario logado</span>
        </Link>
      </div>
      <Button className="w-full bg-white text-black hover:bg-gray-200">Publicar</Button>
    </div>
  )
}

