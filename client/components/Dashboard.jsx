import React from 'react';
import Title from './Title.jsx';

const Dashboard = () => (
  <div>
    <Title />
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
