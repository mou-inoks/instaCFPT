'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CreatePostFormScreen() {
    const [title, setTitle] = useState('')
    const [userId, setUserId] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log('Submitting:', { title, userId, image })
        // Reset form after submission
        setTitle('')
        setUserId('')
        setImage(null)
        setPreviewUrl(null)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="image">Image</Label>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {previewUrl && (
                    <div className="mt-4">
                        <Label>Preview</Label>
                        <img src={previewUrl} alt="Preview" className="mt-2 max-w-full h-auto rounded-lg" />
                    </div>
                )}
                <Button type="submit" className="w-full">Create Post</Button>
            </div>
        </form>
    )
}