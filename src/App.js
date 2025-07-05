import React, { useState } from 'react';
import Navbar from './components/Navbar';
import APOD from './components/APOD';
import Timeline from './components/Timeline';
import Space3D from './components/Space3D';
import Footer from './components/Footer';

function App() {
  const [selectedApodDate, setSelectedApodDate] = useState(new Date());
  const [selectedTimelineDate, setSelectedTimelineDate] = useState(new Date());

  return (
    <div className="cosmic-container">
      <Navbar />
      <APOD selectedDate={selectedApodDate} setSelectedDate={setSelectedApodDate} />
      <Timeline selectedDate={selectedTimelineDate} setSelectedDate={setSelectedTimelineDate} />
      <Space3D />
      <Footer />
    </div>
  );
}

export default App;
