import React, {useEffect} from 'react';
import Routes  from './src/routes';
import FlashMessege from "react-native-flash-message";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });
  return(
    <>
    <Routes/>
    <FlashMessege icon="auto" duration={5500} style={{marginTop:0}}></FlashMessege>
    </>
  )
}