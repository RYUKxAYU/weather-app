import React from 'react';
import { WiHumidity, WiStrongWind, WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiDayCloudyHigh } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';
import { FaGauge } from 'react-icons/fa6';
import type { WeatherData } from '/workspaces/Weather-APP-/weatherapp/src/services/WeatherServices.ts';

interface CurrentWeatherProps {
  weather: WeatherData;
  
  isLoading?: boolean;
}

const getWeatherIcon = (iconType: string) => {
  const iconClass = "text-6xl";
  
  switch (iconType) {
    case 'sunny':
      return <WiDaySunny className={`${iconClass} text-yellow-400`} />;
    case 'partly-cloudy':
      return <WiDayCloudyHigh className={`${iconClass} text-gray-300`} />;
    case 'cloudy':
      return <WiCloudy className={`${iconClass} text-gray-400`} />;
    case 'rainy':
      return <WiRain className={`${iconClass} text-blue-400`} />;
    case 'snow':
      return <WiSnow className={`${iconClass} text-blue-200`} />;
    case 'thunderstorm':
      return <WiThunderstorm className={`${iconClass} text-purple-400`} />;
    default:
      return <WiDaySunny className={`${iconClass} text-yellow-400`} />;
  }
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white animate-pulse">
        <div className="h-6 bg-white bg-opacity-20 rounded mb-4"></div>
        <div className="h-16 bg-white bg-opacity-20 rounded mb-4"></div>
        <div className="h-4 bg-white bg-opacity-20 rounded mb-2"></div>
        <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">{weather.location}</h2>
          <p className="text-blue-100 text-sm">Current Weather</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {getWeatherIcon(weather.icon)}
          <div>
            <div className="text-5xl font-light">{Math.round(weather.temperature)}°</div>
            <p className="text-lg text-blue-100 capitalize">{weather.description}</p>
            <p className="text-sm text-blue-200">Feels like {Math.round(weather.feels_like)}°</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <WiHumidity className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-blue-200">Humidity</span>
          </div>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <WiStrongWind className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-blue-200">Wind</span>
          </div>
          <p className="text-xl font-semibold">{weather.wind_speed} mph</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <MdVisibility className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-blue-200">Visibility</span>
          </div>
          <p className="text-xl font-semibold">{weather.visibility} mi</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <FaGauge className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-blue-200">Pressure</span>
          </div>
          <p className="text-xl font-semibold">{weather.pressure} mb</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
