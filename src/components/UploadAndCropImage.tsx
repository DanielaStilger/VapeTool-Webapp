import React, { useState } from 'react';
import { Button, Typography, Card } from '@mui/material'
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface CropAndUploadImageProps {
    maxSize?: number;
    onResizeImage?: (url: string, blob: Blob | File, width: number, height: number) => any;
    uploadHintText?: string;
    onConfirm?: () => void;
}

interface CropAndUploadImageState {
    src: string | null;
    crop: Crop;
    croppedImageUrl?: string;
    croppedImageBlob?: Blob | File;
    description?: string;
    width?: number;
    height?: number;
}

function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        // TODO message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
        // TODO: message.error('Image must smaller than 20MB!');
    }
    return isJpgOrPng && isLt2M;
}

const IMAGE_FORMAT = 'image/jpeg';
const IMAGE_QUALITY = 0.92;


class UploadAndCropImage extends React.PureComponent<
    CropAndUploadImageProps,
    CropAndUploadImageState
> {
    state = {
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 1
        }
    };

    // this is <img> element reference from <ReactCrop> element
    imageRef: HTMLImageElement | undefined = undefined;

    // We use global variable because it allow to revoke previously loaded image
    // so we have only one croppedFile at a time
    croppedFileUrl: string | undefined = undefined;


    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (e: any) => {
        const target = e.currentTarget;

        // set the reference to <img> object so it can be used later in makeClientCrop
        // which doesn't have access to this element
        this.imageRef = target;
        // Center a square percent crop.
        const width = target.width > target.height ? target.height : target.width;
        const height = target.height > target.width ? target.width : target.height;
        const x = width === target.width ? 0 : (target.width - width) / 2;
        const y = height === target.height ? 0 : (target.height - height) / 2;

        const crop: Crop = {
            unit: 'px',
            width,
            height,
            x,
            y,
        };

        this.onCropChange(crop);
        this.makeClientCrop(crop);

        // If you setState the crop in here you should return false.
        return false;
    };

    onCropChange = (crop: Crop) => this.setState({ crop });

    getCroppedImgUrl = (
        crop: Crop,
    ): Promise<{ url: string; blob: Blob; width: number; height: number }> => {
        const image: HTMLImageElement = this.imageRef!;
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        if (!crop.width || !crop.height) {
            throw new Error(
                `crop width ${crop.width} and crop height ${crop.height} must be positive number`,
            );
        }
        canvas.width = Math.ceil(crop.width * scaleX);
        canvas.height = Math.ceil(crop.height * scaleY);
        if (this.props.maxSize) {
            canvas.width = Math.min(this.props.maxSize, canvas.width);
            canvas.height = Math.min(this.props.maxSize, canvas.height);
        }
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not retrieve context');
        }
        if (crop.x === undefined || crop.y === undefined) {
            throw new Error(`crop x: ${crop.x} and crop height ${crop.y} must be positive number`);
        }

        const pixelRatio = window.devicePixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            this.props.maxSize ? Math.min(this.props.maxSize, crop.width * scaleX) : crop.width * scaleX,
            this.props.maxSize
                ? Math.min(this.props.maxSize, crop.height * scaleX)
                : crop.height * scaleX,
        );

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob: Blob | null) => {
                    if (!blob) {
                        // reject(new Error('Canvas is empty'));
                        console.error('Canvas is empty');
                        return;
                    }
                    if (this.croppedFileUrl) {
                        window.URL.revokeObjectURL(this.croppedFileUrl);
                    }
                    this.croppedFileUrl = window.URL.createObjectURL(blob);
                    const width = crop.width! * scaleX;
                    const height = crop.height! * scaleY;
                    resolve(Object.create({ blob, width, height }));
                },
                IMAGE_FORMAT,
                IMAGE_QUALITY,
            );
        });
    };

    makeClientCrop = async (crop: Crop) => {
        if (this.imageRef && crop.width && crop.height) {
            const { blob, width, height } = await this.getCroppedImgUrl(crop);
            if (this.props.onResizeImage) {
                this.props.onResizeImage(this.croppedFileUrl!, blob, width, height);
            }
        }
    };

    onResetSourceImage = () => this.setState({ src: undefined });

    render() {
        const { src, crop } = this.state;
        const { uploadHintText, onConfirm } = this.props;

        return (
            <>
                {!src && (
                    <div>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Click or drag file to this area to upload
                            <input
                                onChange={this.onSelectFile}
                                onBeforeInput={beforeUpload}
                                type="file"
                                hidden
                            />
                        </Button>

                        <p className="ant-upload-hint">
                            {uploadHintText || (
                                <Typography>
                                    Please upload only vape related photos. Breaking those rules will result in
                                    account suspension.
                                </Typography>
                            )}
                        </p>
                    </div>
                )}
                {src && (
                    <Card style={{ textAlign: 'center' }}>
                        <ReactCrop
                            crop={crop}
                            minHeight={100}
                            minWidth={100}
                            keepSelection
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.makeClientCrop}
                            onChange={this.onCropChange}
                        >
                            <img src={src} onLoad={this.onImageLoaded} />
                        </ReactCrop>

                        <div style={{ marginTop: 24 }}>
                            <Button onClick={this.onResetSourceImage} style={{ marginRight: 12 }}>
                                Upload again
                            </Button>
                            {onConfirm && (
                                <Button onClick={onConfirm}>
                                    Continue
                                </Button>
                            )}
                        </div>
                    </Card>
                )}
            </>
        );
    }
}

export default UploadAndCropImage;
