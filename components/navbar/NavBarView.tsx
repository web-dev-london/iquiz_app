import React from 'react'
import Logo from './Logo'
import { ModeToggle } from './ModeToggle';
import { authOptions } from '@/app/auth/next-auth';
import { getServerSession } from 'next-auth';
import UserProfile from './UserProfile';
import SignInButton from './SignInButton';

const NavBar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className=" bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
        <div
          className='flex items-center justify-between mx-auto max-w-7xl px-4'
        >
          <Logo />

          <div className="flex items-center gap-3">
            <ModeToggle />
            {session?.user ? (
              <UserProfile user={session.user} />
            ) : (
              <SignInButton text="Sign In" />
            )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar;
