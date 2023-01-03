const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-us";
recognition.interimResults = true;

recognition.start();

recognition.onresult = (event) => {
  document.getElementById("Text").innerHTML =
    event.results[event.results.length - 1][0].transcript;
  console.log(event.results[event.results.length - 1][0].transcript);
};
