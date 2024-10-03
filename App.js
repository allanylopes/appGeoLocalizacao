import React, {useState, useEffect, useRef} from 'react';
import {Text,View} from 'react-native';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { css } from './assets/css/Css';
import config from './config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';


export default function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapEl=useRef(null);
  const [distance, setDistance] = useState(null);

  
useEffect(()=>{
  (async function(){      
    let { status } = await Location.requestForegroundPermissionsAsync(); 
      if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
          setOrigin({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
          })
      } else {
          throw new Error('Location permission not granted');
      }
  })();
},[]);
return (
<View style={css.container}>
    <MapView
    style={css.map}
    initialRegion={origin}
    showsUserLocation={true}
    zoomEnabled={true}
    loadingEnabled={true}
    ref={mapEl}
    >
      

      {/* 2 parte busca e rotas  */}
{destination &&
  <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={config.googleApi}
          strokeWidth={10}
          strokeColor='#a1d'
          onReady={result=>
          {
          setDistance(result.distance);
          mapEl.current.fitToCoordinates(
             result.coordinates,{
                 edgePadding:{
                     top:50,
                     bottom:50,
                     left:50,
                     right:50
                 }                 
             }             
         );
       
        }
        
      }
      
      >
</MapViewDirections>
}        

</MapView>


{/*para segunda parte da busca e rotas acrescentamos esta view */}
<View style={css.search}>
  <GooglePlacesAutocomplete
          placeholder='Para onde vamos?'
          onPress={(data, details = null) => {
          setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421
          });
      }}
      query={{
          key: config.googleApi,
          language: 'pt-br',
      }}
      enablePoweredByContainer={false}
      fetchDetails={true}
      styles={{listView:{height:100}}}
  />


</View>
{distance && 
 <Text style={css.distancia}> Distância: {distance} </Text>
}
    <View style={css.search}>

    </View>
</View>
)
}
