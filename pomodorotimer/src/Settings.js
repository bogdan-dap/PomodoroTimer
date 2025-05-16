import { useContext } from "react";
import "./App.css";
import "./Slider.css";
import ReactSlider from "react-slider";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

function Settings() {
  const context = useContext(SettingsContext);
  return (
    <div className="settingsGeneral">
      <label>Work: {context.workMinutes}:00 </label>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={context.workMinutes}
        onChange={(newValue) => context.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>Break: {context.breakMinutes}:00</label>
      <ReactSlider
        className="slider green"
        thumbClassName="thumb"
        trackClassName="track"
        value={context.breakMinutes}
        onChange={(newValue) => context.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div className="backButtonWarp">
        <BackButton onClick={() => context.setShowSettings(false)}/>
      </div>
    </div>
  );
}

export default Settings;
