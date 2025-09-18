import React, { useEffect, useRef, useState, useMemo } from "react";
import Chart from "chart.js/auto"; // Auto registers everything

export default function GrowGuide() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // store chart instance

  // States
  const [location, setLocation] = useState("Bengaluru");
  const [season, setSeason] = useState("Kharif");
  const [selectedCrop, setSelectedCrop] = useState("Tomato");

  // Static data memoized (so it doesn't rebuild every render)
  const seasonalCrops = useMemo(() => ({
    Bengaluru: {
      Kharif: ["Maize", "Green Gram", "Tomato", "Brinjal"],
      Rabi: ["Wheat", "Onion", "Potato", "Carrot"],
      Zaid: ["Cucumber", "Tomato", "Pumpkin", "Chili"]
    },
    Hubballi: {
      Kharif: ["Maize", "Groundnut", "Turmeric", "Brinjal"],
      Rabi: ["Wheat", "Onion", "Potato", "Tomato"],
      Zaid: ["Cucumber", "Watermelon", "Chili", "Pumpkin"]
    }
  }), []);

  const tipsData = useMemo(() => ({
    Kharif: [
      "Ensure proper irrigation during heavy rains.",
      "Use mulch to retain soil moisture.",
      "Plant maize with enough spacing."
    ],
    Rabi: [
      "Irrigate early morning for wheat and vegetables.",
      "Check soil drainage before planting potatoes.",
      "Harvest onions in dry weather."
    ],
    Zaid: [
      "Use shade for seedlings in hot afternoons.",
      "Water crops regularly but avoid waterlogging.",
      "Check for pest infestations frequently."
    ]
  }), []);

  const bestTime = useMemo(() => ({
    Bengaluru: {
      Kharif: {
        Maize: "Plant: Jun | Sell: Sep",
        "Green Gram": "Plant: Jul | Sell: Sep",
        Tomato: "Plant: Jun | Sell: Aug",
        Brinjal: "Plant: Jun | Sell: Sep"
      },
      Rabi: {
        Wheat: "Plant: Oct | Sell: Feb",
        Onion: "Plant: Oct | Sell: Dec",
        Potato: "Plant: Nov | Sell: Jan",
        Carrot: "Plant: Oct | Sell: Jan"
      },
      Zaid: {
        Cucumber: "Plant: Apr | Sell: Jun",
        Tomato: "Plant: Apr | Sell: Jun",
        Pumpkin: "Plant: Apr | Sell: Jun",
        Chili: "Plant: Apr | Sell: Jun"
      }
    },
    Hubballi: {
      Kharif: {
        Maize: "Plant: Jun | Sell: Sep",
        Groundnut: "Plant: Jun | Sell: Sep",
        Turmeric: "Plant: Jun | Sell: Sep",
        Brinjal: "Plant: Jun | Sell: Sep"
      },
      Rabi: {
        Wheat: "Plant: Oct | Sell: Feb",
        Onion: "Plant: Oct | Sell: Dec",
        Potato: "Plant: Nov | Sell: Jan",
        Tomato: "Plant: Oct | Sell: Dec"
      },
      Zaid: {
        Cucumber: "Plant: Apr | Sell: Jun",
        Watermelon: "Plant: Apr | Sell: Jun",
        Chili: "Plant: Apr | Sell: Jun",
        Pumpkin: "Plant: Apr | Sell: Jun"
      }
    }
  }), []);

  const seasonLabels = useMemo(() => ({
    Kharif: ["Jun", "Jul", "Aug", "Sep"],
    Rabi: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    Zaid: ["Apr", "May", "Jun"]
  }), []);

  const marketData = useMemo(() => ({
    Bengaluru: [
      { name: "KR Market", price: 32 },
      { name: "Bangalore City Market", price: 28 },
      { name: "Wholesale Yard", price: 35 },
      { name: "Local Farmer Bazaar", price: 30 }
    ],
    Hubballi: [
      { name: "Hubballi Central", price: 30 },
      { name: "Gokul Market", price: 27 },
      { name: "Wholesale Hub", price: 34 },
      { name: "Village Market", price: 25 }
    ]
  }), []);

  // Crop Colors
  const getCropColor = (crop) => {
    const colors = {
      Tomato: "red",
      Onion: "orange",
      Potato: "brown",
      Maize: "green",
      Carrot: "darkorange",
      Cucumber: "darkgreen",
      Brinjal: "purple",
      Wheat: "gold",
      Pumpkin: "yellow",
      Chili: "crimson",
      "Green Gram": "limegreen",
      Groundnut: "sandybrown",
      Turmeric: "goldenrod",
      Watermelon: "darkred"
    };
    return colors[crop] || "gray";
  };

  // Chart Rendering (optimized)
  useEffect(() => {
    if (!chartRef.current) return;

    // Clean old chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const cropsToPlot =
      selectedCrop === "All Vegetables"
        ? seasonalCrops[location]?.[season] || []
        : [selectedCrop];

    chartInstance.current = new Chart(chartRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels: seasonLabels[season] || [],
        datasets: cropsToPlot.map((crop) => ({
          label: crop,
          data: (seasonLabels[season] || []).map(() =>
            Math.floor(Math.random() * 20 + 15)
          ),
          borderColor: getCropColor(crop),
          tension: 0.4, // smooth curves
          fill: false
        }))
      },
      options: {
        responsive: true,
        animation: { duration: 800 },
        plugins: { legend: { position: "bottom" } }
      }
    });
  }, [season, location, selectedCrop]);

  // Check crop suitability
  const isCropSuitable = seasonalCrops[location]?.[season]?.includes(selectedCrop);

  return (
    <div>
      <header>Grow Guide</header>
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Filters & Tips</h3>

          <label>Location:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Bengaluru</option>
            <option>Hubballi</option>
          </select>

          <label>Season:</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option>Kharif</option>
            <option>Rabi</option>
            <option>Zaid</option>
          </select>

          <label>Crop:</label>
          <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
            <option>All Vegetables</option>
            {(seasonalCrops[location]?.[season] || []).map((crop, idx) => (
              <option key={idx} value={crop}>
                {crop}
              </option>
            ))}
          </select>

          <label>Farmer Tips:</label>
          <ul className="tips-list">
            {(tipsData[season] || []).map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="container">
          {!isCropSuitable && selectedCrop !== "All Vegetables" && (
            <p style={{ color: "red", fontWeight: "600" }}>
              Warning: {selectedCrop} is not recommended in {season} season at {location}.
            </p>
          )}

          {/* Forecast & Prices */}
          <div className="forecast-cards">
            {(selectedCrop === "All Vegetables"
              ? seasonalCrops[location]?.[season] || []
              : [selectedCrop]
            ).map((crop, idx) => (
              <div className="card" key={idx}>
                <h3>{crop} - ₹{Math.floor(Math.random() * 30 + 15)}/kg</h3>
                <p className={Math.random() > 0.5 ? "green" : "red"}>
                  {Math.random() > 0.5 ? "↑ 5% this week" : "↓ 3% this week"}
                </p>
                <p>Recommendation: {crop} is suitable this season.</p>
              </div>
            ))}
          </div>

          {/* Best Time */}
          <div className="forecast-cards">
            {(selectedCrop === "All Vegetables"
              ? seasonalCrops[location]?.[season] || []
              : [selectedCrop]
            ).map((crop, idx) => (
              <div className="card best-time-card" key={idx}>
                <h3>{crop}</h3>
                <p><strong>{bestTime[location]?.[season]?.[crop] || "No data available"}</strong></p>
              </div>
            ))}
          </div>

          {/* Market Comparison */}
          <div className="card table-card">
            <h2 style={{ color: "#065f46", marginBottom: "0.5rem" }}>Local Market Comparison</h2>
            <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
              Compare nearby market prices (Radius: 20 km)
            </p>
            <table className="table" style={{ borderRadius: "0.5rem", overflow: "hidden" }}>
              <thead>
                <tr style={{ backgroundColor: "#10b981", color: "#ffffff" }}>
                  <th style={{ padding: "0.75rem" }}>Market</th>
                  <th style={{ padding: "0.75rem" }}>Price (₹/kg)</th>
                </tr>
              </thead>
              <tbody>
                {(marketData[location] || []).map((mkt, idx) => {
                  const price =
                    selectedCrop === "All Vegetables"
                      ? mkt.price
                      : mkt.price + Math.floor(Math.random() * 5 - 2);

                  return (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#f0fdf4" : "#fefce8",
                        textAlign: "center"
                      }}
                    >
                      <td style={{ padding: "0.5rem", fontWeight: "500" }}>{mkt.name}</td>
                      <td
                        style={{
                          padding: "0.5rem",
                          fontWeight: "600",
                          color: price > mkt.price ? "green" : "red"
                        }}
                      >
                        ₹{price}/kg
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="card chart-card">
            <h2>Monthly Crop Value Trends</h2>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
