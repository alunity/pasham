import { useEffect, useRef, useState } from "react";

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
// @ts-ignore
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
// @ts-ignore
const SpeechRecognitionEvent =
  // @ts-ignore
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

interface iProps {
  callback: Function;
  listening: boolean;
  setListening: Function;
}

function Microphone(props: iProps) {
  let [recognition, setRecognition] = useState(new SpeechRecognition());

  useEffect(() => {
    // let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    if (props.listening === true) {
      recognition.start();
    } else if (props.listening === false) {
      recognition.stop();
    }

    // @ts-ignore
    recognition.onresult = (event) => {
      let final = false;
      if (event.results[event.results.length - 1].isFinal) {
        props.setListening(false);
        final = true;
      }
      props.callback(
        event.results[event.results.length - 1][0].transcript,
        final
      );
    };
  }, [props.listening]);

  return null;
}

export default Microphone;
