import React from 'react';

export default function EventInfo({eventInfo, eventInfoAccess}) {
  const status = 'owner'; //public 'owner'
  const accept = 'accepted';
  const pending = ['Adam', 'Beth', 'Charlie', 'Dave'];
  const accepted = ['Erik', 'Felicia', 'George', 'Harry'];
  console.log(eventInfo);
  return (
    <div className={`grid-parent-${status}`}>
      <div className="grid-title">
        <p className="eventInfoTitle">{eventInfo.title}</p>
        <p className="eventInfoLocation">{eventInfo.city}, {eventInfo.state}</p>
      </div>
      <div className={`grid-left-${status}`}>
        <p className="eventInfo">Time {eventInfo.time}</p>
        <p className="eventInfo">Address1<br />Address2<br />{eventInfo.city}<br />{eventInfo.state}<br />Zip</p>
        <p className="eventInfo">Price: ${eventInfo.price}</p>
        <p className="eventInfo">Attendance: {eventInfo.attendance_current} / {eventInfo.attendance_max}</p>
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
        <p className="eventInfoDescription">{eventInfo.description}</p>
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
