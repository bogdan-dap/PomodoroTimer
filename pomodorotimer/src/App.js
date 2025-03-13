import "./App.css";

function App() {
  return (
    <>
      <head>
        <title> Pomodoro App</title>
      </head>
      <body>
        <div className="timer-buttons">
          <button className="timer-btn pomodoro active" data-time="1500">
            Pomodoro
          </button>
          <button className="timer-btn short-breack" data-time="300">
            Short Brrack
          </button>
          <button className="timer-btn long-breack" data-time="900">
            Long Breack
          </button>
        </div>
        <div className="circle">
          <div className="countdown">
            <h1></h1>
            <p className="play-pause"></p>
          </div>
        </div>
      </body>
    </>
  );
}

export default App;

<script>
  const POMODORO = 1500;
  const SHORT_BREAK = 300;
  const LONG_BREACK = 900;

  const timerButton = document.querySelectorAll(".timer-btn");
  
</script>