import Search from 'antd/es/input/Search';
import React from 'react';
import  './style.css';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    style?: React.CSSProperties;
    className?: string;
}

const index: React.FC <SearchBarProps> = ({ placeholder, onSearch, style, ...rests}) => {
  return (
    <Search 
    variant="borderless"
    placeholder={placeholder}
    onSearch={onSearch} 
    style={style} 
    {...rests}
    />
  );
}

export default index;