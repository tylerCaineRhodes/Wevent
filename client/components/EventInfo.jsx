/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

export default function EventInfo({
  eventId,
  eventInfo,
  eventInfoAccess,
  handleRemoveGuest,
  handleAttendEvent,
  handleAcceptPending,
  handleDeleteHostEvent,
}) {
  let button = '';

  if (eventInfoAccess === 'full') {
    button = (
      <button type="button" className="attend-delete-button">
        Un-attend
      </button>
    );
  }

  if (eventInfoAccess === 'limited') {
    // eslint-disable-next-line no-unused-expressions
    eventInfo.pending !== 1
      ? (button = (
        <button
          type="button"
          className="attend-delete-button"
          data-id={eventInfo.event_id}
          onClick={handleAttendEvent}
        >
          Attend
        </button>
      ))
      : (button = (
        <button type="button" className="attend-delete-button">
          Pending
        </button>
      ));
  }

  if (eventInfo.private === 0) {
    button = null;
  }

  if (eventInfoAccess === 'host') {
    button = (
      <button
        type="button"
        className="attend-delete-button"
        onClick={(e) => handleDeleteHostEvent(eventInfo.event_id)}
      >
        DELETE
      </button>
    );
  }

  // eslint-disable-next-line prefer-template
  let zip = '00000' + eventInfo.zipcode;
  zip = zip.substring(zip.length - 5);

  return (
    <div className={`grid-parent-${eventInfoAccess}`}>
      <div className="grid-title">
        <p className="eventInfoTitle">{eventInfo.title}</p>
        <p className="eventInfoLocation">
          {eventInfo.city}, {eventInfo.state}
        </p>
      </div>
      <div className={`grid-left-${eventInfoAccess}`}>
        {/* <p className="eventInfo">Host {eventInfoAccess}</p> Displays User Role ***To Be Removed*** */}
        <p className="eventInfo">Time {eventInfo.time}</p>
        {eventInfoAccess !== 'limited' ? (
          <p className="eventInfo">
            {eventInfo.address_1}
            <br />
            {eventInfo.address_2}
          </p>
        ) : null}
        <p className="eventInfo">
          {eventInfo.city}, {eventInfo.state}
          <br />
          {zip}
        </p>
        <p className="eventInfo">Price: $ {eventInfo.price.toFixed(2)}</p>
        {eventInfo.attendance_max !== null ? (
          <p className="eventInfo">
            Attendance: {eventInfo.attendance_current} /{' '}
            {eventInfo.attendance_max}
          </p>
        ) : null}
        <div>{button}</div>
      </div>
      <div className={`grid-right-${eventInfoAccess}`}>
        <p className="eventInfoDescription">{eventInfo.description}</p>
      </div>
      {eventInfoAccess === 'host' ? (
        <div className="grid-host-pend-accept">
          <div className="grid-host-pend">
            <div className="pend-accept-heading">Pending</div>
            {eventInfo.pending.map((pending, index) => (
              <div key={index} id={`pending${index}`}>
                <p className="pend-name">{pending}</p>
                <button
                  type="button"
                  className="check-x-button"
                  id={`pending${index}1`}
                  data-id={eventInfo.event_id}
                  data-name={pending}
                  onClick={handleRemoveGuest}
                >
                  &#x274C;
                </button>
                <button
                  type="button"
                  className="check-x-button"
                  id={`pending${index}2`}
                  data-id={eventInfo.event_id}
                  data-name={pending}
                  onClick={handleAcceptPending}
                >
                  &#9989;
                </button>
              </div>
            ))}
          </div>
          <div className="grid-host-accept">
            <div className="pend-accept-heading">Accepted</div>
            {eventInfo.attending.map((attending, index) => (
              <div key={index} id={`attending${index}`}>
                <p className="accept-name">{attending}</p>
                <button
                  type="button"
                  className="check-x-button"
                  id={`attending${index}1`}
                  data-id={eventInfo.event_id}
                  data-name={attending}
                  onClick={handleRemoveGuest}
                >
                  &#x274C;
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
