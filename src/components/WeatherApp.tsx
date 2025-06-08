import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from './ui/Button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import CurrentWeather from '/workspaces/Weather-APP-/weatherapp/src/components/CurrentWeather.tsx';
import WeatherForecast from '/workspaces/Weather-APP-/weatherapp/src/components/WeatherForecast.tsx';
import { 
  getCurrentWeather, 
  getForecast, 
  getCurrentLocation
} from '/workspaces/Weather-APP-/weatherapp/src/services/WeatherServices.ts';
import type { WeatherData, ForecastData } from '/workspaces/Weather-APP-/weatherapp/src/services/WeatherServices.ts';

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  // Load default weather on component mount
  useEffect(() => {
    handleSearch('San Francisco, CA');
  }, []);

  const handleSearch = async (searchLocation?: string) => {
    const locationToSearch = searchLocation || location.trim();
    
    if (!locationToSearch) {
      toast({
        title: "Location Required",
        description: "Please enter a location to get weather information.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingWeather(true);
    setIsLoadingForecast(true);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationToSearch),
        getForecast(locationToSearch)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      toast({
        title: "Weather Updated",
        description: `Successfully loaded weather for ${weatherData.location}`,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingWeather(false);
      setIsLoadingForecast(false);
    }
  };

  const handleCurrentLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      const coordinates = await getCurrentLocation();
      const locationString = `${coordinates.lat.toFixed(4)}, ${coordinates.lon.toFixed(4)}`;
      
      toast({
        title: "Location Found",
        description: "Getting weather for your current location...",
      });
      
      await handleSearch(locationString);
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location Error",
        description: "Unable to get your current location. Please enter manually.",
        variant: "destructive",
      });
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Weather<span className="text-blue-600">App</span>
          </h1>
          <p className="text-gray-600 text-lg">Get current weather and 5-day forecast for any location</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter city, zip code, coordinates, or landmark..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => handleSearch()}
                disabled={isLoadingWeather}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium"
              >
                {isLoadingWeather ? (
                  <>
                    <AiOutlineLoading3Quarters className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
              
              <Button
                onClick={handleCurrentLocation}
                disabled={isGettingLocation}
                variant="outline"
                className="h-12 px-6 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 rounded-xl font-medium"
              >
                {isGettingLocation ? (
                  <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                    Current Location
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Try: "New York", "90210", "40.7128,-74.0060", "Eiffel Tower", or use your current location</p>
          </div>
        </div>

        {/* Weather Content */}
        <div className="space-y-8">
          {/* Current Weather */}
          {(currentWeather || isLoadingWeather) && (
            <CurrentWeather 
              weather={currentWeather!} 
              isLoading={isLoadingWeather}
            />
          )}

          {/* 5-Day Forecast */}
          {(forecast || isLoadingForecast) && (
            <WeatherForecast 
              forecast={forecast!} 
              isLoading={isLoadingForecast}
            />
          )}
        </div>

        {/* API Note */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <strong>Demo Mode:</strong> This app is currently showing sample data. 
              To get real weather data, you'll need to sign up for a free API key from 
              <a 
                href="https://openweathermap.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-900 underline ml-1"
              >
                OpenWeatherMap
              </a> and replace the API key in the code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
