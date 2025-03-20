import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ProfileHeader() {
  return (
    <div className="relative">
      <div className="h-40 w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=160&width=600"
          alt="Profile banner"
          width={600}
          height={160}
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col justify-end p-4">
          <div className="text-white text-center">
            <h2 className="text-xl font-bold">Blue</h2>
            <p className="text-sm">By Yung kai</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center -mt-12 relative z-10">
        <div className="rounded-full border-4 border-background overflow-hidden w-24 h-24 bg-white">
          <Image
            src="/placeholder.svg?height=96&width=96"
            alt="Profile picture"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        <div className="mt-2 text-center">
          <h1 className="text-xl font-bold">Name Surname</h1>
          <div className="flex gap-4 text-sm text-gray-400 mt-1">
            <span>10 Followers</span>
            <span>10 Following</span>
          </div>
        </div>

        <Button variant="outline" className="mt-2 text-sm px-4 py-1 h-8">
          Edit Profile
        </Button>
      </div>
    </div>
  )
}

