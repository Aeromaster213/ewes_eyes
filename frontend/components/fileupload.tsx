"use client"
import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Inbox } from "lucide-react"
import { uploadImage } from "./functions";

const Fileupload = ({onSuccess, onError}) => {
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
        onDrop: async (acceptedFiles) => {
            uploadImage(acceptedFiles[0], onSuccess, onError)
            console.log(acceptedFiles[0]);
        
        }
    });
    return (
        <div>
            <div className="flex items-center flex-col text-center">
                <h1 className="mr-3 text-5xl font-semibold">Upload a Reference Image</h1>
            </div>
            <p className="max-w-xl mt-1 text-lg text-slate-800 text-center">
                Upload an image to give our AI an idea of what you are looking for in terms of theming and colours
            </p>
            <div className="rounded-xl p-2 bg-white">
                <div {...getRootProps({
                    className: "border-dashed border-2 rounded-xl cursor-pointer bg-gray-80 hover:bg-gray-100 py-8 flex justify-center items-center flex-col"
                })}>
                    <input {...getInputProps()} />
                    <>
                        <Inbox
                            className="w-10 h-10 text-theme-blue hover:text-theme-purple"
                        />
                        <p className="mt-2 text-sm text-slate-400" >Drop your image here!</p>
                        <p className="mt-1 text-xs text-slate-400">PNG, JPG, JPEG, SVG accepted</p>
                    </>
                </div>
            </div></div>
    )
}

export default Fileupload;
