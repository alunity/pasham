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

const keywords = ["pasham", "pasha", "passion", "pacha"];

function AlwaysListening(props: iProps) {
  let [recognition, setRecognition] = useState(new SpeechRecognition());
  let listening = useRef(false);

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
      console.log(event.results[event.results.length - 1][0].transcript);
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
      if (!props.listeningForOtherInput && listening.current) {
        recognition.start();
      }
    };

    window.onfocus = () => {
      if (!listening.current && !props.listeningForOtherInput) {
        recognition.start();
        listening.current = true;
      }
    };

    window.onblur = () => {
      if (listening.current) {
        listening.current = false;
        recognition.stop();
      }
    };

    recognition;
  }, []);

  useEffect(() => {
    if (props.listeningForOtherInput && listening.current) {
      recognition.stop();
      listening.current = false;
    } else if (!props.listeningForOtherInput && !listening.current) {
      recognition.start();
      listening.current = true;
    }
  }, [props.listeningForOtherInput]);

  return null;
}

export default AlwaysListening;
