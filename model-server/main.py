from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import os

class InputText(BaseModel):
    text: str

app = FastAPI()

try:
    tokenizer = AutoTokenizer.from_pretrained("roberta-base")
    model = AutoModelForSequenceClassification.from_pretrained(
        "hoomancat/mizu-gado",
        token=os.getenv("HUGGINGFACE_TOKEN")
    )
    classifier = pipeline("text-classification", model=model, tokenizer=tokenizer, device=-1)
    print("Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"Failed to load model or tokenizer: {e}")

@app.get("/")
def health():
    return {"status": "Model server is running"}

@app.post("/predict")
def predict(input: InputText):
    # PRINT STATEMENT FOR DEBUGGING
    # This will show the exact code received from the Java backend in Docker logs.
    print(f"--- Received code for analysis ---\n{input.text}\n----------------------------------")

    try:
        result = classifier(input.text)
        prediction = result[0]
        label_map = {
            "LABEL_0": "safe",
            "LABEL_1": "vulnerable"
        }
        return {
            "label": prediction["label"],
            "meaning": label_map[prediction["label"]],
            "score": round(prediction["score"], 7)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=6102)