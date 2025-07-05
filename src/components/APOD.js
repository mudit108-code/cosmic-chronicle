import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './APOD.css';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

const APOD = ({ selectedDate, setSelectedDate }) => {
  const [apodData, setApodData] = useState(null);

  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`
        );
        setApodData(res.data);
      } catch (err) {
        console.error("APOD fetch error:", err);
        setApodData(null);
      }
    };

    fetchAPOD();
  }, [formattedDate]);

  return (
    <section className="apod-section">
      <h2>🌌 Astronomy Picture of the Day: For Everyday Learning: Choose any day of any Year to Explore</h2>

      <div style={{ marginBottom: '1rem' }}>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <p><strong>Selected Date:</strong> {formattedDate}</p>
      </div>

      {apodData ? (
        <>
          <h3>{apodData.title}</h3>
          {apodData.media_type === 'image' ? (
            <img src={apodData.url} alt={apodData.title} style={{ maxWidth: '100%', borderRadius: '12px' }} />
          ) : (
            <iframe
              title="APOD Video"
              src={apodData.url}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              width="100%"
              height="400"
            />
          )}
          <p>{apodData.explanation}</p>
        </>
      ) : (
        <p>Loading APOD...</p>
      )}
    </section>
  );
};

export default APOD;
