import { useEffect, useState } from "react";
import AlwaysListening from "./alwaysListening";
import { getResponse, translate } from "./api";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Settings from "./setting";
import Microphone from "./speechRecognition";
import StartUp from "./startup";

const synth = window.speechSynthesis;

function App() {
  let [listening, setListening] = useState(false);
  // False -> Listening for keywords (hey pasham)
  // True -> listening for request

  interface historyNodes {
    text: string;
    user: boolean;
  }
  // let [language, setLanguage] = useState("en-GB");
  let [language, setLanguage] = useState(getLanguage());

  let [history, setHistory] = useState<Array<historyNodes>>();

  let [speechInput, setSpeechInput] = useState("");
  let [response, setResponse] = useState("");

  let [loading, setLoading] = useState(false);

  let [voices, setVoices] = useState(synth.getVoices());
  let [selectedVoice, setVoice] = useState(voices[0]);
  let [validLanguages, setValidLanguages] = useState<ilanguages>({});

  let [isAlwaysListeningAllowed, setIsAlwaysListeningAllowed] = useState(true);

  let [name, setName] = useState(getName());

  interface ilanguages {
    [index: string]: SpeechSynthesisVoice;
  }

  let [settingsOpen, setSettingsOpen] = useState(false);

  let [firstInteractionUser, setFirstInteractionUser] = useState(false);
  let [firstMessage, setFirstMessage] = useState(false);

  function getName() {
    let name = localStorage.name;

    if (name === undefined) {
      return "";
    } else {
      return name;
    }
  }

  function saveName(name: string) {
    localStorage.name = name;
  }

  function getLanguage() {
    let language = localStorage.lang;

    if (language === undefined) {
      return "en-GB";
    } else {
      return language;
    }
  }

  function saveLanguage(lang: string) {
    localStorage.lang = lang;
  }

  const greetings = [
    "Hi",
    "Hello",
    "What's up?",
    "Good to see you",
    "Nice to see you",
    "Long time no see",
    "Welcome",
    "Greetings",
    "Salutations",
  ];

  function getRandomElement(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function handleSpeechInput(text: string, final: boolean) {
    window.scrollTo(0, document.body.scrollHeight);
    if (final) {
      setSpeechInput("");
      if (history === undefined) {
        setHistory([{ text: text, user: true }]);
      } else {
        setHistory([...history, { text: text, user: true }]);
      }
      if (name === "") {
        setName(text);
        saveName(text);
        setLoading(true);
        forceSetResponse(`${getRandomElement(greetings)}, ${text}`);
        setFirstMessage(true);
      } else {
        setLoading(true);
        fetchResponse(text);
      }
    } else {
      setSpeechInput(text);
    }
  }

  async function forceSetResponse(text: string) {
    setResponse(await translate(text, language.split("-")[0]));
  }

  useEffect(() => {
    if (!loading && name == "" && firstInteractionUser) {
      forceSetResponse("Hello%AAWhat is your name?");
    } else if (!loading && firstInteractionUser) {
      setLoading(true);
      forceSetResponse(`${getRandomElement(greetings)}, ${name}`);
    }
  }, [firstInteractionUser]);

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

        // 2Words per s
        // 2 words ~ 10 characters

        let timeToSay =
          (response.split("%AA")[0].replace(/\s/g, "").length / 10) * 1000 +
          500;

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

        if (name === "") {
          let timeToSay =
            (response.replace(/\s/g, "").length / 10) * 1000 + 500;
          setTimeout(() => {
            setListening(true);
          }, timeToSay);
        }

        setFirstMessage(true);

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

  useEffect(() => {
    let languages: ilanguages = {};

    for (let i = 0; i < voices.length; i++) {
      if (!(voices[i].lang in languages)) {
        languages[voices[i].lang] = voices[i];
      } else if (
        languages[voices[i].lang].localService === false &&
        voices[i].localService
      ) {
        languages[voices[i].lang] = voices[i];
      }
    }
    setValidLanguages(languages);
    setVoice(languages[language]);

    let timeout = setTimeout(() => {
      try {
        if (!selectedVoice.localService) {
          setVoices(synth.getVoices());
        }
      } catch {}
    });
    return () => clearTimeout(timeout);
  }, [voices]);

  useEffect(() => {
    setVoice(validLanguages[language]);
    saveLanguage(language);
  }, [language, validLanguages]);

  async function fetchResponse(query: string) {
    if (query !== "") {
      setResponse(await getResponse(query, language));
    }
  }

  function handleKeyWord() {
    setListening(true);
  }

  let bubbles = history?.map((x, i) => {
    let classx = "";

    if (x.user) {
      return (
        <div className="row" key={i}>
          <div className="col"></div>
          <div className="col">
            <div className="left p-3 mt-1 card colour1 prewrap">
              <p className="">{x.text}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row" key={i}>
          <div className="col">
            <div className="left p-3 mt-1 card colour4 prewrap">
              <p className="">{x.text}</p>
            </div>
          </div>
          <div className="col"></div>
        </div>
      );
    }
  });

  return (
    <div className={"container-sm center noScrollbar"}>
      <div className="row fixedPosition pt-3 colour0">
        <h1 className="gotham-bold">PASHAM</h1>
        <Microphone
          language={language}
          callback={(text: string, final: boolean) =>
            handleSpeechInput(text, final)
          }
          listening={listening}
          setListening={(value: boolean) => setListening(value)}
        />

        <AlwaysListening
          listeningForOtherInput={
            loading ||
            settingsOpen ||
            !isAlwaysListeningAllowed ||
            !firstInteractionUser ||
            name === "" ||
            !firstMessage
              ? true
              : listening
          }
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
        className={
          "gg-mic glow bottom-right" + (listening ? " mic-active" : "")
        }
        onClick={() => setListening(loading ? false : !listening)}
      ></i>
      <i
        className="gg-menu-round bottom-left glow"
        onClick={() => setSettingsOpen(true)}
      ></i>
      <Settings
        open={settingsOpen}
        setOpen={(value: boolean) => setSettingsOpen(value)}
        languages={validLanguages}
        setLanguage={(language: string) => setLanguage(language)}
        language={language}
        isAlwaysListeningAllowed={isAlwaysListeningAllowed}
        setIsAlwaysListeningAllowed={(value: boolean) =>
          setIsAlwaysListeningAllowed(value)
        }
      />
      {!firstInteractionUser && (
        <StartUp
          setFirstInteraction={(value: boolean) =>
            setFirstInteractionUser(value)
          }
        />
      )}
    </div>
  );
}

export default App;
