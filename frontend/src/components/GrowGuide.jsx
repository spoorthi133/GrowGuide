import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

export default function GrowGuide() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          { label: "Tomato", data: [28, 30, 31, 32, 34, 32], borderColor: "red", fill: false },
          { label: "Onion", data: [22, 20, 19, 18, 17, 18], borderColor: "orange", fill: false },
          { label: "Potato", data: [20, 21, 21, 22, 23, 22], borderColor: "brown", fill: false },
          { label: "Maize", data: [16, 17, 16, 15, 15, 15], borderColor: "green", fill: false }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } }
      }
    });

    return () => chart.destroy();
  }, []);

  return (
    <div>
      <header>
        <span>Grow Guide</span>
        <div>
          <label htmlFor="location">Location:</label>
          <select id="location" defaultValue="Bengaluru">
            <option value="Bengaluru">Bengaluru</option>
            <option>Mysuru</option>
            <option>Mangaluru</option>
          </select>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2>Monthly Crop Value Trends</h2>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
