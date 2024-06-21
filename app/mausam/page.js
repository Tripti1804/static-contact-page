// app/weather/page.js

'use client';

import { useState } from 'react';
import axios from 'axios';

const Mausam = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching weather data');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    } else {
      setError('Please enter a valid location');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Weather App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="location" className="block mb-2">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleChange}
              className="w-full p-2 rounded text-black bg-white placeholder-gray-500"
              placeholder="Enter a location"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Weather
          </button>
        </form>
      </div>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Current Weather in {weatherData.name}</h1>
          <p className="text-xl mb-2">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-xl mb-2">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-xl mb-2">Wind Speed: {weatherData.wind.speed} km/h</p>
          <p className="text-xl mb-2">Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Mausam;
