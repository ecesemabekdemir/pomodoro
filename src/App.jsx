import { useState, useRef, useEffect } from "react";
import "./App.css";

const buttons = ["pomodoro", "short break", "long break"];

export default function App() {
  const [inputValue, setInputValue] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [selectedMode, setSelectedMode] = useState("pomodoro");

  return (
    <>
      <div className="container">
        <Header />
        <div className="content">
          <ModeNav
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />
          <div className="circleBox">
            <Main inputValue={inputValue} selectedMode={selectedMode} />
          </div>
        </div>
        <Settings setInputValue={setInputValue} inputValue={inputValue} />
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <div className="header">
        <h1>pomodoro</h1>
      </div>
    </>
  );
}

function ModeNav({ selectedMode, setSelectedMode }) {
  return (
    <div className="mode">
      <div className="modeBtn">
        {buttons.map((x, i) => (
          <button
            key={i}
            className={selectedMode === x ? "selected" : " "}
            onClick={() => setSelectedMode(x)}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
}

function Main({ inputValue, selectedMode }) {
  const [timer, setTimer] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (selectedMode === "pomodoro") {
      setTimer(inputValue.pomodoro);
    } else if (selectedMode === "short break") {
      setTimer(inputValue.shortBreak);
    } else if (selectedMode === "long break") {
      setTimer(inputValue.longBreak);
    }
  }, [inputValue, selectedMode]);

  console.log(inputValue);
  console.log(timer);
  return (
    <>
      <div className="circle">
        <div className="textBox">
          <div className="text">
            <h1>{timer}</h1>
            <button className={running ? "PAUSE" : "START"}>RESTART</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Settings({ setInputValue, inputValue }) {
  const ModalRef = useRef(null);
  const [pomodoro, setPomodoro] = useState(inputValue.pomodoro);
  const [shortBreak, setShortBreak] = useState(inputValue.shortBreak);
  const [longBreak, setLongBreak] = useState(inputValue.longBreak);

  function openModal() {
    ModalRef.current.showModal();
  }

  function closeModal() {
    ModalRef.current.close();
  }

  const handleSaved = (e) => {
    e.preventDefault();
    setInputValue({
      pomodoro,
      shortBreak,
      longBreak,
    });
    closeModal();
  };

  return (
    <div className="settings">
      <button className="btn" onClick={openModal}>
        <img src="/img/Shape.svg" alt="setting" />
      </button>
      <Modal
        closeModal={closeModal}
        ModalRef={ModalRef}
        handleSaved={handleSaved}
        setPomodoro={setPomodoro}
        setShortBreak={setShortBreak}
        setLongBreak={setLongBreak}
      />
    </div>
  );
}

function Modal({
  closeModal,
  handleSaved,
  ModalRef,
  setPomodoro,
  setLongBreak,
  setShortBreak,
  pomodoro,
  longBreak,
  shortBreak,
}) {
  return (
    <dialog className="modal" ref={ModalRef}>
      <div className="modalHeader">
        <h1>Settings</h1>
        <button className="exit" onClick={closeModal}>
          X
        </button>
      </div>
      <h3 className="modaltimetitle">TİME (MINUTES)</h3>
      <div className="modaltime">
        <div className="item">
          <p>pomodoro</p>
          <input
            type="number"
            name="pomodoro"
            min="0"
            max="999"
            value={pomodoro}
            onChange={(e) => setPomodoro(e.target.value)}
          />
        </div>
        <div className="item">
          <p>short break</p>
          <input
            type="number"
            name="shortBreak"
            min="0"
            max="999"
            value={shortBreak}
            onChange={(e) => setShortBreak(e.target.value)}
          />
        </div>
        <div className="item">
          <p>long break</p>
          <input
            type="number"
            name="longBreak"
            min="0"
            max="999"
            value={longBreak}
            onChange={(e) => setLongBreak(e.target.value)}
          />
        </div>
      </div>
      <div className="font">
        <h1>FONT</h1>
        <div className="fontBtnBox">
          <button className="fontBtn">Aa</button>
          <button className="fontBtn">Aa</button>
          <button className="fontBtn">Aa</button>
        </div>
      </div>
      <div className="color">
        <h1>COLOR</h1>
        <div className="colorBtnBox">
          <button className="colorBtn"> </button>
          <button className="colorBtn"> </button>
          <button className="colorBtn"> </button>
        </div>
      </div>
      <button onClick={handleSaved} className="apply">
        Apply
      </button>
    </dialog>
  );
}
