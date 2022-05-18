import React from 'react';
import {useJsApiLoader, GoogleMap} from '@react-google-maps/api'
import {Flex} from '@chakra-ui/react'
import CustomMarker from './CustomMarker';
import AddSpot from './AddSpot';
import Filter from './Filter';
const center = { lat: 48.8584, lng: 2.2945 }
function Map({reloadData,changeFilterApplied,removeFilter,filterApplied,filter,changeAddSpot,addSpot,favourites,data,name}){
  //const userFavourites = []
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDkJDTVx0PEYQMhrcSCtu8lO21clQxN6so',
    libraries: ['places'],
  })
  const [map, setMap] = React.useState(/** @type google.maps.Map */ (null))
  if (!isLoaded) {
    return <div></div>
  }
  return (
    <div className='all-map'>
      {addSpot && <AddSpot reloadData={reloadData} changeAddSpot={changeAddSpot}/>}
      {!addSpot && <Filter changeFilterApplied={changeFilterApplied} removeFilter={removeFilter} filterApplied={filterApplied} filter={filter}/>}
    <div className='map-div'>
    <Flex
    position='relative'
    flexDirection='column'
    alignItems='center'
    height='380px'
    w='100vw'
    >
        <GoogleMap
          center={center}
          zoom={3}
          mapContainerStyle={{ width: '90%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
        {data.map(features => <CustomMarker favourites={favourites} name={name} key={features.id} features={features}/>)}  
        </GoogleMap>
    </Flex>
    </div>
    </div>
  )
}

export default Map;