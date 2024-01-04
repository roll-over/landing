from typing import Literal, Union
from fastapi import FastAPI, Request
from playwright.async_api import async_playwright
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
import urllib.parse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


class Form1(BaseModel):
    template: Literal["podcast2"]
    name1: str
    name2: str
    host: str
    title: str
    image1: str
    image2: str


class Form2(BaseModel):
    template: Literal["podcast"]
    name: str
    host: str
    title: str
    image: str


class Form3(BaseModel):
    template: Literal["stream"]
    title: str


class GenByTamplate(BaseModel):
    template: str
    form: Union[Form1, Form2, Form3] = Field(
        ..., alias="form", discriminator="template"
    )


@app.post("/")
async def root(body: GenByTamplate):
    print(36)
    screen = {"width": 1920, "height": 1080}
    if body.form.template == "podcast":
        path = f"{body.form.name} {body.form.host} {body.form.title}.png"
        paramsQuery = urllib.parse.urlencode(
            {
                "name": body.form.name,
                "host": body.form.host,
                "title": body.form.title,
                "image": body.form.image,
            }
        )
    elif body.template == "podcast2":
        path = f"{body.form.name1} {body.form.name2} {body.form.host} {body.form.title}.png"
        paramsQuery = urllib.parse.urlencode(
            {
                "name1": body.form.name1,
                "name2": body.form.name2,
                "host": body.form.host,
                "title": body.form.title,
                "image1": body.form.image1,
                "image2": body.form.image2,
            }
        )
    elif body.template == "stream":
        path = f"{body.form.title}.png"
        paramsQuery = urllib.parse.urlencode({"title": body.form.title})
    else:
        return {"error": "template not found"}
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page(screen=screen, viewport=screen)
            await page.goto(
                f"http://localhost:8000/items/{body.template}?{paramsQuery}"
            )
            await page.screenshot(path=path)
            await browser.close()
            await p.stop()
        return FileResponse(path)
    except Exception as e:
        return {"error": e}


@app.get("/items/{name}", response_class=HTMLResponse)
async def read_item(request: Request, name: str):
    if not name:
        return {"error": "template not found"}
    return templates.TemplateResponse(f"{name}.html", {"request": request})
