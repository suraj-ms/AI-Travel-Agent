import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { auth, db } from "../../configs/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ActivityIndicator } from 'react-native-web';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';

export default function Mytrip() {
  const [userTrip, setUserTript] = useState([]);
  const [loading, setLoading] = useState(false)

  const user = auth.currentUser;

  const router = useRouter()

  useEffect(() => {
    user && GetMyTrips()
  }, [user])

  const GetMyTrips = async () => {
    setLoading(true)

    setUserTript([])
    const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUserTript(prev => [...prev, doc.data()])
    });
    setLoading(false)
  }


  return (
    <ScrollView style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.white,
      height: '100%'
    }}>


      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          flex: 1
        }}>My trip</Text>

        <TouchableOpacity
          onPress={() => router.push('/create-trip/search-place')}
        >

          <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>


      </View>

      {/* {loading && <ActivityIndicator size={'large'} color={Colors.primary} />} */}

      {
        userTrip?.length == 0 ?
          <StartNewTripCard /> : <UserTripList userTrip={userTrip} />
      }

      <View style={{
        width: '100%',
        height: 90
      }}>

      </View>

    </ScrollView >
  )
}