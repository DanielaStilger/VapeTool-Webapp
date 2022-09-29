import React from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export const LikeIconText = ({
    text,
    onClick,
    likedByMe,
}: {
    text: string;
    onClick: any;
    likedByMe?: boolean;
}) => (
    <span onClick={onClick}>
        {likedByMe ? (
            <Favorite style={{ marginRight: 8 }} />
        ) : (
            <FavoriteBorder style={{ marginRight: 8 }} />
        )}
        {text}
    </span>
);
