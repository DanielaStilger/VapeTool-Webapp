import React, { useEffect, useState } from 'react'
import { Avatar } from 'flowbite-react';
import { getImageUrl, ImageType } from '../../services/storage'

interface FirebaseImageProps {
    type: ImageType
    id: string
    style?: any
    size?: "xs" | 'sm' | 'md' | 'lg' | "xl"
    alt?: string
}

const FirebaseAvatar: React.FC<FirebaseImageProps> = ({
    type,
    style,
    size,
    alt,
    id
}: FirebaseImageProps) => {
    const [src, setSrc] = useState<string | undefined>(undefined)
    useEffect(() => {
        getImageUrl(type, id).then((imageUrl) => setSrc(imageUrl))
    }, [id, type])

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Avatar
                style={style}
                alt={alt || type}
                img={src}
                size={size}
                rounded
            />
        </div>
    )
}

export default FirebaseAvatar
