import { useEffect, useState } from "react";
import AlwaysListening from "./alwaysListening";
import getResponse from "./api";
import "./App.css";
import Microphone from "./speechRecognition";

const synth = window.speechSynthesis;
const voices = synth.getVoices();
let selectedVoice = voices[0];

for (let i = 0; i < voices.length; i++) {
  if (voices[i].localService) {
    selectedVoice = voices[i];
    break;
  }
}

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

  let [loading, setLoading] = useState(false);

  function handleSpeechInput(text: string, final: boolean) {
    window.scrollTo(0, document.body.scrollHeight);
    if (final) {
      setSpeechInput("");
      if (history === undefined) {
        setHistory([{ text: text, user: true }]);
      } else {
        setHistory([...history, { text: text, user: true }]);
      }
      setLoading(true);
      fetchResponse(text);
    } else {
      setSpeechInput(text);
    }
  }

  function removeEmojis(input: string) {
    return input.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
  }

  useEffect(() => {
    if (response != "") {
      if (response.includes("%AA")) {
        window.scrollTo(0, document.body.scrollHeight);
        let utterance = new SpeechSynthesisUtterance(
          removeEmojis(response.split("%AA")[0])
        );
        utterance.voice = selectedVoice;
        synth.speak(utterance);

        // 2Words/s

        let timeToSay = (response.split("%AA").length / 2) * 2000 + 500;

        if (history === undefined) {
          setHistory([{ text: response.split("%AA")[0], user: false }]);
        } else {
          setHistory([
            ...history,
            { text: response.split("%AA")[0], user: false },
          ]);
        }
        setTimeout(() => {
          setResponse(response.split("%AA").slice(1).join("%AA"));
        }, timeToSay);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
        let utterance = new SpeechSynthesisUtterance(removeEmojis(response));
        utterance.voice = selectedVoice;
        synth.speak(utterance);
        setLoading(false);

        if (history === undefined) {
          setHistory([{ text: response, user: false }]);
        } else {
          setHistory([...history, { text: response, user: false }]);
        }
        setResponse("");
      }
    }
  }, [response]);

  useEffect(() => {
    if (listening) {
      synth.cancel();
    }
  }, [listening]);

  useEffect(() => {
    if (loading) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [loading]);

  async function fetchResponse(query: string) {
    if (query !== "") {
      setResponse(await getResponse(query));
    }
  }

  function handleKeyWord() {
    setListening(true);
  }

  let bubbles = history?.map((x, i) => {
    let classx = "";

    if (x.user) {
      return (
        <div className={"row"} key={i}>
          <div className="col"></div>
          <div className="col">
            <div className="left p-3 mt-1 card colour1">
              <p className="">{x.text}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row" key={i}>
          <div className="col">
            <div className="left p-3 mt-1 card colour4">
              <p className="">{x.text}</p>
            </div>
          </div>
          <div className="col"></div>
        </div>
      );
    }
  });

  return (
    <div className="container-sm center noScrollbar">
      <div className="row fixedPosition pt-3 colour0">
        <h1 className="gotham-bold">PASHAM</h1>
        <Microphone
          callback={(text: string, final: boolean) =>
            handleSpeechInput(text, final)
          }
          listening={listening}
          setListening={(value: boolean) => setListening(value)}
        />

        <AlwaysListening
          listeningForOtherInput={loading ? false : listening}
          callback={() => handleKeyWord()}
        />
      </div>
      <div className="scroll offset">
        {bubbles}
        <div className={"row " + (listening ? "fadeIn" : "hidden disappear")}>
          <div className="col"></div>
          <div className="col">
            <div className="left p-3 mt-1 card colour1">
              <p className="">{speechInput}</p>
            </div>
          </div>
        </div>
        <div className={"row " + (loading ? "fadeIn" : "hidden disappear")}>
          <div className="col">
            <div className="left p-3 card mt-1 colour4">
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <i
        className={"gg-mic bottom-left" + (listening ? " mic-active" : "")}
        onClick={() => setListening(loading ? false : !listening)}
      ></i>
    </div>
  );
}

export default App;
