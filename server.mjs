import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const fetch = await import('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'Climacast' directory
app.use(express.static(join(__dirname, 'frontend')));

app.get('/api/weather', async (req, res) => {
    const { city, lat, lon } = req.query;
    let url = '';

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ba4dcc991544c7aa7e97f906d2d8965c&units=metric`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ba4dcc991544c7aa7e97f906d2d8965c&units=metric`;
    } else {
        return res.status(400).json({ error: 'City or coordinates required' });
    }

    try {
        const response = await fetch.default(url); // Access fetch function from dynamic import
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);

        res.json({
            city: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
