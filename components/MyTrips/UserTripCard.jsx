import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
import Colors from '../../constants/Colors'

export default function UserTripCard({ trip }) {


    const formatData = (data) => {
        return JSON.parse(data)
    }


    return (
        <View style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: 'center',
        }}>
            {/* <Image source={require('../../assets/images/placeholder.png')}
                style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 15
                }}
            /> */}

            <Image source={{
                uri:
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${formatData(trip.tripData).locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }}
                style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 15,
                }}
            />
            <View >
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'outfit-medium'
                }}>{trip.tripPlan?.tripDetails?.location}</Text>
                <Text style={{
                    fontSize: 14,
                    fontFamily: 'outfit',
                    color: Colors.gray
                }}>{moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
                <Text style={{
                    fontSize: 14,
                    fontFamily: 'outfit',
                    color: Colors.gray
                }}>Traveling: {formatData(trip.tripData).traveler.title}</Text>
            </View>
        </View>
    )
}