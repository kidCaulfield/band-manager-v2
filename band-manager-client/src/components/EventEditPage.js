import React, { useEffect } from 'react';

import { getEvent } from '../actions/eventActions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const EventEditPage = (props) => {

  const update = () => {
    return null
  }

  useEffect(() => {
    props.onGetEvent(props.match.params.tourId, props.match.params.eventId)
  }, [])

  return (
    <div className="EventEditPage">
      <h1 className="title blue">Make an account</h1>
      <form className="form" onSubmit={update}>
        <div>
          <label className="label" htmlFor="name">Title</label><br/>
          <input className="input" defaultValue={props.event.name} type="text" name="name"></input>
        </div>
        <div>
          <label className="label" htmlFor="details">Details</label><br/>
          <textarea className="input-text" defaultValue={props.event.details} name="details"></textarea>
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
    </div>
  );
};

const eventSelector = createSelector(
  state => state.event,
  event => event
)

const mapStateToProps = createSelector(
  eventSelector,
  (event) => ({
    event
  })
);

const mapDispatchtoProps = {
  onGetEvent: getEvent
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventEditPage);