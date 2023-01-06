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
  listeningForOtherInput: boolean;
  callback: Function;
}

const keywords = ["pasham", "pasha", "passion", "pacha", "pressure"];

function AlwaysListening(props: iProps) {
  let [recognition, setRecognition] = useState(new SpeechRecognition());
  // let listening = useRef(false);
  let [listening, setListening] = useState(false);

  useEffect(() => {
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // if (!listening.current && !props.listeningForOtherInput) {
    //   recognition.start();
    //   listening.current = true;
    // }

    // @ts-ignore
    recognition.onresult = (event) => {
      // console.log(event.results[event.results.length - 1][0].transcript);
      for (let i = 0; i < keywords.length; i++) {
        if (
          event.results[event.results.length - 1][0].transcript
            .toLowerCase()
            .includes(keywords[i])
        ) {
          props.callback();
          break;
        }
      }
    };

    recognition.onend = () => {
      if (!props.listeningForOtherInput && listening) {
        recognition.start();
      }
    };

    window.onfocus = () => {
      if (!listening && !props.listeningForOtherInput) {
        setListening(true);
        recognition.start();
      }
    };

    window.onblur = () => {
      if (listening) {
        setListening(false);
        recognition.stop();
      }
    };
    return () => {
      recognition.onend = () => {};
      window.onfocus = () => {};
      window.onblur = () => {};
    };
  }, [listening]);

  useEffect(() => {
    if (props.listeningForOtherInput && listening) {
      recognition.stop();
      setListening(false);
    } else if (!props.listeningForOtherInput && !listening) {
      recognition.start();
      setListening(true);
    }
  }, [props.listeningForOtherInput]);

  return null;
}

export default AlwaysListening;
