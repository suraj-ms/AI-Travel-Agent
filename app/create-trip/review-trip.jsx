import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import moment from 'moment';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext)
    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerShown: true,
            headerTransparent: true,
        })
    })


    return (
        <View style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: Colors.white,
            height: '100%'
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: 'outfit-bold',
                marginTop: 20,
            }}>ReviewTrip</Text>
            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit-bold',
                marginTop: 20,
            }}>Before generating your trip, please review the details below:</Text>


            {/* Destination Info */}
            <View style={{
                marginTop: 40,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <View style={{ width: 35, transform: [{ translateY: 5 }] }}>
                    <Ionicons name="location" size={34} color="black" />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit', color: Colors.gray }}>
                        Destination
                    </Text>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: Colors }}>
                        {tripData.locationInfo.name}</Text>
                </View>
            </View>

            {/* Date selected Info */}
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <View style={{ width: 35, transform: [{ translateY: 5 }] }}>
                    <Ionicons name="calendar" size={34} color="black" />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit', color: Colors.gray }}>
                        Travel Date
                    </Text>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: Colors }}>
                        {moment(tripData?.startDate).format('DD MMM') + " - " +
                            moment(tripData?.endDate).format('DD MMM') + "  "}
                        ({tripData?.totalNoOfDays} days)
                    </Text>
                </View>
            </View>

            {/* Totle People Info */}
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <View style={{ width: 35, transform: [{ translateY: 5 }] }}>
                    <Ionicons name="bus" size={34} color="black" />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit', color: Colors.gray }}>
                        Whos is traveling
                    </Text>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: Colors }}>
                        {tripData.traveler?.title}</Text>
                </View>
            </View>

            {/* Budget Info */}
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <View style={{ width: 35, transform: [{ translateY: 5 }] }}>
                    <FontAwesome5 name="money-bill" size={28} color="black" />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit', color: Colors.gray }}>
                        Budget
                    </Text>
                    <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', color: Colors }}>
                        {tripData.budget}</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.replace('/create-trip/generate-trip')}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 40
                }}>

                <Text style={{
                    color: Colors.white,
                    textAlign: 'center',
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                }}>Build My Trip</Text>

            </TouchableOpacity>
        </View>
    )
}