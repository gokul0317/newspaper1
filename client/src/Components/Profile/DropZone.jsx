import React, { useEffect, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import Grid from "@mui/material/Grid";
import ReactCrop from "react-image-crop";
import LoadingButton from '@mui/lab/LoadingButton';

const dropZone = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    cursor: "pointer"
}

export const DropZone = () => {
    const [files, setFiles] = useState([]);
    const [crop, setCrop] = useState();
    const [result, setResult] = useState(null);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const getCroppedImage = () => {
        const canvas = document.createElement('canvas');
        return;
        // const preview = document.createElement("img");
        // preview.src = files[0].preview;
        // preview.height = "auto";
        // preview.width = "auto";
        // const scaleX = preview.naturalWidth;
        // const scaleY = preview.naturalHeight;
        // console.log(preview.naturalWidth, preview.naturalWidth, "preview.naturalWidth")
        // canvas.width = preview.naturalWidth;
        // canvas.height = preview.naturalHeight;
      
        // console.log(crop.x * scaleX,
        //     crop.y * scaleY,
        //     crop.width * scaleX,
        //     crop.height * scaleY,
        //     0,
        //     0,
        //     crop.width,
        //     crop.height)

        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(files[0].preview,
        //     crop.x * scaleX,
        //     crop.y * scaleY,
        //     crop.width * scaleX,
        //     crop.height * scaleY,
        //     0,
        //     0,
        //     crop.width,
        //     crop.height
        // )

        // canvas.toBlob((resultItem) => setResult(resultItem))
    }

    console.log(files, crop, result, "crop==>")

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <Grid item style={{ width: "100%" }}>
            <Grid container margin="10px" gap="10px">
                <Grid item style={{ width: "100%" }}>
                    <div style={dropZone} {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop photo, or click to select photo</p>
                    </div>
                </Grid>
                {files.length && files[0] ? <Grid item style={{ width: "100%" }}>
                    <ReactCrop crop={crop} onChange={(e) => setCrop(e)}>
                        <img src={files[0].preview} alt="preview" />
                    </ReactCrop>
                </Grid> : null}
                <Grid item>
                    <LoadingButton onClick={() => getCroppedImage()} variant='contained'>Upload Picture</LoadingButton>
                </Grid>
            </Grid>
        </Grid>
    );
}
