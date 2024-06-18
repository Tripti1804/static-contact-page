// // pages/weather.js

// import axios from 'axios';

// const Weather = ({ weatherData }) => {
//   if (!weatherData) {
//     return <div className="flex items-center justify-center h-screen">
//              <p className="text-red-500">Failed to load weather data.</p>
//            </div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center">
//       <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
//         <h1 className="text-3xl font-bold mb-4">Current Weather</h1>
//         <p className="text-xl mb-2">Temperature: {weatherData.current_weather.temperature}°C</p>
//         <p className="text-xl mb-2">Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
//         <p className="text-xl mb-2">Latitude: {weatherData.latitude}</p>
//         <p className="text-xl mb-2">Longitude: {weatherData.longitude}</p>
//         <p className="text-xl mb-2">Timezone: {weatherData.timezone}</p>
//         <p className="text-xl mb-2">Elevation: {weatherData.elevation}</p>
//       </div>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   try {
//     const response = await axios.get(
//       'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
//     );
//     const weatherData = response.data;

//     return {
//       props: {
//         weatherData
//       },
//       revalidate: 120 // Revalidate every hour
//     };
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//     return {
//       props: {
//         weatherData: null
//       },
//       revalidate: 120 // Still revalidate every hour even if there's an error
//     };
//   }
// }

// export default Weather; purana bad UI data




// pages/weather.js

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async (lat, lon) => {
//       try {
//         const response = await axios.get(
//           `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
//         );
//         setWeatherData(response.data);
//       } catch (error) {
//         setError('Error fetching weather data');
//         console.error('Error fetching weather data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchWeatherData(latitude, longitude);
//         },
//         (error) => {
//           setError('Error getting location');
//           console.error('Error getting location:', error);
//           setLoading(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser');
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">
//              <p className="text-blue-500">Loading...</p>
//            </div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen">
//              <p className="text-red-500">{error}</p>
//            </div>;
//   }

//   if (!weatherData) {
//     return <div className="flex items-center justify-center h-screen">
//              <p className="text-red-500">Failed to load weather data.</p>
//            </div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center">
//       <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
//         <h1 className="text-3xl font-bold mb-4">Current Weather</h1>
//         <p className="text-xl mb-2">Temperature: {weatherData.current_weather.temperature}°C</p>
//         <p className="text-xl mb-2">Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
//         <p className="text-xl mb-2">Latitude: {weatherData.latitude}</p>
//         <p className="text-xl mb-2">Longitude: {weatherData.longitude}</p>
//         <p className="text-xl mb-2">Timezone: {weatherData.timezone}</p>
//         <p className="text-xl mb-2">Elevation: {weatherData.elevation}</p>
//       </div>
//     </div>
//   );
// };

// export default Weather; improved version of above, lat long abhi bhi static h





// pages/weather.js

// import { useState } from 'react';
// import axios from 'axios';

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [location, setLocation] = useState({ lat: '', lon: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLocation((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const fetchWeatherData = async (lat, lon) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
//       );
//       setWeatherData(response.data);
//     } catch (error) {
//       setError('Error fetching weather data');
//       console.error('Error fetching weather data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { lat, lon } = location;
//     if (lat && lon) {
//       fetchWeatherData(lat, lon);
//     } else {
//       setError('Please enter valid latitude and longitude');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center p-4">
//       <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center mb-6">
//         <h1 className="text-3xl font-bold mb-4">Weather App</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="lat" className="block mb-2">Latitude:</label>
//             <input
//               type="text"
//               id="lat"
//               name="lat"
//               value={location.lat}
//               onChange={handleChange}
//               className="w-full p-2 rounded"
//             />
//           </div>
//           <div>
//             <label htmlFor="lon" className="block mb-2">Longitude:</label>
//             <input
//               type="text"
//               id="lon"
//               name="lon"
//               value={location.lon}
//               onChange={handleChange}
//               className="w-full p-2 rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Get Weather
//           </button>
//         </form>
//       </div>
//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {weatherData && (
//         <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
//           <h1 className="text-3xl font-bold mb-4">Current Weather</h1>
//           <p className="text-xl mb-2">Temperature: {weatherData.current_weather.temperature}°C</p>
//           <p className="text-xl mb-2">Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
//           <p className="text-xl mb-2">Latitude: {weatherData.latitude}</p>
//           <p className="text-xl mb-2">Longitude: {weatherData.longitude}</p>
//           <p className="text-xl mb-2">Timezone: {weatherData.timezone}</p>
//           <p className="text-xl mb-2">Elevation: {weatherData.elevation}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;  yha lat long hme khud dalna h






// pages/weather.js

// import { useState } from 'react';
// import axios from 'axios';

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [location, setLocation] = useState('');

//   const handleChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const fetchWeatherData = async (location) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
//       );
//       setWeatherData(response.data);
//     } catch (error) {
//       setError('Error fetching weather data');
//       console.error('Error fetching weather data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (location) {
//       fetchWeatherData(location);
//     } else {
//       setError('Please enter a valid location');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col items-center justify-center p-4">
//       <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center mb-6">
//         <h1 className="text-3xl font-bold mb-4">Weather App</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="location" className="block mb-2">Location:</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={handleChange}
//               className="w-full p-2 rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Get Weather
//           </button>
//         </form>
//       </div>
//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {weatherData && (
//         <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
//           <h1 className="text-3xl font-bold mb-4">Current Weather</h1>
//           <p className="text-xl mb-2">Temperature: {weatherData.current_weather.temperature}°C</p>
//           <p className="text-xl mb-2">Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
//           <p className="text-xl mb-2">Latitude: {weatherData.latitude}</p>
//           <p className="text-xl mb-2">Longitude: {weatherData.longitude}</p>
//           <p className="text-xl mb-2">Timezone: {weatherData.timezone}</p>
//           <p className="text-xl mb-2">Elevation: {weatherData.elevation}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;  yha text-field visible nhi tha




// pages/weather.js

import { useState } from 'react';
import axios from 'axios';

const Weather = () => {
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

export default Weather;
