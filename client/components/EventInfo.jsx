import React from 'react';

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
