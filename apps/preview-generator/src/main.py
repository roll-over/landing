from fastapi import FastAPI, Request
from playwright.async_api import async_playwright
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import urllib.parse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


class GenByTamplate(BaseModel):
    template: str
    name: str
    host: str
    title: str
    image: str


@app.post("/")
async def root(request: Request, body: GenByTamplate):
    screen = {"width": 1920, "height": 1080}
    path = f"{body.name} {body.host} {body.title}.png"
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(screen=screen, viewport=screen)
        await page.goto(
            f"http://localhost:8000/items/{body.template}?name={body.name}&host={body.host}&title={body.title}&image={urllib.parse.quote(body.image)}"
        )
        await page.screenshot(path=path)
        await browser.close()
        await p.stop()
    return FileResponse(path)


@app.get("/items/{name}", response_class=HTMLResponse)
async def read_item(request: Request, name: str):
    print(request.query_params)
    return templates.TemplateResponse(f"{name}.html", {"request": request})
