import React from 'react';

export default function EventInfo() {
  return (
    <div className="grid-parent">
      <div className="grid-title">
        <p className="eventInfoTitle">Event Name</p>
        <p className="eventInfoLocation">Austin, TX</p>
      </div>
      <div className="grid-left">
        <p className="eventInfo">Time</p>
        <p className="eventInfo">Address1</p>
        <p className="eventInfo">Address2</p>
        <p className="eventInfo">City</p>
        <p className="eventInfo">State</p>
        <p className="eventInfo">Zip</p>
        <p className="eventInfo">Attendance</p>
      </div>
      <div className="grid-right">
        <p className="eventInfoDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}
