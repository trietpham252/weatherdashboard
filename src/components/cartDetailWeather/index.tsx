// CustomCard.tsx

import React from 'react';
import { Card } from 'antd';

interface CustomCardProps {
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode; 
}

const CustomCard: React.FC<CustomCardProps> = ({ title, style, children }) => {
  return (
    <Card title={title} style={style}>
      {children}
    </Card>
  );
};

export default CustomCard;
