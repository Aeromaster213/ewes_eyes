import React, { useState, useEffect } from "react";
import ColourCard from "./colourCard";
import { changeColour, getInputColors, getLuminosity } from "./functions";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useColorContext } from "@/app/context";


export default function SelectColour({ onSuccess, onError }) {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [colors, setColors] = useState([]);
    const [userColor, setUserColor] = useState([{ r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }]);
    const [selectedColor, setSelectedColor] = useState({});
    const { colors: contextColors, setColors: setContextColors, luminosity, setLuminosity } = useColorContext();

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
        for (let i = 0; selectedArrays.length < 4 && i < 100; i++) {
            // Select 4 unique objects from the shuffledColors array
            const selectedObjects = [];
            while (selectedObjects.length < 4) {
                const randomIndex = Math.floor(Math.random() * shuffledColors.length);
                const selectedColor = shuffledColors[randomIndex];
                if (!selectedObjects.some(obj => obj === selectedColor)) {
                    selectedObjects.push(selectedColor);
                }
            }
            if (getLuminosity(selectedObjects) <= luminosity){
                console.log("this is the luminosity: ", getLuminosity(selectedObjects));
                selectedArrays.push(selectedObjects);
            }
        }

        return selectedArrays;
    }

    useEffect(() => {
        setLuminosity(getLuminosity(userColor));
        // Generate the colors array once when the component mounts
        getInputColors().then((data) => {
            console.log(data)
            const arrayOfObjects = data.inputColors.map((array) => {
                return { r: array[0], g: array[1], b: array[2] };
            });
            setUserColor(arrayOfObjects);
            console.log("this is the input: ", arrayOfObjects);
            setLuminosity(getLuminosity(userColor));
        });
    }, []);
    
    console.log("these are the user colours: ", userColor);
    useEffect(() => {
        // Generate the colors array once when the component mounts
        setColors(selectArrays());
    }, []); // Empty dependency array ensures it runs only once when component mounts




    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
        if (index === -1) {
            setSelectedColor({ colors: userColor });
        } else {
            setSelectedColor({ colors: colors[index] });
        }
        console.log(selectedColor);
    };

    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-3 bg-opacity-70 p-10 rounded-xl border-r-2 bg-white">
            <div className="col-start-1 col-end-5 flex flex-col items-center justify-center row-start-1 row-end-2 p-1" style={{ border: selectedCardIndex === -1 ? "2px solid black" : "none", borderRadius: selectedCardIndex === -1 ? "8px" : "none" }} onClick={() => handleCardClick(-1)}>
                <ColourCard colours={userColor} userColor = {true} />
                <p>These are the colours of your existing GUI</p>
            </div>
            {colors.map((colours, index) => (
                <div key={index} className={`col-start-${index % 2 === 0 ? "1" : "3"} col-end-${index % 2 === 0 ? "3" : "5"} row-start-${Math.floor(index / 2) + 2} row-end-${Math.floor(index / 2) + 3} flex flex-col items-center justify-center p-1`} style={{ border: selectedCardIndex === index ? "2px solid black" : "none", borderRadius: selectedCardIndex === index ? "8px" : "none" }} onClick={() => handleCardClick(index)}>
                    <ColourCard colours={colours} />
                </div>
            ))}
            <Button className="col-start-2 col-end-4" onClick={() => {
                setContextColors(selectedColor);
                toast.promise(changeColour(selectedColor, onSuccess, onError), {
                    loading: 'Changing Colour...',
                    success: 'Colour changed successfully!',
                    error: 'Error changing colour'
                })
            }}>Submit Colour</Button>
        </div>
    );
}
