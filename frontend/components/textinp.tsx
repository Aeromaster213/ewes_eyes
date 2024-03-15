import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { uploadText } from "./functions";
import toast from "react-hot-toast";

export default function TextInp({onSuccess, onError}) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        setLoading(true);
        uploadText(description).then(() => {
            setLoading(false);
        });        
    };

    useEffect(() => {
        if (loading) {
            toast.loading("Uploading description...");
        } else {
            toast.dismiss();
        }
    
    }, [loading])

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-10 bg-white bg-opacity-70 rounded-xl border-r-2">
            <h1 className="text-5xl font-semibold text-center">Describe how you want the UI to be</h1>
            <div className="flex flex-col justify-center items-center gap-5 w-full">
                <Textarea placeholder="Describe..." className="resize-none" value={description} onChange={handleChange} />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}
