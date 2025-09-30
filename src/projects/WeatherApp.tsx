import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface WeatherData {
  name: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  // Open-Meteo API - Completely FREE, no API key needed
  const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
  const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

  // Weather code to description mapping
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67 || code <= 82) return '🌧️';
    if (code <= 99) return '⛈️';
    return '🌈';
  };

  const fetchWeather = async (cityName: string = city) => {
    setLoading(true);
    setError('');
    
    try {
      // Step 1: Get coordinates for the city
      const geoResponse = await fetch(
        `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1`
      );
      
      if (!geoResponse.ok) {
        throw new Error('Failed to find city');
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const { latitude, longitude, name } = geoData.results[0];
      
      // Step 2: Get weather data for coordinates
      const weatherResponse = await fetch(
        `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherData = await weatherResponse.json();
      const current = weatherData.current;
      
      const weather: WeatherData = {
        name,
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        description: weatherCodes[current.weather_code] || 'Unknown'
      };
      
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  const convertTemperature = (temp: number) => {
    return unit === 'celsius' ? temp : (temp * 9/5) + 32;
  };

  const getTemperatureUnit = () => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const getWindUnit = () => {
    return unit === 'celsius' ? 'km/h' : 'mph';
  };

  // Fetch weather for default city on component mount
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/projects" className="text-blue-600 hover:text-blue-800 text-sm sm:text-base">
          ← Back to Projects
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">Weather Application</h1>
        <p className="text-gray-600 mt-2">Get real-time weather information for any city</p>
      </div>

      {/* Search Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>

        {/* Unit Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Units:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUnit('celsius')}
              className={`px-3 py-1 rounded ${
                unit === 'celsius' ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setUnit('fahrenheit')}
              className={`px-3 py-1 rounded ${
                unit === 'fahrenheit' ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Weather Display */}
      {weatherData && !loading && (
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">{weatherData.name}</h2>
              <p className="text-blue-100 capitalize">{weatherData.description}</p>
            </div>
            <div className="text-4xl sm:text-6xl mt-4 sm:mt-0">
              {getWeatherIcon(weatherData.weatherCode)}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">
                {Math.round(convertTemperature(weatherData.temperature))}{getTemperatureUnit()}
              </div>
              <div className="text-blue-100 text-sm">Temperature</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">
                {Math.round(convertTemperature(weatherData.feelsLike))}{getTemperatureUnit()}
              </div>
              <div className="text-blue-100 text-sm">Feels Like</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">
                {weatherData.humidity}%
              </div>
              <div className="text-blue-100 text-sm">Humidity</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">
                {Math.round(weatherData.windSpeed)} {getWindUnit()}
              </div>
              <div className="text-blue-100 text-sm">Wind Speed</div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading weather data...</p>
        </div>
      )}

      {/* Instructions */}
      {!weatherData && !loading && !error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700">
            Enter a city name above to get current weather information
          </p>
        </div>
      )}

      {/* API Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Powered by Open-Meteo API • Free & No API Key Required</p>
      </div>
    </div>
  );
};

export default WeatherApp;