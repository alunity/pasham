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


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/pasham", StaticFiles(directory=static_dir, html=True), name="static")


@app.get("/api/{query}")
async def test(query):
    data = json.dumps(scrape_google(query))
    return {data}


def start_server():
    webbrowser.open("http://127.0.0.1:1002/pasham")
    uvicorn.run("main:app",
                port=1002,
                log_level="info",
                reload=True

                )


if __name__ == "__main__":
    start_server()
