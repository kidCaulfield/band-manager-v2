import React, { useEffect } from 'react';
const key = require('../config')

const Map = (props) => {

  const onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(props.id),
      props.options);
    props.onMapLoad(map)
  }

  const renderMap = () => {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${key.googleAPIKey}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      // We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        onScriptLoad()
      })
    } else {
      onScriptLoad()
    }
  }
  
  const newMarker = () => { // temporary solution to newMarkers live
    if (props.options.showConfirmed > 0) {
      return renderMap()
    }
    return null
  }


  useEffect(() => {
    renderMap()
  }, [props.options.center])

  useEffect(() => {
    newMarker()
  }, [props.options.events])

  return (
    <div id={props.id} />
  )
}

export default Map;