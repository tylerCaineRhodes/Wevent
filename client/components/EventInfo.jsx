import React from 'react';

export default function EventInfo() {
  const status = 'public'; //public
  const accept = 'accepted';
  const pending = ['Adam', 'Beth', 'Charlie', 'Dave'];
  const accepted = ['Erik', 'Felicia', 'George', 'Harry'];
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
        <div>
        {
          status === 'owner'
            ? (
              <button type="button" className="attend-delete-button">Delete</button>
            ) : accept === 'accepted' ? (
              <button type="button" className="attend-delete-button">Un-attend</button>
            ) : (
              <button type="button" className="attend-delete-button">Attend</button>
            )
        }
        </div>
      </div>
      <div className={`grid-right-${status}`}>
        <p className="eventInfoDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      {
        status === 'owner'
          ? (
            <div className="grid-owner-pend-accept">
              <div className="grid-owner-pend" style={{ display: 'inline-block' }}>
              <div className="pend-accept-heading">Pending</div>
                {pending.map((pend) => (
                  <div>
                    <p className="pend-accept-name">{pend}</p>
                    <button type="button" className="pend-accept-button">Accept</button>
                  </div>
                ))}
              </div>
              <div className="grid-owner-accept" style={{ display: 'inline-block' }}>
                <div className="pend-accept-heading">Accepted</div>
                {accepted.map((accept) => (
                  <div>
                    <p className="pend-accept-name">{accept}</p>
                    <button type="button" className="pend-accept-button">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          ) : null
      }
    </div>
  );
}
