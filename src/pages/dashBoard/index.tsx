import React, { useState, useEffect, useRef } from 'react';
import { Layout, Image } from 'antd';
import InputSearch from '../../components/inputSearch';
import WeatherCard from '../../components/cart';
import styles from './index.module.css';
import CartDetailWeather from '../../components/cartDetailWeather';
import SearchHistory from '../../components/searchHistory';

const { Sider, Content } = Layout;
const weatherData = [
  { dayOfWeek: 'Mon', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '25' },
  { dayOfWeek: 'Tues', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '27' },
  { dayOfWeek: 'Wed', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '27' },
  { dayOfWeek: 'Thu', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '27' },
  { dayOfWeek: 'Fri', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '27' },
  { dayOfWeek: 'Sat', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '27' },
  { dayOfWeek: 'Sun', weatherIconUrl: 'https://openweathermap.org/img/wn/10d@2x.png', temperature: '27' },
];

const Index: React.FC = () => {
  const [weatherInfo, setWeatherInfo] = useState<any[]>([]);
  const [city, setCity] = useState<string>('Ho Chi Minh');
  const [description, setDescription] = useState<string>('');
  const [temp, setTemp] = useState<string>('');
  const [weatherIcon, setWeatherIcon] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const saveSearchHistory = (searchText: string) => {
    const history = localStorage.getItem('searchHistory');
    const searchHistory = history ? JSON.parse(history) : [];
    searchHistory.push(searchText);
    const limitedHistory = searchHistory.slice(-5);
    localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
  };

  const fetchWeatherData = async (city: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherInfo([
        { title: 'Temperature', value: `${Math.round(data.main.temp - 273.15)}°C` },
        { title: 'Humidity', value: `${data.main.humidity}%` },
        { title: 'Wind Speed', value: `${data.wind.speed} m/s` },
        { title: 'Pressure', value: `${data.main.pressure} hPa` },
        { title: 'Cloudiness', value: `${data.clouds.all}%` },
        { title: 'Visibility', value: `${data.visibility} km` },
      ]);
      setDescription(data.weather[0].description);
      setTemp(`${Math.round(data.main.temp - 273.15)}°C`);
      setWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
      setShowHistory(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchWeatherData(city);
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, [city]);

  

  const handleSearch = (searchText: string) => {
    setCity(searchText);
    fetchWeatherData(searchText);
    saveSearchHistory(searchText);
    setShowHistory(false); 
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width="20%" style={{ background: '#ffffff' }}>
        <div className="Search-bar" onClick={() => setShowHistory(true)}>
          <InputSearch className={styles['custom-input']} placeholder="Search places..." onSearch={handleSearch} />
          {showHistory && (
  <div ref={historyRef}>
    <SearchHistory history={history} onSearch={handleSearch} />
  </div>
)}
        </div>
        <div className={styles['city-name']}>
          <p>{city.toUpperCase()}</p>
        </div>
        <div className={styles['weather-state']}>
          <p>{description}</p>
        </div>
        <div className='weather-icon'>
          <Image className={styles['icon-weather']} src={weatherIcon} alt='icon weather' preview={false} />
        </div>
        <div className={styles['weather-temp']}>
          <p>{temp}</p>
        </div>
      </Sider>
      <Layout>
        <Content style={{}}>
          <div className={styles['weather-cards-container']}>
            {weatherData.map((data, index) => (
              <WeatherCard
                key={index}
                dayOfWeek={data.dayOfWeek}
                weatherIconUrl={data.weatherIconUrl}
                temperature={data.temperature}
              />
            ))}
          </div>
          <div className={styles['today-highlight']}>
            <b>Today Highlight</b>
          </div>
          <div className={styles['cart-detail-container']}>
            {weatherInfo.map((info, index) => (
              <CartDetailWeather
                key={index}
                title={info.title}
                style={{ width: 350, height: 230 }}
              >
                <b className={styles['informaiton-detail']}>{info.value}</b>
              </CartDetailWeather>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
