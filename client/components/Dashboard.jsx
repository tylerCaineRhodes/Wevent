import React from 'react';
import Title from './Title.jsx';

const Dashboard = ({ openCreateEventModal }) => (
  <div>
    <Title buttonText="Create New Event" buttonClass="createNewEvent-button" onClick={openCreateEventModal} />
    <div className="outerDash">
      <div className="hostingDash">
        <h4>Hosting</h4>
      </div>
      <div className="attendingDash">
        <h4>Attending</h4>
      </div>
    </div>
    <div className="vl" />
  </div>
);

export default Dashboard;
