// src/components/EventList.js
import React from 'react';
import EventCard from './EventCard';
import './EventList.css'; // Import the CSS file
const EventList = ({ events, onSelect, onDeselect, selectedEvents }) => {
  return (
    <div className="event-list">
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onSelect={onSelect}
          onDeselect={onDeselect}
          isSelected={selectedEvents.some(e => e.id === event.id)}
        />
      ))}
    </div>
  );
};

export default EventList;
