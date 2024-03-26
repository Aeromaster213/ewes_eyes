"use client"
import React, { useState } from "react";
import Fileupload from "@/components/fileupload";
import { Button } from "@/components/ui/button";
import TextInp from "@/components/textinp";
import SelectColour from "@/components/selectcolour";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Gen() {

    const questions = [
        {
            component: <div>
                <Fileupload onSuccess={() => setQuestion(question + 1)} onError={() => toast.error("Error Uploading!")} />
            </div>
        },
        {
            component: <div>
                <TextInp onSuccess={() => setQuestion(question + 1)} onError={() => toast.error("Error Uploading!")} />
            </div>
        }, {
            component: <div>
                <SelectColour onSuccess={() => router.push("/final")} onError={() => toast.error("Error")} />
            </div>
        }
    ]

    const [question, setQuestion] = useState(0);
    const router = useRouter();
    return (
        <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {questions[question].component}
                <Toaster />
            </div>
        </div>
    )
}