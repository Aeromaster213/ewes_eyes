"use client";
import Image from "next/image";
import React from "react";

export function Navigation() {
    return (
        <div className="text-white flex justify-between items-center bg-gray-200 p-4 bg-gradient-to-r from-theme-purple to-theme-blue z-100 sticky">
            <Image src="/logo.png" alt="Revamp" width="200" height="100" />
            <div className="flex items-center gap-11">
                <button className="mr-4">Button 1</button>
                <button>Button 2</button>
            </div>
        </div>
    );
}
