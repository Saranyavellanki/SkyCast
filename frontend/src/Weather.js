import React, { useState } from "react";
import axios from "axios";
import "./weather.css"; // Ensure Weather.css is properly styled

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        setError("");
        setWeather(null);
        if (!city.trim()) {
            setError("Please enter a valid city name.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
            if (response.data.error) {
                setError("City not found. Try again!");
            } else {
                setWeather(response.data);
            }
        } catch (err) {
            setError("Failed to fetch weather data. Please try later.");
        }
        setLoading(false);
    };

    return (
        <div className="weather-container">
            <div className="weather-card">
                <h2>SkyCast 🌤️</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={fetchWeather}>Search</button>
                </div>

                {loading && <p className="loading">Fetching weather data...</p>}

                {error && <p className="error">{error}</p>}

                {weather && (
                    <div className="weather-info">
                        <h3>{weather.name}, {weather.sys.country} 🇺🇳</h3>
                        <p>🌡️ Temperature: {Math.round(weather.main.temp)}°C</p>
                        <p>🌥️ Condition: <span className="capitalize">{weather.weather[0].description}</span></p>
                        <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
