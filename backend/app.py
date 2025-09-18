# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import datetime

app = FastAPI(title="GrowGuide API")

# Enable CORS so your React app can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
try:
    model = joblib.load("models/crop_model.pkl")
except:
    model = None  # In case model is missing, prevent crash for now

# Load CSV data
prices_df = pd.read_csv("data/crop_prices.csv")
seasonal_df = pd.read_csv("data/seasonal_crops.csv")

# Input schema
class CropRequest(BaseModel):
    city: str
    season: str
    crop: str
    month: int = datetime.datetime.now().month

@app.get("/")
def root():
    return {"message": "Welcome to GrowGuide API"}

@app.post("/predict")
def predict_crop(data: CropRequest):
    # Check if crop is suitable
    suitable = seasonal_df[
        (seasonal_df['city'] == data.city) &
        (seasonal_df['season'] == data.season) &
        (seasonal_df['crop'] == data.crop)
    ]
    
    warning = None
    if suitable.empty:
        warning = f"{data.crop} is NOT suitable for {data.season} in {data.city}"

    # Predict price if model is loaded
    predicted_price = 25.0  # default dummy value
    tip = "Ensure proper irrigation and pest management."

    if model is not None:
        try:
            crop_id = pd.factorize(prices_df['crop'])[0][0]  # simple demo
            city_id = pd.factorize(prices_df['city'])[0][0]
            X_pred = [[data.month, crop_id, city_id]]
            predicted_price = round(model.predict(X_pred)[0], 2)
        except:
            predicted_price = 30.25  # fallback

    return {
        "crop": data.crop,
        "city": data.city,
        "season": data.season,
        "suitable": bool(not suitable.empty),
        "warning": warning,
        "predicted_price": predicted_price,
        "tip": tip
    }
