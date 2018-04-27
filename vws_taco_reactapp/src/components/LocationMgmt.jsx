import React, {Component} from 'react';
import TacoModal from './TacoModal';
import EventForm from './EventForm';
import Loader from 'react-loader';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Actions} from '../store';
import EventGrid from './EventGrid';
import {dateFormat} from '../utils/format';

function mapStateToProps(state) {
  return {
    eventData: state.event.eventData,
    eventsPending: state.event.eventsPending,
    users: state.user.list,
    usersPending: state.user.usersPending,
    locations: state.location.locations,
    locationsPending: state.location.locationsPending
  };
}

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      users: [],
      locations: [],
      loaded: false,
      originalRows: []
    };
  }

  componentDidMount = () => {
    // Get Event Data
    this.props.dispatch(Actions.event.fetchEvents());

    // Get User Data
    this.props.dispatch(Actions.user.fetchUsers());

    // Get Location Data
    this.props.dispatch(Actions.location.fetchLocations());
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  createEvent = () => {
    this.setState({showModal: true});
  };

  submit = formData => {
    console.log(formData);
    this.props.dispatch(Actions.event.createEvent(formData));
    this.closeModal();
  };

  render() {
    const columns = [
      {
        key: 'date',
        name: 'Date',
        formatter: dateFormat
      },
      {key: 'locationName', name: 'Location'},
      {key: 'name', name: 'Runner'}
    ];

    const computedColumns = [
      {
        columnKey: 'name',
        compute: row => {
          return `${row.firstName} ${row.lastName}`;
        }
      }
    ];

    return (
      <div className="events">
        <h3>Upcoming Events</h3>
        <Loader
          loaded={
            !this.props.eventsPending && !this.props.locationsPending && !this.props.usersPending
          }
        >
          <EventGrid
            computedColumns={computedColumns}
            columns={columns}
            eventData={this.props.eventData}
          />
          <br />

          <RaisedButton onClick={this.createEvent} label="Create Event" />

          <TacoModal showModal={this.state.showModal} close={this.closeModal}>
            <EventForm
              users={this.props.users}
              submit={this.submit}
              locations={this.props.locations}
            />
          </TacoModal>
        </Loader>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Events);
