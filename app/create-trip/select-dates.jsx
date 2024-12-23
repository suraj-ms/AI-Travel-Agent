import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext'
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';

export default function SelectDates() {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
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


    const onDateChange = (date, type) => {
        if (type === 'START_DATE') {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date))
        }
    }

    const onDateSelectionContinue = () => {
        if (!endDate) {

            ToastAndroid.showWithGravity(
                `Please select a start date and end date`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            const startMoment = moment(startDate);
            const endMoment = moment(endDate);

            const totalNoOfDays = endMoment.diff(startMoment, 'days');
            setTripData({
                ...tripData,
                startDate: startDate,
                endDate: endDate,
                totalNoOfDays: totalNoOfDays + 1
            })
            router.push('/create-trip/select-budget')
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
            }}>Travel Dates</Text>

            <View style={{
                marginTop: 30
            }}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={5}
                    selectedRangeStyle={{
                        backgroundColor: Colors.primary,
                    }}
                    selectedDayTextStyle={{
                        color: Colors.white
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={onDateSelectionContinue}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 35
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