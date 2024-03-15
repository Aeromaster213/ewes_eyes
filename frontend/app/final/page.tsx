"use client"
import { About } from "@/components/about";
import { Navigation } from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { useColorContext } from "@/app/context";
import ColourCard from "@/components/colourCard";
import { changeColour, getGeneratedImage, getUpdatedimage } from "@/components/functions";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { text } from "stream/consumers";
const colorsArray = require("@/color.json");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectArrays() {
    const shuffledColors = shuffleArray([...colorsArray]);
    const selectedArrays = [];

    for (let i = 0; i < 500; i++) {
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

const loadingStates = [
    {
        text: "Uploading Image"
    },
    {
        text: "Generating UI"
    },
    {
        text: "Retrieving Image"
    },
]

export default function Final() {
    const onSuccess = () => {
        console.log("Success");
    };
    const onError = () => {
        console.log("Error");
    };
    const { colors, setColors } = useColorContext();
    const [optionColours, setOptionColours] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [selectedColor, setSelectedColor] = useState(colors.colors);
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleCardClick = async (index) => {
        setSelectedCardIndex(index);
        setSelectedColor(optionColours[index]);
        try {
            toast.promise(changeColour({ colors: optionColours[index] }, onSuccess, onError), {
                loading: "Changing Colour...",
                success: "Colour Changed!",
                error: "Error changing colour",
            });
            setLoading(true)
            const img = await getUpdatedimage().finally(() => setLoading(false));
            console.log("img: ", img)
            const imageUrl = URL.createObjectURL(new Blob([img], { type: 'image/png' }));
            setImageData(imageUrl);
            toast.success("Updated image retrieved!");
            console.log("img: ", img)
        } catch (error) {
            console.error("Error getting updated image:", error);
            toast.error("Error getting updated image");
        }
    };

    useEffect(() => {
        setOptionColours(selectArrays());
        async function fetchImage() {
            try {
                setLoading(true)
                const img = await getGeneratedImage().finally(() => setLoading(false));
                console.log("img: ", img)
                const imageUrl = URL.createObjectURL(new Blob([img], { type: 'image/png' }));
                setImageData(imageUrl);
                toast.success("Initial image retrieved!");
            } catch (error) {
                console.error("Error getting initial image:", error);
                toast.error("Error getting initial image");
            }
        }
        fetchImage();
    }, []);

    return (
        <main>
            <Navigation />
            <div className="w-screen h-screen bg-gradient-to-r from-rose-100 to-teal-100 text-black">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10">
                    <div className="grid grid-cols-2 grid-row-6 bg-white bg-opacity-70 p-10 rounded-xl gap-3">
                        <div className="col-start-1 col-end-3 row-start-1 row-end-2">
                            <h1 className="text-4xl font-semibold text-center">This is the Generated UI</h1>
                        </div>
                        <div className="col-start-1 col-end-2 row-start-2 row-end-6">
                            {imageData ? (
                                <Image
                                    src={`${imageData}`}
                                    alt="generated image"
                                    height={300}
                                    width={300}
                                />
                            ) :
                                <div className="flex flex-col items-center justify-center p-10">
                                    <div style={{ animation: 'rotate 2s linear infinite' }}>
                                        <RotateCcw size={100} />
                                    </div>
                                    <style jsx>{`
                            @keyframes rotate {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform:rotate(-360deg);
                                }
                            }
                        `}</style>
                                </div>
                            }
                            <MultiStepLoader loading={loading} duration={5000} loadingStates={loadingStates} />

                        </div>
                        <div className="col-start-1 col-end-2 row-start-6 row-end-7">
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <ColourCard colours={selectedColor} />
                                <h1>The Selected Color</h1>
                            </div>
                        </div>
                        <div className="col-start-2 col-end-3 row-start-2 row-end-7" style={{ maxHeight: "700px", overflowY: "auto" }}>
                            {optionColours.map((colours, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center p-1`}
                                    style={{ border: selectedCardIndex === index ? "2px solid black" : "none", borderRadius: selectedCardIndex === index ? "8px" : "none" }}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <ColourCard colours={colours} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
            <About id="about" />
        </main>
    );
}
