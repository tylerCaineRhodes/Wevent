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
        <img src="https://www.roterrucksack.com/wp-content/uploads/2016/09/Badlands-Nationalpark-South-Dakota-USA-Head.jpg" className="dashboard-main" />
        <Title buttonText="Back" buttonClass="createNewEvent-button" onClick={this.props.changePage} />
        <div className="outerDash">
          <span id="displayName">{this.props.info.nameAndLocation[0].display_name}</span>
          <span id="location">{this.props.info.nameAndLocation[0].location_city}</span>
          <span>{this.props.info.nameAndLocation[0].location_state}</span>
          <div className="hostingDash">
            <h4 className="h4">Hosting</h4>
            <div className="scroll">{this.props.info.hosting.map((event, i) => {
              let classNum;
              if (event.pending >= 1) {
                classNum = 1;
              }
              return (
                <div className="dashboardListItem">
                  <div data-eventid={event.event_id} key={i} className={`hosting-dash-pending${classNum}`} onClick={this.onClick.bind(this)}>{event.title}</div>
                  {event.pending ? <div className="hosting-alert">{`${event.pending} events pending`}</div> : <></>}
                </div>
              );
            })}
            </div>
          </div>
          <div className="attendingDash">
            <h4 className="h4">Attending</h4>
            <div className="scroll">{this.props.info.attending.map((event, i) => (
              <div className="dashboardListItem">
                <div data-eventid={event.event_id} key={i} className={`attending-dash-pending${event.pending}`} onClick={this.onClick.bind(this)}>{event.title}</div>
                {event.pending ? <div className="attending-alert">Pending approval</div> : <></>}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
