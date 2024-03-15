"use client"
import { About } from "@/components/about";
import { Navigation } from "@/components/navbar";
import React from "react";

export default function Final() {
    return (
        <main>
            <Navigation />
            <div className="w-screen h-screen bg-black">
                
            </div>
            <About id="about" />
        </main>
    )
}