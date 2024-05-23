// Calendar.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import PropTypes from 'prop-types';
import "./Calendar.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addedEvent, setAddedEvent] = useState(null); // Added state to store the newly added event

  useEffect(() => {
    fetchEvents();
    // Load events from localStorage when the component mounts
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/events/');
      setEvents(response.data);
      // Store events in localStorage after fetching from the backend
      localStorage.setItem('events', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventClick = (info) => {
    // Handle event click
    setSelectedEvent(info.event);
  };

  const handleEventDelete = () => {
    // Delete event from the calendar
    setEvents(events.filter(event => event !== selectedEvent));
    // Implement deleting the event from the backend if needed
    setSelectedEvent(null);
    // Update localStorage after deleting event
    localStorage.setItem('events', JSON.stringify(events.filter(event => event !== selectedEvent)));
  };

  const handleCancel = () => {
    // Clear the selected event
    setSelectedEvent(null);
  };

  const handleEventRender = (info) => {
    // Customize event rendering
    // You can modify event colors or other properties here
    info.el.querySelector('.fc-content').innerHTML += `<button onClick="handleDeleteClick(${info.event.id})">Delete</button>`;
  };

  const handleEventAdd = async (event) => {
    // Add event to the calendar
    setEvents([...events, event]);
    // Update localStorage after adding event
    localStorage.setItem('events', JSON.stringify([...events, event]));
    // Implement saving the event to the backend
    try {
      const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
      const response = await axios.post(
        'http://localhost:8000/api/events/',
        { ...event, userId } // Include userId in the event data
      );
      setAddedEvent(response.data); // Set the added event
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="sidebar2">
        <div className="logo2">
          <img src="./img/ship.png" alt="Ship Icon4" className="ship-icon4" />  <span>TaskVoyage</span>
        </div>
        <ul className="navigation">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/Task">Tasks</a></li>
          <li><a href="/Calendar">Calendar</a></li>
          <li><a href="/Settings">Settings</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </div>
      <div className="content">
        <h1>Calendar</h1>
        {/* Add event form */}
        <EventForm addEvent={handleEventAdd} />
        {/* Display added event details */}
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventRender={handleEventRender}
        />
        {/* Display selected event details */}
        {selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onDelete={handleEventDelete}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

const EventDetails = ({ event, onDelete, onCancel }) => {
  return (
    <div className='details-container'>
      <h1>Event Details</h1>
      <h3>Title: {event.title}</h3>
      <h3>Start: {event.startStr}</h3>
      <h3>End: {event.endStr}</h3>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
EventDetails.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startStr: PropTypes.string.isRequired,
    endStr: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end) return;
    addEvent({ title, start, end });
    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <div className="event-form">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Event Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="start">Start Date & Time:</label>
        <input
          type="datetime-local"
          id="start"
          placeholder="Start Date & Time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <label htmlFor="end">End Date & Time:</label>
        <input
          type="datetime-local"
          id="end"
          placeholder="End Date & Time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
};

export default CalendarPage;
