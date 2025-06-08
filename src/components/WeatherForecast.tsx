import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiDayCloudyHigh } from 'react-icons/wi';
import type { ForecastData } from '/workspaces/Weather-APP-/weatherapp/src/services/WeatherServices.ts';

interface WeatherForecastProps {
  forecast: ForecastData;
  isLoading?: boolean;
}

const getWeatherIcon = (iconType: string, size: string = "text-2xl") => {
  const iconClass = `${size} text-gray-600`;
  
  switch (iconType) {
    case 'sunny':
      return <WiDaySunny className={`${iconClass} text-yellow-500`} />;
    case 'partly-cloudy':
      return <WiDayCloudyHigh className={`${iconClass} text-gray-500`} />;
    case 'cloudy':
      return <WiCloudy className={iconClass} />;
    case 'rainy':
      return <WiRain className={`${iconClass} text-blue-500`} />;
    case 'snow':
      return <WiSnow className={`${iconClass} text-blue-300`} />;
    case 'thunderstorm':
      return <WiThunderstorm className={`${iconClass} text-purple-500`} />;
    default:
      return <WiDaySunny className={`${iconClass} text-yellow-500`} />;
  }
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="h-6 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <p className="font-medium text-gray-800">{day.date}</p>
              <p className="text-sm text-gray-500 capitalize">{day.description}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {getWeatherIcon(day.icon)}
              
              <div className="text-right min-w-[80px]">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-800">{Math.round(day.high)}°</span>
                  <span className="text-gray-500">{Math.round(day.low)}°</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 min-w-[60px] text-right">
                <div className="flex items-center space-x-1">
                  <span>{day.humidity}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
