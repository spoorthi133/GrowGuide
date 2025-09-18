# GrowGuide 🌱  

GrowGuide is a modern, **AI-powered web application** designed to assist farmers and agriculture enthusiasts in making informed decisions about 🌾 crop selection, 💰 market prices, and 📅 seasonal planning. The platform provides a **user-friendly interface** and **real-time insights** for a smarter farming experience.  

---

## ✨ Features  

- 🖥️ *User-Friendly UI*: Intuitive and visually appealing interface for both desktop and mobile users.  
- 🎉 *Landing Page*: A welcoming page with smooth animations guiding users into the main application.  
- 🌱 *Crop Recommendations*: Suggests suitable crops for a selected city and season.  
- 📈 *Price Forecasting*: Predicts crop prices using a machine learning model.  
- 📊 *Market Insights*: Displays current market prices and volumes for selected crops and locations.  
- 📅 *Seasonal Planning*: Shows the best planting and selling times for crops.  
- 📉 *Responsive Charts*: Interactive line charts to track crop price trends.  

---

## 📂 Datasets Used  

The application uses multiple datasets to provide accurate predictions and insights:  

1. **🌾 Crop Prices (crop_prices.csv)**  
   - Columns: `date, market, location, region, crop, price_per_kg`  
   - Contains historical crop prices per market and location.  

2. **📍 Locations (location.csv)**  
   - Columns: `city, region`  
   - Mapping of cities and their respective regions.  

3. **🏪 Markets (markets.csv)**  
   - Columns: `market, location`  
   - Lists all markets and the cities they belong to.  

4. **📦 Volume Data (volume.csv)**  
   - Columns: `crop, location, volume_kg`  
   - Represents the amount of each crop available per location.  

5. **🌻 Seasonal Crops (seasonal_crops.csv)**  
   - Columns: `city, season, crop`  
   - Maps which crops are suitable for each city per season.  

---

## 🛠️ Tech Stack  

- 🎨 *Frontend*: React, Vite, HTML, CSS  
- ⚡ *Backend*: FastAPI, Python  
- 🤖 *Machine Learning*: Scikit-learn, Pandas, Joblib  
- 📈 *Visualization*: Chart.js for interactive charts  
- ☁️ *Deployment*: Can be deployed locally or on cloud services  

---

## ⚙️ Installation  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/spoorthi133/GrowGuide.git
cd GrowGuide

#backend setup
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt

#run backend
uvicorn app:app --reload

#run frontend
cd frontend
npm install
npm run dev


