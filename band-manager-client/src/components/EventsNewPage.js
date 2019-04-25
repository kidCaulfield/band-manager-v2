import React from 'react';

import { connect } from 'react-redux';
import { createEvent } from '../actions/eventActions';
import { createSelector } from 'reselect';

const EventsNewPage = (props) => {

  const createEventOnSubmit = (params) => {
    props.onCreateEvent(params, props.id)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    createEventOnSubmit({
      event: {
        name: formData.get("name"),
        date_time: formData.get("date_time"),
        address: props.selected.address,
        venue_id: props.selected.id,
        contact: 'bob' // Development place holder
      }
    })
  }

  return (
    <div className="EventsNewPage">
       <form className="form"onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="name">Event Title</label> <br/>
          <input className="input" name="name" id="name" />
        </div>
        <div>
          <label className="label" htmlFor="date_time">Date</label> <br/>
          <input className="input" type="date" name="date_time" />
        </div>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

const eventSelector = createSelector(
  state => state.events,
  events => events
);

const mapStateToProps = createSelector(
  eventSelector,
  (events) => ({
    events
  })
);

const mapDispatchToProps = {
  onCreateEvent: createEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsNewPage);