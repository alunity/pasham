# Design

## Architecture

<img src="./assets/architecture.png">

- When we were deciding our architecure it seemed obvious that this problem could be split up into two parts
- It was easy to wrap the input, process, output model to this task
- The first being the user interface (frontend), which would be in charge of input and output and the second being the "brain"(backend) in charge of deciding what the assistant would say and do
  - In our final product these two aspects slightly overlap however the concept still applies
- We chose python for the backend because it allows for fast development and has many libaries for building an API
- We chose web technologies (React/TypeScript) for the frontend since it allows for a nice, flexible and cross-platform UI to be made
  - We were considering making the UI with Python but writing UIs isn't Python's strong suit

## Functionality

- The advantage of having our UI be web-based is we were able to use the Web Speech APIs which make speech recognition and text-to-speech trivial to implement

- The killer feature of our assistant is its large knowledge which was made possible by webscraping Google search using our python backend
  - Additionally our python backend made it trivial to get translations from Google translate
