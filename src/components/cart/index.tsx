// WeatherCard.tsx

import React from 'react';
import { Card, Typography, Image } from 'antd';
import styles from './index.module.css';

interface WeatherCardProps {
  dayOfWeek: string;
  weatherIconUrl: string;
  temperature: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ dayOfWeek, weatherIconUrl, temperature }) => {
  return (
    <Card className={styles['weather-card']} style={{ width: 130, height: 190, marginTop: 10}} > 
      <Typography.Title level={4}>{dayOfWeek}</Typography.Title>
      <Image src={weatherIconUrl} alt="Weather Icon" className={styles['weather-icon']} preview={false}/> 
      <p className={styles['weather-temp']}>Temperature {temperature}°C</p> 
    </Card>
  );
};

export default WeatherCard;
