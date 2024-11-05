'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function CreatePostFormScreen() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const uploadImage = async (formData: FormData) => {
        try {
            const response = await fetch('http://127.0.0.1:9000/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const { error } = await response.json()
                return { error }
            }

            const { url } = await response.json()
            return { url }
        } catch (error) {
            return { error: 'An error occurred while uploading the image.' }
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append('title', title)
        if (image) {
            formData.append('image', image)
        }

        const result = await uploadImage(formData)

        setIsUploading(false)

        if ('error' in result) {
            setError(result.error)
        } else {
            setImageUrl(result.url)
            // Optionally, you can redirect or show a success message here
            console.log('Post created with image URL:', result.url);
            // Reset form fields if needed
            setTitle('');
            setImage(null);
            setPreviewUrl(null);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
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
                <Button disabled={isUploading} type="submit" className="w-full">
                    {isUploading ? 'Uploading...' : 'Create Post'}
                </Button>
            </div>
        </form>
    )
}
