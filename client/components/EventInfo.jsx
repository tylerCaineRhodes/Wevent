import React from 'react';

export default function EventInfo() {
  let status = 'owner';
  let pending = ['adam', 'beth', 'charlie', 'dave']
  return (
    <div className={`grid-parent-${status}`}>
      <div className="grid-title">
        <p className="eventInfoTitle">Event Name</p>
        <p className="eventInfoLocation">Austin, TX</p>
      </div>
      <div className={`grid-left-${status}`}>
        <p className="eventInfo">Time</p>
        <p className="eventInfo">Address1<br />Address2<br />City<br />State<br />Zip</p>
        <p className="eventInfo">Attendance</p>
      </div>
      <div className={`grid-right-${status}`}>
        <p className="eventInfoDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      {
        status === 'owner'
          ? (
            <div className="grid-owner-pend-accept">
            {/* <div> */}
              {/* {pending.map(x => <p>{x}</p>)}*/}
              <div className="grid-owner-pend"></div>
              <div className="grid-owner-accept"></div>
            </div>
            // </div>
          ) : null
      }
    </div>
  );
}
