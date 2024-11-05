import Link from 'next/link'
import { Suspense } from 'react'
import PostGrid from '@/components/post-grid'
import { Button } from '@/components/ui/button'

export default function PostsScreen() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Instagram Clone</h1>
        <Link href="/create-post">
          <Button>Create New Post</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostGrid />
      </Suspense>
    </main>
  )
}