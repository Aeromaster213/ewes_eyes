import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { uploadText } from "./functions";

export default function TextInp() {
    const [description, setDescription] = useState("");

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        uploadText(description);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl font-semibold">Describe how you want the UI to be</h1>
            <div className="flex flex-col justify-center items-center gap-5 w-full">
                <Textarea placeholder="Describe..." className="resize-none" value={description} onChange={handleChange} />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}
