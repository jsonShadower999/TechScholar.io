// src/components/EventCard.js
import React from 'react';
import './EventCard.css'; // Import the CSS file
const EventCard = ({ event, onSelect, onDeselect, isSelected }) => {
  return (
    <div className="event-card">
      <h3>{event.event_name}</h3>
      <p>Category: {event.event_category}</p>
      <div className="event-timings">
        <p>To: {event.start_time}</p>
        <p>From: {event.end_time}</p>
      </div>
      <div className="event-actions">
        {isSelected ? (
          <button onClick={() => onDeselect(event)}>Deselect</button>
        ) : (
          <button onClick={() => onSelect(event)}>Select</button>
        )}
      </div>
      {/* <p>Timings: <p>To: {event.start_time}</p> <p>From : {event.end_time}</p></p> */}
      {/* {isSelected ? (
        <button onClick={() => onDeselect(event)}>Deselect</button>
      ) : (
        <button onClick={() => onSelect(event)}>Select</button>
      )} */}
    </div>
  );
};

export default EventCard;
