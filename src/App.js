// src/App.js
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventList from './EventList';
import SelectedEventsList from './SelectedEventsList';
import './App.css';

// // Sample events data
// const initialEvents = [
//   { id: 1, name: 'Event 1', category: 'Category A', timings: '10:00 - 11:00' },
//   { id: 2, name: 'Event 2', category: 'Category B', timings: '11:00 - 12:00' },
//   // Add more events as needed
// ];

const App = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('./client.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data); // Update state with the fetched data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array ensures this runs only once, after initial render
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const savedSelectedEvents = localStorage.getItem('selectedEvents');
    return savedSelectedEvents ? JSON.parse(savedSelectedEvents) : [];
  });
  const isConflict = (event1, event2) => {
    
    return event1.start_time < event2.end_time && event1.end_time > event2.start_time;
  };
  // Utility function to check if two events conflict
// const isConflict = (event1, event2) => {
//   const [start1, end1] = event1.timings.split(' - ').map(parseTime);
//   const [start2, end2] = event2.timings.split(' - ').map(parseTime);
//   return start1 < end2 && start2 < end1;
// };

  const handleSelect = (event) => {
  
    setSelectedEvents(prevSelected => {
      if (selectedEvents.length >= 3) {
        alert('You can only select up to 3 events...');
        return;
      }
      for (const selectedEvent of selectedEvents) {
        if (isConflict(selectedEvent, event)) {
          alert('This event conflicts with an already selected event...');
          return;
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

  return (
    <div className="app">
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
