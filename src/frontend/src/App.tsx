import { useEffect, useState } from "react";
import AlwaysListening from "./alwaysListening";
import getResponse from "./api";
import "./App.css";
import Microphone from "./speechRecognition";

const synth = window.speechSynthesis;

function App() {
  let [listening, setListening] = useState(false);
  // False -> Listening for keywords (hey pasham)
  // True -> listening for request

  interface historyNodes {
    text: string;
    user: boolean;
  }

  let [history, setHistory] = useState<Array<historyNodes>>();

  let [speechInput, setSpeechInput] = useState("");
  let [response, setResponse] = useState("");

  function handleSpeechInput(text: string, final: boolean) {
    setSpeechInput(text);
    if (final) {
      if (history === undefined) {
        setHistory([{ text: text, user: true }]);
      } else {
        setHistory([...history, { text: text, user: true }]);
      }
      fetchResponse(text);
    }
  }

  useEffect(() => {
    if (response != "") {
      let utterance = new SpeechSynthesisUtterance(response);
      synth.cancel();
      synth.speak(utterance);

      if (history === undefined) {
        setHistory([{ text: response, user: false }]);
      } else {
        setHistory([...history, { text: response, user: false }]);
      }
    }
  }, [response]);

  async function fetchResponse(query: string) {
    if (query !== "") {
      setResponse(await getResponse(query));
    }
  }

  function handleKeyWord() {
    setListening(true);
  }

  return (
    <div className="center container">
      <div className="row">
        <h1 className="gotham-bold">PASHAM</h1>
        <Microphone
          callback={(text: string, final: boolean) =>
            handleSpeechInput(text, final)
          }
          listening={listening}
          setListening={(value: boolean) => setListening(value)}
        />
        <p>{speechInput}</p>
        <button className="" onClick={() => setListening(!listening)}>
          {listening ? "Stop" : "Start"} listening
        </button>
        <p>{response}</p>
        <AlwaysListening
          listeningForOtherInput={listening}
          callback={() => handleKeyWord()}
        />
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="left p-3 card colour1">
            <p className="">{speechInput}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="left p-2 card colour4">
            <p className="">{response}</p>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default App;
