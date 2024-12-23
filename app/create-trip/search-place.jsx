import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import 'react-native-get-random-values'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from '../../context/CreateTripContext'

export default function SearchPlace() {

  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext)
  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Search ',
      headerShown: true,
      headerTransparent: true,
    })
  })


  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.white,
      height: '100%'
    }}>


      <GooglePlacesAutocomplete
        placeholder="Search Place"


        onPress={(data, details = null) => {
          router.push('/create-trip/select-traveler')
          setTripData({
            locationInfo: {
              name: data.description,
              coordinates: details?.geometry.location,
              photoRef: details?.photos?.length ? details.photos[0].photo_reference : null,
              url: details?.url
            }
          })
          router.push('/create-trip/select-traveler')
        }
        }
        fetchDetails={true}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: 'en',
        }}

        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 25
          }
        }}

      />

    </View>
  )
}