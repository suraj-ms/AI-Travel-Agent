import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../../constants/Colors';
import moment from 'moment'
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlanTrip from '../../components/TripDetails/PlanTrip';

export default function TripDetails() {

    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();

    const [triplocationInfo, settriplocationInfo] = useState({});
    const [tripDetails, setTripDetails] = useState({});
    const [tripData, setTripData] = useState({});
    const [tripObject, setTripObject] = useState({});



    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerShown: true,
            headerTransparent: true,
            headerBackTitleStyle: {
                fontWeight: 'bold',
            },
        })

        try {
            const tripObject = JSON.parse(trip);
            setTripObject(tripObject);



            const tripData = JSON.parse(tripObject.tripData);
            setTripData(tripData);
            settriplocationInfo(tripData.locationInfo);


            // console.log(JSON.parse(tripObject.tripData).startDate);
            // console.log(tripObject.tripPlan.tripDetails.location);
            // console.log(tripObject.tripPlan.flightDetails.exampleFlight);
            // console.log(tripObject.tripPlan.hotelOptions);
            // console.log(tripObject.tripPlan.itinerary);



        } catch (error) {
            console.error('Error parsing JSON:', error);
        }



    }, [trip]);

    return (
        <ScrollView>
            <Image source={{
                uri:
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${triplocationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }}
                style={{
                    width: "100%",
                    height: 300,
                }}
            />


            <View style={{
                marginTop: -30,
                padding: 15,
                backgroundColor: Colors.white,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: '100%',
            }}>

                {/* <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25,
                    color: Colors.black,
                }}>{tripObject.tripPlan.tripDetails.location}</Text> */}

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    marginTop: 5
                }}>


                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 14,
                        color: Colors.gray,
                    }}>{moment(tripData.startDate).format('DD MMM yyyy')}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 14,
                        color: Colors.gray,
                    }}>- {moment(tripData.endDate).format('DD MMM yyyy')}</Text>
                </View>

                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 17,
                    marginTop: 20,
                    color: Colors.gray,
                }}><Ionicons name="bus" size={15} color="black" />{tripData?.traveler?.title}</Text>


                {/* Flight Info  */}
                <FlightInfo flightData={tripObject?.tripPlan?.flightDetails} />


                {/* Hotel List  */}

                <HotelList hotelList={tripObject?.tripPlan?.hotelOptions} />


                {/* Trip Day Panner Info  */}

                <PlanTrip details={tripObject?.tripPlan?.itinerary} />

            </View>
        </ScrollView>
    )
}