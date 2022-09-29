import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { PhotoView, PostView } from '../src/components/ItemView';
import { List, Fab, CircularProgress } from '@mui/material';
import { Link, Photo, Post, ItemName, Item } from '../src/types';
import { useAuth } from '../context/FirebaseAuthContext';
import AddIcon from '@mui/icons-material/Add';
import { subscribeLinks, subscribePhotos, subscribePosts } from '../src/services/items';

// import PostView from '@/components/ItemView/PostView';
// import PhotoPreviewModal from '@/components/PreviewModal';
// import PageLoading from '@/components/PageLoading';
// import LinkView from '@/components/ItemView/LinkView';
// import { PageContainer } from '@ant-design/pro-layout';

const useModel = () => {
    const [photos, setPhotos] = useState<Photo[] | undefined>();
    const [posts, setPosts] = useState<Post[] | undefined>();
    const [links, setLinks] = useState<Link[] | undefined>();

    const setItems = (what: ItemName, items: Item[]) => {
        items.sort((a: Item, b: Item) => b.creationTime - a.creationTime);
        switch (what as ItemName) {
            case ItemName.PHOTO:
                setPhotos(items as Photo[]);
                break;
            case ItemName.POST:
                setPosts(items as Post[]);
                break;
            case ItemName.LINK:
                setLinks(items as Link[]);
                break;
            default:
                throw new Error(`Illegal type ${what}`);
        }
    };
    return {
        setLinks, setPhotos, setPosts, setItems, posts, links, photos
    }

}

const Cloud: React.FC = () => {
    const router = useRouter()
    const onUploadPhotoClicked = () => router.push('/cloud/upload');
    const { setLinks, setPhotos, setPosts, posts, links, photos } = useModel();
    const auth = useAuth()
    const firebaseUser = auth.firebaseUser;

    useEffect(() => subscribeLinks(setLinks));
    useEffect(() => subscribePhotos(setPhotos));
    useEffect(() => subscribePosts(setPosts));

    if (photos === undefined || posts === undefined || links === undefined) {
        return <CircularProgress />;
    }
    const items = [...photos, ...posts, ...links].sort(
        (a, b) => Number(b.creationTime) - Number(a.creationTime),
    );
    return (
        <div>

            <List sx={{ width: '100%', maxWidth: 614, bgcolor: 'background.paper' }} >

                {items.map((item) => {
                    if (item.$type === 'photo') {
                        return <PhotoView key={item.uid}  item={item as Photo} />;
                    }
                    if (item.$type === 'post') {
                        return <PostView key={item.uid} item={item as Post} />;
                    }
                    // if (item.$type === 'link') {
                    //     return <LinkView key={item.uid} displayCommentsLength={3} item={item as Link} />;
                    // }
                    return <div key={item.uid} />;

                })}
                </List>

            {firebaseUser && !firebaseUser.isAnonymous && (
                <Fab color="primary" aria-label="add" onClick={onUploadPhotoClicked}>
                    <AddIcon />
                </Fab>
            )}
        </div>
    );
};

export default Cloud;