import React from "react";
import { getLuminosity } from "./functions";
import { useColorContext } from "@/app/context";

interface ColourCardProps {
    colours: { r: number, g: number, b: number }[];
    userColor: boolean;
}

export default function ColourCard({ colours, userColor = false }: ColourCardProps) {
    const {luminosity, setLuminosity} = useColorContext();
    return (
        <div className="flex flex-col justify-center items-center">
            <div style={{ width: "100px", height: "70px" }} className="grid grid-cols-4 hover:cursor-pointer m-2">
                <div style={{ backgroundColor: `rgb(${colours[0].r}, ${colours[0].g}, ${colours[0].b})` }} className="col-start-1 col-end-2"></div>
                <div style={{ backgroundColor: `rgb(${colours[1].r}, ${colours[1].g}, ${colours[1].b})` }} className="col-start-2 col-end-3"></div>
                <div style={{ backgroundColor: `rgb(${colours[2].r}, ${colours[2].g}, ${colours[2].b})` }} className="col-start-3 col-end-4"></div>
                <div style={{ backgroundColor: `rgb(${colours[3].r}, ${colours[3].g}, ${colours[3].b})` }} className="col-start-4 col-end-5"></div>
            </div>
            {/* {!userColor && <p>{((luminosity - getLuminosity(colours)) * 100 / luminosity).toFixed(2)}% Better</p>} */}
        </div>
    );
}
