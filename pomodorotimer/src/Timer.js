import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./SettingsContext";
import { renderToStaticMarkup } from "react-dom/server";

const greenB = "#4aec8c";
const blueW = "rgba(62, 152, 199, ${percentage / 100})";

function Timer() {
    const settingsInfo = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState('work'); // work/break/null

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current --;
        setSecondsLeft(secondsLeftRef.current);
    }

    // function initTimer() {
    //     setSecondsLeft(settingsInfo.workMinutes * 60)
    // }

    useEffect(() => {

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60);
        
        setMode(nextMode);
        modeRef.current = nextMode;
        
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
        
        //initTimer();

        const interval = setInterval(() => {
            if(isPausedRef.current) {
                return;
            }
            if(secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'work' 
    ? settingsInfo.workMinutes * 60 
    : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    
  return (
    <div>
      <CircularProgressbar 
      value={percentage} 
      text={minutes + ':' + seconds} 
      styles={buildStyles({
        textColor:mode === 'work' ? blueW: greenB,
        pathColor:mode === 'work' ? blueW: greenB,
        tailColor:'rgba(255,255,255,.2)',
  })}/>
      <div className="functionalButtons">
        {isPaused 
        ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} /> 
        : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
        
      </div>
      <div className="functionalButtons">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
      </div>
    </div>
  );
}

export default Timer;
