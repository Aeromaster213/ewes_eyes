"use client"
import React from "react";
import Fileupload from "@/components/fileupload";
import { Button } from "@/components/ui/button";

export default function Gen() {
    return (
        <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex-col items-center text-center ">
                    <div className="flex items-center">
                        <h1 className="mr-3 text-5xl font-semibold">Upload a Reference Image</h1>
                    </div>
                    <p className="max-w-xl mt-1 text-lg text-slate-800">
                        Upload an image to give our AI an idea of what you are looking for in terms of theming and colours
                    </p>
                    <Fileupload />
                    <div className="flex justify-center items-center gap-8 mt-5">
                        <Button>Next Step!</Button>
                        <Button>Generate without Text</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}