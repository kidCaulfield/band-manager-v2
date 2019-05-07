import React from 'react';

const EventEditPage = (props) => {

  const update = () => {
    return null
  }

  return (
    <div className="EventEditPage">
      <h1 className="title blue">Make an account</h1>
      <form className="form" onSubmit={update}>
        <div>
          <label className="label" htmlFor="name">Title</label><br/>
          <input className="input" type="text" name="name"></input>
        </div>
        <div>
          <label className="label" htmlFor="address">address</label><br/>
          <input className="input" type="address" name="address"></input>
        </div>
        <div>
          <label className="label" htmlFor="contact">contact</label><br/>
          <input className="input" type="contact" name="contact"></input>
        </div>
        <div>
          <label className="label" htmlFor="date_time">Date</label><br/>
          <input className="input" type="date" name="date_time"></input>
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EventEditPage;