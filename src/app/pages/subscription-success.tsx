'use client'

import Link from 'next/link';

export default function SubscriptionSuccess() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Subscription Successful!</h1>
      <p className="text-xl mb-4">Thank you for subscribing to our creator.</p>
      <Link href="/">
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Return to Home
        </a>
      </Link>
    </div>
  )
}