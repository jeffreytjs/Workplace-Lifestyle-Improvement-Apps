import { useState } from "react";

export default function ReleaseWorries() {
    const [text, setText] = useState("");

    return (
        <div className="flex-row">
            <input
                type="text"
                className="worries"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your worries here, and watch them fade away..."
            />
        </div>
    )
}