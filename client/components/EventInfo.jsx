import React from 'react';

export default function EventInfo({ eventInfo, eventInfoAccess }) {
  // eventInfo.attending = []; //Temp variable until changes are pushed
  console.log(eventInfo);
  return (
    <div className={`grid-parent-${eventInfoAccess}`}>
      <div className="grid-title">
        <p className="eventInfoTitle">{eventInfo.title}</p>
        <p className="eventInfoLocation">{eventInfo.city}, {eventInfo.state}</p>
      </div>
      <div className={`grid-left-${eventInfoAccess}`}>
        {/* <p className="eventInfo">Host {eventInfoAccess}</p> To Be Removed */}
        <p className="eventInfo">Time {eventInfo.time}</p>
        {
          eventInfoAccess !== 'limited'
            ? (
              <p className="eventInfo">{eventInfo.address_1}<br />{eventInfo.address_2}</p>
            ) : null
        }
        <p className="eventInfo">{eventInfo.city}, {eventInfo.state}<br />{eventInfo.zipcode}</p>
        <p className="eventInfo">Price: ${eventInfo.price}</p>
        {
          eventInfo.attendance_max !== null
            ? (
              <p className="eventInfo">Attendance: {eventInfo.attendance_current} / {eventInfo.attendance_max}</p>
            ) : null
        }
        <div>
          {
            // eslint-disable-next-line no-nested-ternary
            eventInfoAccess === 'host' ? (<button type="button" className="attend-delete-button">Delete</button>
            ) : eventInfoAccess === 'full' ? (
              <button type="button" className="attend-delete-button">Un-attend</button>
            ) : (
              <button type="button" className="attend-delete-button">Attend</button>
            )
          }
        </div>
      </div>
      <div className={`grid-right-${eventInfoAccess}`}>
        <p className="eventInfoDescription">{eventInfo.description}</p>
      </div>
      {
        eventInfoAccess === 'host'
          ? (
            <div className="grid-host-pend-accept">
              <div className="grid-host-pend" style={{ display: 'inline-block' }}>
                <div className="pend-accept-heading">Pending</div>
                {eventInfo.pending.map((pend) => (
                  <div>
                    <p className="pend-accept-name">{pend}</p>
                    <button type="button" className="pend-accept-button">Accept</button>
                  </div>
                ))}
              </div>
              <div className="grid-host-accept" style={{ display: 'inline-block' }}>
                <div className="pend-accept-heading">Accepted</div>
                {eventInfo.attending.map((accept) => (
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
