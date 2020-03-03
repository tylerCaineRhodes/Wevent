module.exports.prettifyHostingEventsForDashboard = (hosting) => {
  const newHosting = [];
  let newEvent = {};
  hosting.forEach((event) => {
    if (newEvent.title !== event.title) {
      if (newEvent.title) {
        newHosting.push(newEvent);
        newEvent = {};
      }
      newEvent.title = event.title;
      newEvent.pending = event.pending;
    } else {
      newEvent.pending += event.pending;
    }
  });
  newHosting.push(newEvent);
  return newHosting;
};

module.exports.prettifyHostingForEventInfo = (info) => {
  const newInfo = [];
  const newEvent = { pending: [] };
  info.forEach((event) => {
    if (newEvent.title !== event.title) {
      if (newEvent.title) {
        newInfo.push(newEvent);
      }
      Object.assign(newEvent, event);
      newEvent.pending = [];
    } else if (event.pending) {
      newEvent.pending.push(event.display_name);
    }
  });
  delete newEvent.display_name;
  newInfo.push(newEvent);
  return newInfo;
};
