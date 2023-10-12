import './App.css';

import AnalyticsPage from './modules/analytics/screens/AnalyticsPage';
import React from 'react';

function App() {
  return (
    <div className="App">
      <AnalyticsPage />                                                       {/** Have added the screen directly here instead of passing a router because as per current requirement we need only one page */}
    </div>
  );
}

export default App;
