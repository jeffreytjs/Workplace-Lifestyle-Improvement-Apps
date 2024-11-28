import { useRef, useState } from 'react';
import './App.css'
import forestVideo from './assets/forest.webm';
import rainVideo from './assets/rain.webm';
import backgroundVideo from "./assets/background.mp4";
import { Timer } from './Timer';

function App() {
  const [video, setVideo] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("background");
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10);

  const videoRef = useRef<HTMLVideoElement>(null);

  const backToMenu = () => {
    setTimerRunning(false);
    setBackgroundClass("background background-fade-in");
    videoRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  const start = () => {
    setTimerRunning(true);
    if (video !== "") {
      setBackgroundClass("background background-fade-out");
    }
  }

  return (
    <>
      <video className={backgroundClass} src={backgroundVideo} autoPlay muted loop />
      <video className="mindfulness-video" src={video} ref={videoRef} loop />
      {/*<iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&controls=0" style={{pointerEvents: "none"}}>
      </iframe>*/}
      {isTimerRunning ? <Timer
          backToMenu={backToMenu}
          timerDuration={timerDuration}
          videoRef={videoRef}
        /> : (
        <div className="main-page">
          <h1>Mindfulness & Focus Timer</h1>
          <div style={{fontSize: "1.5em"}}>
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
              <div className="flex-row">
                  Theme:
                  <select onChange={(event) => setVideo(event.target.value)} className="input-select">
                      <option value="">None</option>
                      <option value={forestVideo}>Forest</option>
                      <option value={rainVideo}>Rain</option>
                  </select>
              </div>
              <div className="flex-row" style={{marginBottom: "10px"}}>
                  Show Timer
                  <input type="checkbox" />
              </div>
          </div>

          <button onClick={start}>Start</button>
        </div>
         )
      }
    </>
  )
}

export default App
