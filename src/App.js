// src/App.js
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventList from './EventList';
import SelectedEventsList from './SelectedEventsList';
import Popup from './Popup';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const savedSelectedEvents = localStorage.getItem('selectedEvents');
    return savedSelectedEvents ? JSON.parse(savedSelectedEvents) : [];
  });
  const [popup, setPopup] = useState({ visible: false, message: '' });

  useEffect(() => {
    fetch('./client.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const isConflict = (event1, event2) => {
    // Adjust this function according to your time format
    return event1.start_time < event2.end_time && event1.end_time > event2.start_time;
  };

  const handleSelect = (event) => {
    setSelectedEvents(prevSelected => {
      if (selectedEvents.length >= 3) {
        setPopup({ visible: true, message: 'You can only select up to 3 events...' });
        return prevSelected;
      }
      for (const selectedEvent of selectedEvents) {
        if (isConflict(selectedEvent, event)) {
          setPopup({ visible: true, message: 'This event conflicts with an already selected event...' });
          return prevSelected;
        }
      }

      const updatedSelected = [...prevSelected, event];
      localStorage.setItem('selectedEvents', JSON.stringify(updatedSelected));
      return updatedSelected;
    });
  };

  const handleDeselect = (event) => {
    setSelectedEvents(prevSelected => {
      const updatedSelected = prevSelected.filter(e => e.id !== event.id);
      localStorage.setItem('selectedEvents', JSON.stringify(updatedSelected));
      return updatedSelected;
    });
  };

  const handleClosePopup = () => {
    setPopup({ visible: false, message: '' });
  };

  return (
    <div className="app">
      {popup.visible && <Popup message={popup.message} onClose={handleClosePopup} />}
      <div className="event-section">
        <h2>Events</h2>
        <EventList
          events={events}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          selectedEvents={selectedEvents}
        />
      </div>
      <div className="selected-events-section">
        <h2>Selected Events</h2>
        <SelectedEventsList
          selectedEvents={selectedEvents}
          onDeselect={handleDeselect}
        />
      </div>
    </div>
  );
};

export default App;
