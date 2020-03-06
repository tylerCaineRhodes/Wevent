import React from 'react';

<<<<<<< HEAD
export default function EventInfo({
  eventInfo,
  eventInfoAccess,
  eventRequestApproval,
  eventAcceptRequest,
  eventRejectRequest,
  loginDisplayName,
}) {
  console.log(eventInfoAccess);
  console.log(eventInfo);
  const pendingViewable = (access) => {
    if (access === 'host') {
      return (
=======
export default function EventInfo({ eventInfo, eventInfoAccess, handleRemoveGuest, handleAttendEvent, handleAcceptPending}) {

  let button = '';

  // if (eventInfoAccess === 'full') {button = (<button type="button" className="attend-delete-button">Un-attend</button>)}
  if (eventInfoAccess === 'limited'){eventInfo.pending !== 1 ? button = <button type="button" className="attend-delete-button" onClick={handleAttendEvent}>Attend</button> : button = <button type="button" className="attend-delete-button">Pending</button>}
  if (eventInfo.private === 0) {button = null}
  if (eventInfoAccess === 'host') {button = (<button type="button" className="attend-delete-button">DELETE</button>)}

  return (
    <div className={`grid-parent-${eventInfoAccess}`}>
      <div className="grid-title">
        <p className="eventInfoTitle">{eventInfo.title}</p>
        <p className="eventInfoLocation">{eventInfo.city}, {eventInfo.state}</p>
      </div>
      <div className={`grid-left-${eventInfoAccess}`}>
        {/* <p className="eventInfo">Host {eventInfoAccess}</p> Displays User Role ***To Be Removed*** */}
        <p className="eventInfo">Time {eventInfo.time}</p>
        {
          eventInfoAccess !== 'limited'
            ? (
              <p className="eventInfo">{eventInfo.address_1}<br />{eventInfo.address_2}</p>
            ) : null
        }
        <p className="eventInfo">{eventInfo.city}, {eventInfo.state}<br />{eventInfo.zipcode}</p>
        <p className="eventInfo">Price: $ {eventInfo.price.toFixed(2)}</p>
        {
          eventInfo.attendance_max !== null
            ? (
              <p className="eventInfo">Attendance: {eventInfo.attendance_current} / {eventInfo.attendance_max}</p>
            ) : null
        }
>>>>>>> e3c2072cc6d442da2419a37eb0826dda047a03f7
        <div>
          <div id="eventInfoContainer3">
            Attending
            <div id="eventInfoAttending">
              <ul>
                {eventInfo.attending.map((user, index) =>{
                  return (<li key={index}>{user} <button onClick={() => eventRejectRequest(eventInfo.event_id, user)}>Remove</button></li>);
                })}
              </ul>
            </div>
          </div>
          <div id="eventInfoContainer4">
            Pending
            <div id="eventInfoPending">
              <ul>
                {eventInfo.pending.map((user, index) => {
                  return (<li key={index}>{user} <button onClick={() => eventAcceptRequest(eventInfo.event_id, user)}>Accept</button><button onClick={() => eventRejectRequest(eventInfo.eventId, loginDisplayName)}>Reject</button></li>);
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };
  const limitedButton = () => {
    if (eventInfoAccess === 'limited' && eventInfo.pending === null) {
      return (<button onClick={() => eventRequestApproval(eventInfo.event_id)}>Request to Join</button>);
    }
    if (eventInfoAccess !== 'host' && eventInfo.pending === 1) {
      return (<span>Request Pending...</span>);
    }
  };
  return (
    <div id="eventInfoContainer">
      <div id="eventInfoContainer1">
        <span>{eventInfo.title}</span>
        <span>{eventInfo.city}, {eventInfo.state}</span>
        {eventInfoAccess === 'host' || eventInfoAccess === 'full'
          ? <span>{eventInfo.address_1} {eventInfo.address_2} {eventInfo.zipcode}</span>
          : false}
        <span>{eventInfo.date.slice(0, 10)}</span>
        <span>{eventInfo.time.slice(0, 5)}</span>
        <span>${eventInfo.price}</span>
        {eventInfo.private === 1 ? <span>Attendance: {eventInfo.attendance_current}/{eventInfo.attendance_max}</span> : false}
        {limitedButton()}
      </div>
      <div id="eventInfoContainer2">
        <span>{eventInfo.description}</span>
      </div>
      {pendingViewable(eventInfoAccess)}
    </div>
  );
}
