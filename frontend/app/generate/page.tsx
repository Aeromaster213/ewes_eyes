"use client"
import React, { useState } from "react";
import Fileupload from "@/components/fileupload";
import { Button } from "@/components/ui/button";
import TextInp from "@/components/textinp";
import SelectColour from "@/components/selectcolour";

export default function Gen() {

    const questions = [
        {
            component: <div className="flex-col items-center text-center ">
                <div className="flex items-center">
                    <h1 className="mr-3 text-5xl font-semibold">Upload a Reference Image</h1>
                </div>
                <p className="max-w-xl mt-1 text-lg text-slate-800">
                    Upload an image to give our AI an idea of what you are looking for in terms of theming and colours
                </p>
                <Fileupload />

            </div>
        },
        {
            component: <div>
                <TextInp />
            </div>
        },{
            component: <div>
                <SelectColour />
            </div>
        }
    ]

    const [question, setQuestion] = useState(0);

    return (
        <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {questions[question].component}
                <div className="flex justify-center items-center gap-8 mt-5">
                    <Button onClick={() => {
                        if (question < questions.length - 1)
                            setQuestion(question + 1)
                        else
                            setQuestion(0)
                    }}>
                        Next Step { question === 0 ? "(you can skip if you want to!)" : ""}
                    </Button>
                </div>
            </div>
        </div>
    )
}