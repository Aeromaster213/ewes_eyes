import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
interface AboutProps{
    id: string
}
export function About({id}: AboutProps) {
    return (
        <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-3xl lg:text-5xl" id={id}>
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/60">
                    About Us<br />
                    <span className="text-2xl md:text-2xl lg:text-3xl">
                        Our team works on developing sustainable solutions to possible problems in the realm of Computer Science<br /> Our website uses complex computer vision and generative AI techniques to solve the problem of high energy consumption of graphical user interfaces, and provides alternative ideas to UI designers and web developers
                    </span>
                    <br />
                </p>
            </div>
        </BackgroundGradientAnimation>
    );
}
