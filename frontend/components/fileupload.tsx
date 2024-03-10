"use client"
import React from "react";
import { useDropzone } from 'react-dropzone';
import { Inbox } from "lucide-react"

const Fileupload = () => {
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
        }
    });
    return (
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
        </div>
    )
}

export default Fileupload;