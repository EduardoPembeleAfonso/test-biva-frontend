'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.replace('/sign-in'), 250)
  })

  return (
    <div className="w-full h-screen flex flex-col gap-3 flex-1 justify-center items-center">
      <h1 className="text-xl font-bold text-violet-950">
        Test Biva App
      </h1>
    </div>
  )
}
