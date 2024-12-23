import { View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { SelectTravellerList } from '../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext'

export default function SelectTraveler() {

    const navigation = useNavigation();
    const [selectedTraveler, setSelectedTraveler] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext)
    const router = useRouter()


    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerShown: true,
            headerTransparent: true,
        })
    })



    const onClickContinue = () => {

        if (!selectedTraveler) {

            ToastAndroid.showWithGravity(
                `Please select a budget`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            setTripData({
                ...tripData,
                traveler: selectedTraveler
            })
            router.push('/create-trip/select-dates')
        }
    }


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
            }}>Who's Traveling</Text>

            <View style={{
                marginTop: 20,
            }}>
                <Text style={{
                    fontSize: 23,
                    fontFamily: 'outfit-bold',
                }}>
                    Choose your taveller
                </Text>
                <FlatList
                    data={SelectTravellerList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedTraveler(item)}
                            style={{
                                marginVertical: 10,
                            }}>
                            <OptionCard option={item} selectedOption={selectedTraveler} />
                        </TouchableOpacity>
                    )}
                />
            </View>


            <TouchableOpacity
                onPress={onClickContinue}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 20
                }}>

                <Text style={{
                    color: Colors.white,
                    textAlign: 'center',
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                }}>Continus</Text>

            </TouchableOpacity>
        </View >
    )
}