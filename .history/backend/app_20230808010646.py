from fastapi import FastAPI

app = FastAPI()

@app.post("/process_input/")
async def process_input(text: str):
    return {"input": text}
