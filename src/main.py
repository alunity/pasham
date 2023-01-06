import webbrowser
import uvicorn
from fastapi import FastAPI
from scrape_google import scrape_google
import json
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import os
from grab_recipe import getRandomRecipe
from translate import translate
from pydantic import BaseModel


app = FastAPI(
    title="pasham"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/pasham", StaticFiles(directory=static_dir, html=True), name="static")


@app.get("/api/google/{query}")
async def google(query):
    query = query.replace("+", "%2B")

    # %Z1 = / (epic encoding)
    query = query.replace("%Z1", "/")
    data = json.dumps(scrape_google(query))
    return {data}


@app.get("/api/recipe/")
async def recipe():
    return json.dumps(getRandomRecipe())


class TranslationQuery(BaseModel):
    text: str
    lang: str


@app.post("/api/translate/")
async def trans(query: TranslationQuery):
    if query.text.isnumeric():
        return query.text

    return translate(query.text, query.lang)


def start_server():
    webbrowser.open("http://127.0.0.1:1002/pasham")
    uvicorn.run("main:app",
                host="127.0.0.1",
                port=1002,
                log_level="critical",
                # reload=True
                )


if __name__ == "__main__":
    start_server()
