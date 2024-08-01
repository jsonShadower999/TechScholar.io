// src/components/SelectedEventsList.js
import React from 'react';
import EventCard from './EventCard';

const SelectedEventsList = ({ selectedEvents, onDeselect }) => {
  return (
    <div className="selected-events-list">
      {selectedEvents.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onSelect={() => {}}  // No-op function, as these events are already selected
          onDeselect={onDeselect}
          isSelected={true}
        />
      ))}
    </div>
  );
};

export default SelectedEventsList;
