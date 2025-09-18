# train_model.py
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load your CSV
df = pd.read_csv("data/crop_prices.csv")

# Encode city and crop
df['city_id'] = pd.factorize(df['city'])[0]
df['crop_id'] = pd.factorize(df['crop'])[0]
df['month'] = 6  # dummy month, or add real month column

X = df[['month', 'crop_id', 'city_id']]
y = df['price']

model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "models/crop_model.pkl")
print("Model saved to models/crop_model.pkl")
