import React, { useState } from 'react';
import { User as DatabaseUser } from '@vapetool/types'
import { User as FirebaseUser } from 'firebase/auth'
import { Button, ButtonGroup, Grid, Card, TextField } from '@mui/material'
import FirebaseImage from '../components/StorageAvatar';
import ImageChooser from '../components/ImageChooser';
import { ImageType, uploadAvatar } from '../services/storage';
import { updateDisplayName, updateSetupComplete } from '../services/user';
import { useAuth } from '../../context/FirebaseAuthContext';
import snackbar from '../utils/snackbar';
import WaitingForServer from '../components/WaitingForServer';
import useRouter from '../useRouter';

const useWizardModel = (user: DatabaseUser | null, firebaseUser: FirebaseUser) => {
    console.log("displayNames", user?.display_name, firebaseUser.displayName)
    const router = useRouter()
    const [displayName, setDisplayName] = useState(user?.display_name || firebaseUser.displayName);
    // TODO: use the user's avatar if they have one
    const [newAvatarBlob, setNewAvatarBlob] = useState<Blob | File | undefined>(undefined);
    const [newAvatarUrl, setNewAvatarUrl] = useState<string>('');
    const [showAvatarChooser, setShowAvatarChooser] = useState<boolean>(false);

    const updateUser = async (currentUser: DatabaseUser) => {
        await updateSetupComplete(currentUser.uid)
        if (!displayName) {
            snackbar.error('Please enter a display name');
            return;
        }
        if (displayName && displayName !== currentUser.display_name) {
            console.log(
                `Uploading new display name ${currentUser.display_name} to userid: ${currentUser.uid}`,
            );
            try {
                await updateDisplayName(currentUser.uid, displayName);
            } catch (e) {
                console.error(e);
                snackbar.error(`Error updating display name`);
            }
        } else {
            console.info('Skipping updating displayName');
        }

        if (newAvatarBlob) {
            console.log(`Uploading new Avatar ${newAvatarBlob} to userid: ${currentUser.uid}`);
            try {
                await uploadAvatar(newAvatarBlob, currentUser.uid);
            } catch (e) {
                console.error(e);
                snackbar.error(`Error uploading avatar`);
            }
        } else {
            console.info('Skipping updating uploadAvatar');
        }
    };

    const redirectBack = () => {
        router.goBack()
    };
    return {
        displayName,
        setDisplayName,
        newAvatarBlob,
        setNewAvatarBlob,
        newAvatarUrl,
        setNewAvatarUrl,
        showAvatarChooser,
        setShowAvatarChooser,
        updateUser,
        redirectBack,
    };
}

const UserWizard: React.FC = () => {
    const { firebaseUser, dbUser } = useAuth();
    if (!firebaseUser || !dbUser) {
        // This should never happen, but just in case
        return <WaitingForServer />
    }

    const {
        displayName,
        newAvatarUrl,
        showAvatarChooser,
        setDisplayName,
        setNewAvatarBlob,
        setNewAvatarUrl,
        setShowAvatarChooser,
        redirectBack,
        updateUser,
    } = useWizardModel(dbUser, firebaseUser)


    const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDisplayName(e.target.value);
    const onNewAvatarChoose = (imageUrl: string, imageBlob: Blob | File) => {
        setNewAvatarBlob(imageBlob);
        setNewAvatarUrl(imageUrl);
        setShowAvatarChooser(false);
    };

    return (
        <div>
            <Grid container>
                <Grid xs={0} md={4} lg={6} xl={8} />
                <Grid xs={24} md={16} lg={14} xl={10}>
                    <Card
                        style={{ maxWidth: 500 }}
                        title="Setup user"
                    >
                        <div>
                            <div onClick={() => setShowAvatarChooser(true)}>
                                <div style={{ textAlign: 'center' }}>
                                    {newAvatarUrl && <img alt="avatar" src={newAvatarUrl} width={200} />}
                                    {!newAvatarUrl && (
                                        <FirebaseImage
                                            type={ImageType.USER}
                                            id={firebaseUser.uid}
                                            size={200}
                                            shape="square"
                                        />
                                    )}
                                </div>
                            </div>
                            <br />
                            <div>
                                <TextField
                                    style={{
                                        textAlign: 'center',
                                        display: 'block',
                                        outline: 0,
                                        wordWrap: 'break-word',
                                        boxSizing: 'inherit',
                                        cursor: 'text',
                                        minHeight: 50,
                                        lineHeight: '37px',
                                        fontSize: 28,
                                        fontFamily: 'Proxima Nova Bold,Helvetica Neue,Helvetica,Arial,sans-serif',
                                    }}
                                    placeholder={firebaseUser.displayName || "Anonymous"}
                                    onChange={onDisplayNameChange}
                                    value={displayName}
                                />
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <ButtonGroup>
                                {dbUser && (
                                    <Button onClick={() => redirectBack()}>
                                        Cancel
                                    </Button>
                                )}

                                <Button
                                    onClick={() => updateUser(dbUser)}
                                >
                                    Save
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Card>
                </Grid>
                <Grid xs={0} md={4} lg={6} xl={8} />
            </Grid>
            <ImageChooser
                uploadHintText="Upload avatar photo. Make sure that the photo doesn't brake the rules."
                visible={showAvatarChooser}
                onCancel={() => setShowAvatarChooser(false)}
                onImageChoose={onNewAvatarChoose}
                maxSize={256}
            />
        </div>
    );
};

export default UserWizard;
