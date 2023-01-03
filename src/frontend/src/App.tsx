import getResponse from "./api";
import "./App.css";
import Microphone from "./speechRecognition";

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Microphone />
    </div>
  );
}

export default App;
