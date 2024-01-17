'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { User } from '@/app/types'
import AuthPage from '@/components/AuthPage'
import ChatPage from '@/components/ChatPage'

export default function Home() {
  const [user, setUser] = useState<User | undefined>(undefined)
  
  if (!user)
    return <div className='background w-screen h-screen'><AuthPage onAuth={(user) => setUser(user)}/></div>
  else
    return <div className='background w-screen h-screen'><ChatPage user={user}/></div>
}
