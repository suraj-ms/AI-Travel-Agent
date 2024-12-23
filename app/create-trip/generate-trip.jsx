import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import moment from 'moment';
import { AI_PROMPT } from '../../constants/Options'
import { chatSession } from '../../configs/AiModal';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";

export default function GenerateTrip() {


    const { tripData, setTripData } = useContext(CreateTripContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const user = auth.currentUser;

    useEffect(() => {
        tripData && GenerateAiTrip()
    }, [])

    const GenerateAiTrip = async () => {
        setLoading(true)
        const FINAL_PROMPT = AI_PROMPT?.replace('{location}', tripData.locationInfo.name)
            .replace('{totalDay}', tripData?.totalNoOfDays)
            .replace('{totalNight}', tripData?.totalNoOfDays - 1)
            .replace('{traveler}', tripData.traveler?.title)
            .replace('{budget}', tripData.budget)
            .replace('{totalDay}', tripData?.totalNoOfDays)
            .replace('{totalNight}', tripData?.totalNoOfDays - 1)


        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const tripResp = JSON.parse(result.response.text())
        setLoading(false)
        const docId = (Date.now()).toString()
        await setDoc(doc(db, "UserTrips", docId), {
            userEmail: user.email,
            tripPlan: tripResp, //AI Results
            tripData: JSON.stringify(tripData),// user Selected data
            docId: docId
        })

        router.push('(tabs)/mytrip')

    }


    return (
        <View style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: Colors.white,
            height: '100%',
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: 'outfit-bold',
                marginTop: 20,
                textAlign: 'center',
            }}>Generating Trip</Text>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-mediun',
                marginTop: 20,
                textAlign: 'center',
            }}>Please Wait....</Text>

            <Image source={require('../../assets/images/loading.gif')}
                style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain',
                }} />

            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit',
                marginTop: 20,
                textAlign: 'center',
                color: Colors.gray
            }}>Do not Go Back</Text>
        </View>
    )
}