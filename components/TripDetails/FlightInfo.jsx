import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'; import Colors from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
    return (
        <View style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: Colors.gray,
            padding: 10,
            borderRadius: 15,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>

                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                }}> <SimpleLineIcons name="plane" size={24} color="black" /> Flights</Text>

                <TouchableOpacity style={{
                    backgroundColor: Colors.primary,
                    padding: 5,
                    width: 100,
                    borderRadius: 7,
                    marginTop: 7,
                }}>
                    <Text style={{
                        color: Colors.white,
                        textAlign: 'center',
                        fontFamily: 'outfit',
                    }}>Book Now</Text>
                </TouchableOpacity>


            </View>

            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit',
                marginTop: 7,
            }}> Airline: Delta</Text>
            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit',
                marginTop: 7,
            }}>Price: {JSON.stringify(flightData?.exampleFlight.priceRange)}</Text>


        </View>
    )
}