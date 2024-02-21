import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "../pages/dashBoard"
import NotFoundPage from "../pages/notFoundPage"

const index: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default index;

