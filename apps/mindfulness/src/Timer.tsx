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

    // Progress bar calculations
    const percent = timeLeft / (timerDuration * 60);
    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference * (1 - percent);

    return (
        <div className={className} style={{ marginTop: "2rem", padding: "0px 20px 20px 20px", background: "none", position: "relative" }}>
            <div className="circular-progress-container">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className={`circular-progress breathing-animation`}
                >
                    <circle
                        stroke="#e3f2fd"
                        fill="none"
                        strokeWidth={stroke}
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        style={{ opacity: 0.3 }}
                    />
                    <circle
                        stroke="#1976d2"
                        fill="none"
                        strokeWidth={stroke}
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                    <text
                        x="50%"
                        y="54%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="1.5em"
                        fill="#1976d2"
                        fontWeight="bold"
                    >
                        {leftpad(Math.floor(timeLeft / 60))}:{leftpad(timeLeft % 60)}
                    </text>
                </svg>
            </div>
            {isPaused && (
                <div className="pause-overlay">
                    Paused – Take a breath
                </div>
            )}
            <div style={{ marginTop: "-10px" }}>
                {isPaused
                    ? <button onClick={resumeTimer}>Resume</button>
                    : <button onClick={pauseTimer}>Pause</button>
                }
                <button onClick={stopTimer} style={{ marginLeft: "20px" }}>Stop</button>
            </div>
        </div>
    );
}