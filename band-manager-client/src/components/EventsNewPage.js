import React from 'react';

const EventsNewPage = (props) => {
  return (
    <div className="EventsNewPage">
       <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Title</label> <br/>
          <input name="title" id="title" />
        </div>
        <div>
          <label htmlFor="date_time">Date</label> <br/>
          <input type="date_time" name="date_time" />
        </div>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default EventsNewPage;