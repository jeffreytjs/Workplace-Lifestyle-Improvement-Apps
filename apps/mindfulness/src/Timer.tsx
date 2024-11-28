import { useEffect, useRef, useState } from "react";

function leftpad(num: number) {
    return num < 10 ? '0' + num.toString() : num.toString();
}

export function Timer({
    timerDuration,
    backToMenu,
    videoRef
}: {
    timerDuration: number
    backToMenu: Function,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
}) {
    const [isPaused, setPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timerDuration * 60);
    const [className, setClassName] = useState("timer-div");
    const timer = useRef<number>();

    const stopTimer = () => {
        clearInterval(timer.current);
        backToMenu();
    }

    const updateTimer = () => {
        if (timeLeft > 0) {
            setTimeLeft((time) => time - 1);
        } else {
            stopTimer();
        }
    }

    const pauseTimer = () => {
        clearInterval(timer.current);
        setPaused(true);
        videoRef.current?.pause();
    }

    const resumeTimer = () => {
        clearInterval(timer.current);
        setPaused(false);
        timer.current = setTimeout(updateTimer, 1000);
        videoRef.current?.play();
    }

    useEffect(() => {
        resumeTimer();
        setTimeout(() => {
            setClassName(className + " disappearing-div")
        }, 3000)
    }, []);

    useEffect(() => {
        clearInterval(timer.current);
        timer.current = setTimeout(updateTimer, 1000);
    }, [timeLeft])

    return (
    <div className={className} style={{marginTop: "2rem"}}>
            <h2>{leftpad(Math.floor(timeLeft / 60))}:{leftpad(timeLeft % 60)}</h2>
        <div style={{marginTop: "-20px"}}>
            {isPaused
                ? <button onClick={resumeTimer}>Resume</button>
                : <button onClick={pauseTimer}>Pause</button>
            }
            <button onClick={stopTimer} style={{marginLeft: "20px"}}>Stop</button>
        </div>
    </div>
    );
}