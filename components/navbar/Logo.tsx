import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/quiz.png'
import React from 'react'

const Logo = () => {
  return (
    <>
      <Link
        href="/"
      >
        <div
        >
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            priority
          />
        </div>
      </Link>
    </>
  )
}

export default Logo;