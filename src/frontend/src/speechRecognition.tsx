import { useEffect, useRef, useState } from "react";
import getResponse from "./api";

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
// @ts-ignore
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
// @ts-ignore
const SpeechRecognitionEvent =
  // @ts-ignore
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

function Microphone() {
  let [listening, setListening] = useState(false);
  let [result, setResult] = useState("");
  let [response, setResponse] = useState("");
  let [recognition, setRecognition] = useState(new SpeechRecognition());

  useEffect(() => {
    // let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    if (listening === true) {
      recognition.start();
    } else if (listening === false) {
      recognition.stop();
    }

    // @ts-ignore
    recognition.onresult = (event) => {
      setResult(event.results[event.results.length - 1][0].transcript);
      if (event.results[event.results.length - 1].isFinal) {
        setListening(false);
        fetchResponse(event.results[event.results.length - 1][0].transcript);
      }
    };

    // // @ts-ignore
    // recognition.onspeechend = (event) => {
    //   console.log(event);
    // };
  }, [listening]);

  async function fetchResponse(query: string) {
    if (query !== "") {
      setResponse(await getResponse(query));
    }
  }

  return (
    <>
      <p>{result}</p>
      <button onClick={() => setListening(!listening)}>
        {listening ? "Stop" : "Start"} listening
      </button>
      <p>{response}</p>
    </>
  );
}

export default Microphone;
