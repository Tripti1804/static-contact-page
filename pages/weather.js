// pages/weather.js

import axios from 'axios';

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Failed to load weather data.</div>;
  }

  return (
    <div>
      <h1>Current Weather</h1>
      <p>Temperature: {weatherData.current_weather.temperature}°C</p>
      <p>Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
      <p>Latitude: {weatherData.latitude} </p>
      <p>Longitude: {weatherData.longitude} </p>
      <p>Timezone: {weatherData.timezone} </p>
      <p>Elevation: {weatherData.elevation} </p>
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
