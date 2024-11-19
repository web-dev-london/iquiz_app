'use client'
import { User } from 'next-auth'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react';




type Props = {
  user: Pick<User, 'name' | 'email' | 'image'>
}

const UserProfile = ({ user }: Props) => {

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join(' ')
      .toUpperCase()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>

          <Avatar>
            <AvatarImage src={user.image || ''} />
            <AvatarFallback
            >
              {getInitials(user.name || '')}
            </AvatarFallback>
          </Avatar>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-gray-950 mt-5" align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="w-[200px] text-sm font-medium">{user.name}</p>}
              {user.email && <p className="w-[200px] text-sm opacity-50">{user.email}</p>}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault()
              signOut().catch(console.error)
            }}
            className={
              'text-red-500 cursor-pointer'
            }
          >
            Sign Out
            <LogOut className="ml-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserProfile;
