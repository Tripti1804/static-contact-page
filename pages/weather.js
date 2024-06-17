// pages/weather.js

import axios from 'axios';

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="flex items-center justify-center h-screen">
             <p className="text-red-500">Failed to load weather data.</p>
           </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Current Weather</h1>
        <p className="text-xl mb-2">Temperature: {weatherData.current_weather.temperature}°C</p>
        <p className="text-xl mb-2">Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
        <p className="text-xl mb-2">Latitude: {weatherData.latitude}</p>
        <p className="text-xl mb-2">Longitude: {weatherData.longitude}</p>
        <p className="text-xl mb-2">Timezone: {weatherData.timezone}</p>
        <p className="text-xl mb-2">Elevation: {weatherData.elevation}</p>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await axios.get(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
    );
    const weatherData = response.data;

    return {
      props: {
        weatherData
      },
      revalidate: 120 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      props: {
        weatherData: null
      },
      revalidate: 120 // Still revalidate every hour even if there's an error
    };
  }
}

export default Weather;
