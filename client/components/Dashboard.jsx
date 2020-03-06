import React from 'react';
import Title from './Title.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(e) {
    this.props.openEventInfoModal(e.target.getAttribute('data-eventid'));
  }

  render() {
    return (
      <div>
        <Title buttonText="Back" buttonClass="createNewEvent-button" onClick={this.props.changePage} />
        <div className="outerDash">
          <span id="displayName">{this.props.info.nameAndLocation[0].display_name}</span>
          <span id="location">{this.props.info.nameAndLocation[0].location_city}</span>
          <span>{this.props.info.nameAndLocation[0].location_state}</span>
          <div className="hostingDash">
            <h4 className="h4">Hosting</h4>
            <>{this.props.info.hosting.map((event, i) => {
              let pending;
              if (event.pending >= 1) {
                pending = 1;
              }
              return (<div data-eventid={event.event_id} key={i} className={`hosting-dash-pending${pending} dashboardListItem`} onClick={this.onClick.bind(this)}>{event.title}</div>);
            })}
            </>
          </div>
          <div className="attendingDash">
            <h4 className="h4">Attending</h4>
            <>{this.props.info.attending.map((event, i) => (<div data-eventid={event.event_id} key={i} className={`attending-dash-pending${event.pending} dashboardListItem`} onClick={this.onClick.bind(this)}>{event.title}</div>))}</>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
