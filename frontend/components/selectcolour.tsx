import React from "react";
import { getInputColors } from "./functions";
import ColourCard from "./colourCard";

export default function SelectColour() {
    const colors = getInputColors();
    console.log(colors);
    return (
        <div>
            <ColourCard colours={[{r: 125, g:125, b:125}, {r: 200, g: 200, b : 200}, {r:12, g: 45, b:34},{r:125,g:125,b:125}]} />
        </div>
    )
}