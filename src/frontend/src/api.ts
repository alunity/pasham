// Error codes
// =============
// 0: Translate ~ Backend general
// 1: Google scrape
// 2: Joke
// 3: Recipe
// 4: Weather

async function googleScrape(query: string) {
  try {
    let response = await fetch(`http://127.0.0.1:1002/api/google/`, {
      body: JSON.stringify({ text: query }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = JSON.parse(await response.json());
    return response;
  } catch {
    return getRandomElement(apiFailureMessages) + ". Code: 1";
  }
}

async function getJoke() {
  try {
    let response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    let data = await response.json();
    return data.setup + "%AA" + data.punchline;
  } catch {
    return getRandomElement(apiFailureMessages) + ". Code: 2";
  }
}

function getTime() {
  let d = new Date();
  return `The time is ${d.toLocaleTimeString()}`;
}

function getDate() {
  let d = new Date();
  return `The date is ${d.toLocaleDateString("en-UK")}`;
}

async function getRecipe() {
  try {
    let response = await fetch("http://127.0.0.1:1002/api/recipe/");
    let data = JSON.parse(await response.json());

    let output = `This is the recipe for ${data.name}`;
    // output +=
    // "%AA" + `The ingredients necessary are ${data.ingredients.join(",")}`;
    output += "%AA" + "You will need the following ingredients:" + "\n";

    for (let i = 0; i < data.ingredients.length; i++) {
      output += "- " + data.ingredients[i] + "\n";
    }

    output += "%AA" + "Here are the steps you need to follow:" + "\n";
    for (let i = 0; i < data.steps.length; i++) {
      output += `${i + 1}. ` + data.steps[i] + "\n";
    }
    output += "%AA" + "Enjoy!";
    output = output.replaceAll("Â", "");

    return output;
  } catch {
    return getRandomElement(apiFailureMessages) + ". Code: 3";
  }
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

function greet() {
  return `${getRandomElement(greetings)}, ${localStorage.name}`;
}

async function getWeather() {
  try {
    let response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&current_weather=true`
    );
    let data = await response.json();

    const WW = {
      0: "Clear sky ☀️",
      1: "Mainly clear 🌤️",
      2: "Partly cloudy 🌤️",
      3: "Overcast ☁️",
      45: "Fog 🌫️",
      48: "Depositing rime fog 🌫️",
      51: "Light drizzle 🌧️",
      53: "Moderate drizzle 🌧️",
      55: "Intense drizzle 🌧️",
      56: "Light freezing drizzle 🌧️",
      57: "Intense freezing drizzle 🌧️",
      61: "Slight rain 🌧️",
      63: "Moderate rain 🌧️",
      65: "Heavy rain 🌧️",
      66: "Light freezing rain ❄️",
      67: "Heavy freezing rain ❄️",
      71: "Slight snow fall 🌨️",
      73: "Moderate snow fall 🌨️",
      75: "Heavy snow fall 🌨️",
      77: "Snow grains 🌨️",
      80: "Slight rain showers 🌧️",
      81: "Moderate rain showers 🌧️",
      82: "Violent rain showers 🌧️",
      85: "Slight snow showers 🌨️",
      86: "Heavy snow showers 🌨️",
      95: "Thunderstorm ⛈️",
      96: "Slight thunderstorm ⛈️",
      97: "Heavy hail 🌨️",
    };

    // @ts-ignore
    let weatherType = WW[data.current_weather.weathercode];
    let output = `${weatherType} with a temperature of ${data.current_weather.temperature}°C and a windspeed of ${data.current_weather.windspeed}kmh`;
    return output;
  } catch {
    return getRandomElement(apiFailureMessages) + ". Code: 4";
  }
}

async function translate(text: string, intoLanguage: string): Promise<string> {
  try {
    let response = await fetch(`http://127.0.0.1:1002/api/translate/`, {
      body: JSON.stringify({ text: text, lang: intoLanguage }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    return data;
  } catch {
    return getRandomElement(apiFailureMessages) + ". Code: 0";
  }
}

function getRandomElement(arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const understandingFailureMessages = ["Sorry, I don't understand"];
const apiFailureMessages = ["Sorry, an error has occured"];

function getHappyBirthday() {
  let name = localStorage.name;

  if (name == undefined) {
    name = "";
  }
  return `Happy Birthday to You%AAHappy Birthday to You%AAHappy Birthday Dear ${name}%AAHappy Birthday to You`;
}

async function getResponse(input: string, lang: string): Promise<string> {
  lang = lang.split("-")[0];

  let translatedInput = await translate(input, "en");
  if (translatedInput.includes("joke")) {
    return await translate(await getJoke(), lang);
  }
  if (translatedInput.includes("weather")) {
    return await translate(await getWeather(), lang);
  }
  if (translatedInput.includes("recipe")) {
    return await translate(await getRecipe(), lang);
  }
  if (
    translatedInput.toLocaleLowerCase().includes("turkish") &&
    translatedInput.toLocaleLowerCase().includes("greek") &&
    translatedInput.toLocaleLowerCase().includes("or") &&
    translatedInput.toLowerCase().includes("coffee")
  ) {
    return await translate(
      "It is indeed Turkish Coffee%AA I cite the unesco declaration of it's inclusion under the Representative List of the Intangible Cultural Heritage of Humanity%AAYou may view the Unesco citation for more information.%AAhttps://ich.unesco.org/en/decisions/8.COM/8.28",
      lang
    );
  }

  if (
    translatedInput.toLocaleLowerCase().includes("happy") &&
    translatedInput.toLocaleLowerCase().includes("birthday")
  ) {
    return await translate(getHappyBirthday(), lang);
  }

  if (
    (translatedInput.toLocaleLowerCase().includes("hello") ||
      translatedInput.toLocaleLowerCase().includes("hi")) &&
    !(
      translatedInput.toLocaleLowerCase().includes("definition") ||
      translatedInput.toLocaleLowerCase().includes("mean") ||
      translatedInput.toLocaleLowerCase().includes("what") ||
      translatedInput.toLocaleLowerCase().includes("who") ||
      translatedInput.toLocaleLowerCase().includes("was")
    )
  ) {
    return await translate(greet(), lang);
  }

  if (translatedInput.toLocaleLowerCase().includes("what is the time")) {
    return translate(getTime(), lang);
  }

  if (translatedInput.toLocaleLowerCase().includes("what is the date")) {
    return translate(getDate(), lang);
  }

  let data = await googleScrape(input);

  if (Array.isArray(data)) {
    return await translate(data[0], lang);
  } else if (typeof data == "object") {
    // @ts-ignore
    return await translate(data["Description"], lang);
  } else if (typeof data == "string") {
    return await translate(data, lang);
  } else {
    return await translate(
      getRandomElement(understandingFailureMessages),
      lang
    );
  }
}

export { getResponse, translate };
