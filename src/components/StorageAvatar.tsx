import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { getImageUrl, ImageType } from '../services/storage';

interface FirebaseImageProps {
    type: ImageType;
    id: string;
    style?: any;
    size?: number | 'small' | 'large' | 'default';
    shape?: 'circular' | 'square' | 'rounded';
    className?: any;
    alt?: string;
}

const FirebaseImage: React.FC<FirebaseImageProps> = ({
    type,
    alt,
    shape,
    size,
    id,
}: FirebaseImageProps) => {
    const [src, setSrc] = useState<string | undefined>(undefined);
    const sx = size == 'default' ? undefined :{
        width: size == 'small' ? 24 : size == 'large' ? 56 : typeof size === 'number' ? size : 36,
        height: size == 'small' ? 24 : size == 'large' ? 56 : typeof size === 'number' ? size : 36,
    }
    useEffect(() => {
        getImageUrl(type, id).then((imageUrl) => setSrc(imageUrl));
    }, [id, type]);

    return (
        <Avatar
            alt={alt || type}
            variant={shape}
            src={src}
            sx={sx}
        />
    );
};

export default FirebaseImage;
