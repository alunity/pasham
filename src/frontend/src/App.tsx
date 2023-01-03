import { useState } from "react";
import getResponse from "./api";
import "./App.css";
import Microphone from "./speechRecognition";

function App() {
  let [listening, setListening] = useState(false);
  let [speechInput, setSpeechInput] = useState("");
  let [response, setResponse] = useState("");

  function handleSpeechInput(text: string, final: boolean) {
    setSpeechInput(text);
    if (final) {
      fetchResponse(text);
    }
  }

  async function fetchResponse(query: string) {
    if (query !== "") {
      setResponse(await getResponse(query));
    }
  }

  return (
    <div>
      <h1>Hello</h1>
      <Microphone
        callback={(text: string, final: boolean) =>
          handleSpeechInput(text, final)
        }
        listening={listening}
        setListening={(value: boolean) => setListening(value)}
      />
      <p>{speechInput}</p>
      <button onClick={() => setListening(!listening)}>
        {listening ? "Stop" : "Start"} listening
      </button>
      <p>{response}</p>
    </div>
  );
}

export default App;
