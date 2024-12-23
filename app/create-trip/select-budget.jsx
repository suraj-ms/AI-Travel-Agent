import { View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import OptionCard from '../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext'
import { SelectBudgetOptions } from '../../constants/Options'

export default function SelectBudget() {

    const navigation = useNavigation();
    const [selectedBudget, setSelectedBudget] = useState();
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

        if (!selectedBudget) {

            ToastAndroid.showWithGravity(
                `Please select a budget`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            setTripData({
                ...tripData,
                budget: selectedBudget?.title
            })
            router.push('/create-trip/review-trip')
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
            }}>Select Budget</Text>
            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit-bold',
                marginTop: 20,
            }}>Choose spending habits for yout trip</Text>

            <FlatList
                data={SelectBudgetOptions}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedBudget(item)}
                        style={{
                            marginVertical: 10,
                        }}>
                        <OptionCard option={item} selectedOption={selectedBudget} />
                    </TouchableOpacity>
                )}
            />


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

        </View>
    )
}