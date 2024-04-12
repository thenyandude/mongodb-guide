import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Guide from './views/Guide'; 

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/guide" element={<Guide />} />
    </Routes>
  </Router>
);

export default AppRoutes;
