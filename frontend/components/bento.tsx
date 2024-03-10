"use client"
import React from "react";
import Image from "next/image";


const content = [
  {
    title: "Use Energy Effecient Colour Schemes",
    description: "Colors play a crucial role in the user interface, but not all color choices are equal when it comes to energy consumption.",
    content: "/color.png"
  },
  {
    title: "Reduce Bright colours",
    description: "Can help mobile developers create more energy efficient software as the display of a mobile device is oftern the most energy consuming component.",
    content: "/bright.png"
  }
]

interface CardProp{
  title: string;
  description: string;
  content: string;
}

export const Card = ({title, description, content}: CardProp) => {
  return(
    <div className="grid grid-rows-1 grid-cols-5 p-10 min-h-60 max-w-[1000px] mx-auto">
      <div className="col-start-1 col-end-3 p-10 flex items-center justify-center bg-gradient-to-r from-theme-purple to-theme-blue rounded-lg">
        <Image src={content} alt="content" width={100} height={100}  />
      </div>
      <div className="col-start-3 col-end-6 p-10 flex-col items-center justify-center">
        <p className="font-bold text-xl text-center">{title}</p>
        <p className="text-center">{description}</p>
      </div>
    </div>
  )
}


export function BentoGridDemo() {
  return (
    <div className="flex-col justify-center items-center bg-black text-white">
      {content.map((item, index) => <Card key={index} {...item} />)}
    </div>
  );
}