import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrip }) {

    const LatestTrip = JSON.parse(userTrip[0].tripData)
    const router = useRouter()


    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                {LatestTrip?.locationInfo?.photoRef ?
                    <Image source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
                        style={{
                            width: "100%",
                            height: 240,
                            objectFit: 'cover',
                            borderRadius: 15
                        }}
                    /> :
                    <Image source={require('../../assets/images/placeholder.png')}
                        style={{
                            width: "100%",
                            height: 240,
                            objectFit: 'cover',
                            borderRadius: 15
                        }}
                    />}
                <View style={{
                    marginTop: 10,
                }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}>{userTrip[0].tripPlan?.tripDetails?.location}</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            width: 220,
                            color: Colors.gray,
                        }}>{moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: Colors.gray,
                        }}><Ionicons name="bus" size={15} color="black" />{LatestTrip?.traveler?.title}</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={() => {
                        router.push({
                            pathname: '/trip-details', 
                            params: { trip: JSON.stringify(userTrip[0]) }
                        })
                    }}
                    style={{
                        backgroundColor: Colors.primary,
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 10
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 15,
                            textAlign: 'center',
                            color: Colors.white,
                        }}>See your plan</Text>
                    </TouchableOpacity>
                </View>
                {userTrip.map((trip, index) => (
                    <UserTripCard trip={trip} key={index} />
                ))}
            </View>

        </View>
    )
}