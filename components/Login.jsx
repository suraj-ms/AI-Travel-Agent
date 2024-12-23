import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter();
  return (
    <View>
      <Image source={require('../assets/images/travel.png')} style={{ width: '100%', height: 450 }} />
      <View style={styles.container}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          textAlign: 'center',
        }}>AI Travel Planner</Text>

        <Text style={{
          fontSize: 17,
          fontFamily: 'outfit',
          textAlign: 'center',
          marginTop: 20,
          color: Colors.gray
        }}>Explore destinations, book trips, create itineraries, find deals, optimize travel plans!</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            router.push('auth/sign-in');
          }}
        >
          <Text style={{ color: Colors.white, textAlign: 'center', fontFamily: 'outfit', fontSize: 17 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    padding: 15,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 99,
    marginTop:'30%'
  }


})