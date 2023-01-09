import React, { useState } from 'react'
import Avatar from "react-avatar-edit";

export const DropZone = () => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);

    const onClose = () => setPreview(null);
    const onCrop = view => setPreview(view);

    return (
        <>
            <Avatar
                height="100px"
                width="300px"
                imageHeight="300px"
                imageWidth="500px"
                onCrop={onCrop}
                onClose={onClose}
                src={src}
            >
            </Avatar>
            {preview && <img alt="preview" src={preview}></img>}
        </>
    )
}
