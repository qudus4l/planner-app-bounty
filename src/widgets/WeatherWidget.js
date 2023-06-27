import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/styles.css";

const API_KEY = '5180f29fd556547fb92204faa9ecce6a'; // Replace with your OpenWeatherMap API key

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('London'); // Default location

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div className="weather-widget">
      <h2>Weather</h2>
      {weatherData ? (
        <div>
          <div>
            <strong>Location:</strong> {weatherData.name}, {weatherData.sys.country}
          </div>
          <div>
            <strong>Temperature:</strong> {Math.round(weatherData.main.temp - 273.15)}°C
          </div>
          <div>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </div>
          <div>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </div>
        </div>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
}
