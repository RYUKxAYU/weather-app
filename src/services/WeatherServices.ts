const API_KEY = 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  uv_index?: number;
  icon: string;
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  description: string;
  icon: string;
  humidity: number;
}

export interface ForecastData {
  forecast: ForecastDay[];
}

// Mock data for demo purposes
const mockCurrentWeather: WeatherData = {
  location: "San Francisco, CA",
  temperature: 72,
  description: "Partly Cloudy",
  feels_like: 75,
  humidity: 65,
  wind_speed: 8.2,
  pressure: 1013,
  visibility: 10,
  uv_index: 6,
  icon: "partly-cloudy"
};

const mockForecast: ForecastData = {
  forecast: [
    {
      date: "Today",
      high: 75,
      low: 62,
      description: "Partly Cloudy",
      icon: "partly-cloudy",
      humidity: 65
    },
    {
      date: "Tomorrow",
      high: 78,
      low: 64,
      description: "Sunny",
      icon: "sunny",
      humidity: 58
    },
    {
      date: "Wednesday",
      high: 73,
      low: 61,
      description: "Cloudy",
      icon: "cloudy",
      humidity: 72
    },
    {
      date: "Thursday",
      high: 69,
      low: 58,
      description: "Rain",
      icon: "rainy",
      humidity: 85
    },
    {
      date: "Friday",
      high: 71,
      low: 59,
      description: "Partly Cloudy",
      icon: "partly-cloudy",
      humidity: 68
    }
  ]
};

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  console.log(`Fetching weather for: ${location}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data with the searched location
  return {
    ...mockCurrentWeather,
    location: location
  };
};

export const getForecast = async (location: string): Promise<ForecastData> => {
  console.log(`Fetching forecast for: ${location}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockForecast;
};

export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};
