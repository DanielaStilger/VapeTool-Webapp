import React from "react";
import { Typography } from "@mui/material";
import { Author } from "@vapetool/types";
import Link from "next/link";
import { ImageType } from "../../services/storage";
import FirebaseImage from "../StorageAvatar";

function UserCard({ author }: { author: Author }) {
    return (
        <Link href={`/user/${author.uid}`}>
            <div>
                <FirebaseImage type={ImageType.USER} id={author.uid} />
                <Typography variant="subtitle2">
                    {author.displayName}
                </Typography>
            </div>
        </Link>
    );
}

export default UserCard;