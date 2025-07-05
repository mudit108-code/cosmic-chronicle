import './Timeline.css';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Timeline = ({ selectedDate, setSelectedDate }) => {
  const [launches, setLaunches] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedDay = selectedDate.getDate();

  const handleDateChange = (date) => {
    const normalized = new Date(2000, date.getMonth(), date.getDate());
    setSelectedDate(normalized);
  };

  const fetchAllPages = useCallback(async (url, type) => {
    let results = [];
    let offset = 0;
    const limit = 100;
    const maxPages = 10;
    let pageCount = 0;

    while (true) {
      try {
        const res = await axios.get(url, {
          params: {
            ordering: type === 'launch' ? 'net' : 'date',
            limit,
            offset,
          },
        });

        results.push(...res.data.results);
        offset += limit;

        if (!res.data.next || pageCount++ >= maxPages) break;
      } catch (err) {
        console.error(`❌ Error fetching ${type}:`, err);
        break;
      }
    }

    return results;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allLaunches, allEvents] = await Promise.all([
          fetchAllPages('https://ll.thespacedevs.com/2.2.0/launch/', 'launch'),
          fetchAllPages('https://ll.thespacedevs.com/2.2.0/event/', 'event'),
        ]);

        const filteredLaunches = allLaunches.filter((launch) => {
          const d = new Date(launch.net);
          return d.getDate() === selectedDay && d.getMonth() + 1 === selectedMonth;
        });

        const filteredEvents = allEvents.filter((event) => {
          const d = new Date(event.date);
          return d.getDate() === selectedDay && d.getMonth() + 1 === selectedMonth;
        });

        setLaunches(filteredLaunches);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('❌ Failed to fetch event data:', error);
        setLaunches([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedDay, fetchAllPages]);

  return (
    <section className="timeline-section">
      <h2>📜 Space Events on This Day (Any Year)</h2>

      <div style={{ marginBottom: '1rem' }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          view="month"
          showNavigation={true}
          showNeighboringMonth={false}
          formatMonthYear={(locale, date) =>
            date.toLocaleString(locale, { month: 'long' })
          }
        />
        <p>
          <strong>Selected Day:</strong>{' '}
          {selectedDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
          })}
        </p>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          {launches.length > 0 && (
            <>
              <h3>🚀 Launch Events</h3>
              {launches.map((event, idx) => (
                <div key={`launch-${idx}`} className="event-card">
                  <h4>{event.name || 'Unnamed Mission'}</h4>
                  <p>
                    📅{' '}
                    {new Date(event.net).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                    })}<br />
                    Launch Vehicle: {event.launch_service_provider?.name || 'Unknown Provider'}
                  </p>
                </div>
              ))}
            </>
          )}

          {events.length > 0 && (
            <>
              <h3>🛰️ General Space Events</h3>
              {events.map((event, idx) => (
                <div key={`event-${idx}`} className="event-card">
                  <h4>{event.name || 'Unnamed Event'}</h4>
                  <p>
                    📅{' '}
                    {new Date(event.date).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                    })}<br />
                    Type: {event.type?.name || 'N/A'}<br />
                    Location: {event.location || 'Unknown'}
                  </p>
                </div>
              ))}
            </>
          )}

          {launches.length === 0 && events.length === 0 && (
            <p>No space events found on this date.</p>
          )}
        </>
      )}
    </section>
  );
};

export default Timeline;
