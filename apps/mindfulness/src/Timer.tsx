import { useEffect, useRef, useState } from "react";

function leftpad(num: number) {
    return num < 10 ? '0' + num.toString() : num.toString();
}

export function Timer({
    timerDuration,
    backToMenu,
    videoRef,
    audioRef
}: {
    timerDuration: number
    backToMenu: Function,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
    audioRef?: React.MutableRefObject<HTMLAudioElement | null>
}) {
    const [isPaused, setPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timerDuration * 60);
    const [className, setClassName] = useState("");
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
        audioRef?.current?.pause();
    }

    const resumeTimer = () => {
        clearInterval(timer.current);
        setPaused(false);
        timer.current = setTimeout(updateTimer, 1000);
        videoRef.current?.play();
        audioRef?.current?.play();
    }

    // Fade in audio at start
    useEffect(() => {
        resumeTimer();
        setTimeout(() => {
            setClassName(className + " disappearing-div")
        }, 2000)
        if (audioRef?.current) {
            audioRef.current.volume = 0;
            let vol = 0;
            const fadeIn = setInterval(() => {
                vol += 0.05;
                if (audioRef.current) {
                    audioRef.current.volume = Math.min(vol, 1);
                }
                if (vol >= 1) clearInterval(fadeIn);
            }, 100);
        }
    }, []);

    // Fade out audio in last 5 seconds
    useEffect(() => {
        clearInterval(timer.current);
        timer.current = setTimeout(updateTimer, 1000);
        if (audioRef?.current && timeLeft <= 5 && timeLeft > 0) {
            let vol = audioRef.current.volume;
            const fadeOut = setInterval(() => {
                vol -= 0.2;
                if (audioRef.current) {
                    audioRef.current.volume = Math.max(vol, 0);
                }
                if (vol <= 0 || timeLeft === 0) clearInterval(fadeOut);
            }, 200);
        }
    }, [timeLeft])

    return (
    <div className={className} style={{marginTop: "2rem", padding: "0px 20px 20px 20px", background: "none"}}>
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