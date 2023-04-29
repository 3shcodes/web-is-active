"use client"
import { Inter } from 'next/font/google'
import { useAppDispatch } from '@/redux/hooks'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <>
      Home Page <br />
      <Link href='/login'>Login</Link>
    </>
  )
}
