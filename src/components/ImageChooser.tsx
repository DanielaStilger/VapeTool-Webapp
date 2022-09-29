import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import UploadAndCropImage from './UploadAndCropImage';

interface ImageChooserProps {
    visible: boolean;
    onCancel: () => any;
    onImageChoose: (imageUrl: string, imageBlob: Blob | File, width: number, height: number) => any;
    maxSize?: number;
    uploadHintText?: string;
}

interface ImageChooserState {
    imageUrl?: string;
    imageBlob?: Blob | File;
    width?: number;
    height?: number;
}

/**
 * This class introduce two utilities, firstly it shows Modal,
 * secondary it allows to deffer passing new image until onOk is clicked,
 * so the parent doesn't need to react to each new resizing
 */
const ImageChooser: React.FC<ImageChooserProps> = (props: ImageChooserProps) => {
    const [state, setState] = useState<ImageChooserState>();

    const onResizeImage = (
        imageUrl: string,
        imageBlob: Blob | File,
        width: number,
        height: number,
    ) => {
        setState({
            imageUrl,
            imageBlob,
            width,
            height,
        });
    };

    const onImageChoose = () => {
        if (state) {
            const { imageUrl, imageBlob, width, height } = state;
            if (!imageUrl || !imageBlob || !width || !height) {
                // TODO: notification.error({ message: "You didn't choose any image" });
                return;
            }
            props.onImageChoose(imageUrl, imageBlob, width, height);
            onCancel();
        } else {
            // TODO: notification.error({ message: "You didn't choose any image" });
        }
    };

    const onCancel = () => {
        setState({
            imageUrl: undefined,
            imageBlob: undefined,
            width: undefined,
            height: undefined,
        });
        props.onCancel();
    };
    const { visible, maxSize, uploadHintText } = props;
    return (
        <Dialog
            open={visible}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Disagree</Button>
                <Button onClick={onImageChoose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
            <UploadAndCropImage
                uploadHintText={uploadHintText}
                onResizeImage={onResizeImage}
                maxSize={maxSize}
            />
        </Dialog>
    );
};

export default ImageChooser;
