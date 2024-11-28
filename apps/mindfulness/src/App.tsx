import { useRef, useState } from "react";
import "./App.css";
import forestVideo from "./assets/forest.webm";
import rainVideo from "./assets/rain.webm";
import backgroundVideo from "./assets/background.mp4";
import logo from "./assets/logo.gif";
import { Timer } from "./Timer";

function App() {
  const [video, setVideo] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("background");
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);
  const [showMindfulQuotes, setShowMindfulQuotes] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const backToMenu = () => {
    setTimerRunning(false);
    setBackgroundClass("background background-fade-in");
    videoRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const start = () => {
    setTimerRunning(true);
    if (video !== "") {
      setBackgroundClass("background background-fade-out");
    }
  };

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
      {isTimerRunning ? (
        <Timer
          backToMenu={backToMenu}
          timerDuration={timerDuration}
          videoRef={videoRef}
        />
      ) : (
        <>
          <img src={logo} width="70%" style={{ marginTop: "50px" }} />
          <div className="main-page">
            <div style={{ fontSize: "1.5em" }}>
              <div className="flex-row">
                Timer (minutes):
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
                />
              </div>
              <div className="flex-row" style={{ marginTop: "10px" }}>
                Theme:
                <select
                  onChange={(event) => setVideo(event.target.value)}
                  className="input-select"
                >
                  <option value="">None</option>
                  <option value={forestVideo}>Forest</option>
                  <option value={rainVideo}>Rain</option>
                </select>
              </div>
              <div
                className="flex-row"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Show Mindful Quotes
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
    </>
  );
}

export default App;
