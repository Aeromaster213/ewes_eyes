"use client"
import React, { useState } from "react";
import Fileupload from "@/components/fileupload";
import { Button } from "@/components/ui/button";
import TextInp from "@/components/textinp";
import SelectColour from "@/components/selectcolour";

export default function Gen() {

    const questions = [
        {
            component: <div>
                <Fileupload />
            </div>
        },
        {
            component: <div>
                <TextInp />
            </div>
        }, {
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
                        Next Step {question === 0 ? "(you can skip if you want to!)" : ""}
                    </Button>
                </div>
            </div>
        </div>
    )
}