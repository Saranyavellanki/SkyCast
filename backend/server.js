const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = process.env.WEATHER_API_KEY;

// Route to fetch weather data
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.json({ error: "Could not fetch weather data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
