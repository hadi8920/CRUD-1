import React from 'react'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Bell} from 'lucide-react'


const navbar = () => {
  return (
    <div className="flex flex-row justify-between">
        <SidebarTrigger />

      <div className="flex flex-row gap-2">
        <Avatar size="sm">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Bell />
      </div>

    </div>
  )
}

export default navbar
