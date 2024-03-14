import React, { useState, useEffect } from "react";
import ColourCard from "./colourCard";

// Input array containing 180 objects
const colorsArray = require("../color.json");

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to select 4 arrays of 4 objects each
function selectArrays() {
    // Shuffle the colorsArray to ensure randomness
    const shuffledColors = shuffleArray([...colorsArray]);
    const selectedArrays = [];

    // Iterate to select 4 arrays
    for (let i = 0; i < 4; i++) {
        // Select 4 unique objects from the shuffledColors array
        const selectedObjects = [];
        while (selectedObjects.length < 4) {
            const randomIndex = Math.floor(Math.random() * shuffledColors.length);
            const selectedColor = shuffledColors[randomIndex];
            if (!selectedObjects.some(obj => obj === selectedColor)) {
                selectedObjects.push(selectedColor);
            }
        }
        selectedArrays.push(selectedObjects);
    }

    return selectedArrays;
}

export default function SelectColour() {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        // Generate the colors array once when the component mounts
        setColors(selectArrays());
    }, []); // Empty dependency array ensures it runs only once when component mounts

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };

    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-3">
            <div className="col-start-1 col-end-5 flex flex-col items-center justify-center row-start-1 row-end-2" style={{ border: selectedCardIndex === -1 ? "2px solid black" : "none" }} onClick={() => handleCardClick(-1)}>
                <ColourCard colours={[{ r: 125, g: 125, b: 125 }, { r: 200, g: 200, b: 200 }, { r: 12, g: 45, b: 34 }, { r: 125, g: 125, b: 125 }]} />
                <p>These are the colours of your existing GUI</p>
            </div>
            {colors.map((colours, index) => (
                <div key={index} className={`col-start-${index % 2 === 0 ? "1" : "3"} col-end-${index % 2 === 0 ? "3" : "5"} row-start-${Math.floor(index / 2) + 2} row-end-${Math.floor(index / 2) + 3} flex flex-col items-center justify-center`} style={{ border: selectedCardIndex === index ? "2px solid black" : "none" }} onClick={() => handleCardClick(index)}>
                    <ColourCard colours={colours} />
                </div>
            ))}
        </div>
    );
}
