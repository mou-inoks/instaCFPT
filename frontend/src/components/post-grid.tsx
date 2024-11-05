import React from 'react';

const PostGrid = () => {
    const posts = [
        {
            id: 1,
            imageUrl: '/path-to-image1.jpg',
            description: 'A beautiful sunset at the beach',
        },
        {
            id: 2,
            imageUrl: '/path-to-image2.jpg',
            description: 'Exploring the city life',
        },
        {
            id: 3,
            imageUrl: '/path-to-image3.jpg',
            description: 'A serene mountain view',
        },
        // Add more posts as needed
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
                <div key={post.id} className="rounded-lg overflow-hidden shadow-md bg-white">
                    <img
                        src={post.imageUrl}
                        alt={post.description}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <p className="text-gray-700">{post.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
