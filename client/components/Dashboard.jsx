import React from 'react';
import Title from './Title.jsx';

const Dashboard = (props) => 
// {console.log(props)}
(
  <div>
    {/* <Title buttonText="Create New Event" buttonClass="createNewEvent-button" onClick={openCreateEventModal} /> */}
    <div className="outerDash">
        <p>{props.info.nameAndLocation[0].display_name}</p>
        <p>{props.info.nameAndLocation[0].location_state}</p>
        <p>{props.info.nameAndLocation[0].location_city}</p>
      <div className="hostingDash">
        <h4>Hosting</h4>
        <>{props.info.hosting.map( (event, i) => {
            return (<div key = {i} pending = {event.pending} onClick = {props.openEventInfoModal}>{event.title}</div>)
          }
        )}</>
      </div>
      <div className="attendingDash">
        <h4>Attending</h4>
        <>{props.info.attending.map( (event, i) => {
            return (<div key = {i} pending = {event.pending} onClick = {props.openEventInfoModal}>{event.title}</div>)
          }
        )}</>
      </div>
    </div>
    <button onClick = {props.changePage}>Main Page</button>
  </div>
);

export default Dashboard;
