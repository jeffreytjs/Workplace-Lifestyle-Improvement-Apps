import { useRef, useState, useEffect } from "react";
import "./App.css";
import forestVideo from "./assets/forest.webm";
import rainVideo from "./assets/rain.mp4";
import backgroundVideo from "./assets/background.mp4";
import universe from "./assets/universe.mp3";
import logo from "./assets/logo.gif";
import { Timer } from "./Timer";
import MindfulnessQuotes from "./MindfulnessQuotes";

function App() {
  const [video, setVideo] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("background");
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);
  const [showMindfulQuotes, setShowMindfulQuotes] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const LOOP_BUFFER = 0.3; // 300ms before video end
    let isManualSeek = false;

    const handleTimeUpdate = () => {
      if (!isManualSeek && video.duration - video.currentTime <= LOOP_BUFFER) {
        isManualSeek = true;
        video.currentTime = 0;
        video.play().catch(() => {});
        requestAnimationFrame(() => (isManualSeek = false));
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const backToMenu = () => {
    setTimerRunning(false);
    setBackgroundClass("background background-fade-in");
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const start = () => {
    setTimerRunning(true);
    if (video !== "") {
      setBackgroundClass("background background-fade-out");
    }
  };

  console.log(audioRef.current?.currentTime);

  return (
    <>
      <video
        className={backgroundClass}
        src={backgroundVideo}
        autoPlay
        muted
        loop
      />
      <video className="mindfulness-video" src={video} ref={videoRef} loop />
      <audio src={universe} ref={audioRef} loop />
      {isTimerRunning ? (
        <Timer
          backToMenu={backToMenu}
          timerDuration={timerDuration}
          videoRef={videoRef}
          audioRef={video === "" ? audioRef : undefined}
        />
      ) : (
        <>
          <img
            src={logo}
            width="70%"
            style={{ minWidth: "350px", marginTop: "50px" }}
          />
          <div className="main-page">
            <div style={{ fontSize: "1.5em" }}>
              <div className="flex-row" style={{ flexDirection: "column", alignItems: "center", width: "100%" }}>
                <span style={{ fontWeight: "bold", fontSize: "1.1em", marginBottom: "8px" }}>Timer:</span>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", marginTop: "5px" }}>
                  <input
                    className="input-select"
                    type="number"
                    min="1"
                    max="120"
                    value={timerDuration}
                    onChange={(event) => {
                      const minutes = parseInt(event.target.value, 10) || 0;
                      setTimerDuration(minutes);
                    }}
                    style={{
                      textAlign: "center",
                      fontSize: "1.2em",
                      background: "#e3f2fd",
                      color: "#111",
                      border: "2px solid #1976d2",
                      borderRadius: "8px",
                      width: "80px",
                      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)"
                    }}
                  />
                  <span style={{ marginLeft: "8px", fontWeight: "bold", fontSize: "1.1em", color: "inherit" }}>min</span>
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", width: "100%" }}>
                  {[5, 10, 15, 25].map((preset) => (
                    <button
                      key={preset}
                      style={{ padding: "2px 10px", borderRadius: "6px", border: timerDuration === preset ? "2px solid #4caf50" : "1px solid #ccc", background: timerDuration === preset ? "#e8f5e9" : "#fff", cursor: "pointer" }}
                      onClick={() => setTimerDuration(preset)}
                    >
                      {preset} min
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-row" style={{ marginTop: "10px" }}>
                Theme:
                <select
                  onChange={(event) => setVideo(event.target.value)}
                  className="input-select"
                  value={video}
                >
                  <option style={{ color: "black" }} value="">
                    Default
                  </option>
                  <option style={{ color: "black" }} value={forestVideo}>
                    Forest
                  </option>
                  <option style={{ color: "black" }} value={rainVideo}>
                    Rain
                  </option>
                </select>
              </div>
              <div
                className="flex-row"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Show Mindfulness Quotes
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={showMindfulQuotes}
                  onChange={() => setShowMindfulQuotes(!showMindfulQuotes)}
                />
              </div>
            </div>
            <button onClick={start}>Start</button>
          </div>
        </>
      )}
      {isTimerRunning && showMindfulQuotes && <MindfulnessQuotes />}
    </>
  );
}

export default App;
