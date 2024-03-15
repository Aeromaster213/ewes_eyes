"use client"
import { About } from "@/components/about";
import { Navigation } from "@/components/navbar";
import React from "react";
import { useColorContext } from "@/app/context";

export default function Final() {
    const { colors, setColors } = useColorContext();
    console.log(colors)
    return (
        <main>
            <Navigation />
            <div className="w-screen h-screen bg-black">
                
            </div>
            <About id="about" />
        </main>
    )
}