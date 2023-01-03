async function googleScrape(query: string) {
  // let ending = query.split(" ").join("%20");

  // %Z1 = /

  let ending = query.replace("/", "%Z1");
  ending = encodeURIComponent(ending);
  // ending = ending.replace("/", "%2F");
  let response = await fetch("http://127.0.0.1:1002/api/" + ending);
  response = JSON.parse(await response.json());

  return response;
}

async function getResponse(input: string): Promise<string> {
  let data = await googleScrape(input);

  if (Array.isArray(data)) {
    return data[0];
  } else if (typeof data == "object") {
    // @ts-ignore
    return data["Description"];
  } else if (typeof data == "string") {
    return data;
  } else {
    return "NULL";
  }
}

export default getResponse;