import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/FirebaseConfig'


export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();



  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);


  const onCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.showWithGravity(
        'Please enter all details',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/mytrip')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        ToastAndroid.showWithGravity(
          `Error: ${errorMessage}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

      });
  };

  const toggleSecureText = () => setSecureText(!secureText);


  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <View style={{
      padding: 25,
      paddingTop: 50,
      backgroundColor: Colors.white,
      height: '100%'
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      }}>Create New Account</Text>

      {/* Full Name */}
      <View style={{
        marginTop: 30
      }}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      {/* Email */}
      <View style={{
        marginTop: 20
      }}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>


      {/* Password */}
      <View style={styles.container}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput style={{
            padding: 15,
            outlineStyle: 'none',
          }}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={secureText}
          />
          <TouchableOpacity style={{
            marginEnd: '5%'
          }} onPress={toggleSecureText}>
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={Colors.gray}
            />
          </TouchableOpacity>


        </View>

        {/* Create Account Button*/}
        <TouchableOpacity
          onPress={onCreateAccount}
          style={[styles.button, { backgroundColor: Colors.primary }]}>
          <Text style={{
            color: Colors.white,
            textAlign: 'center'
          }}>Create Account</Text>
        </TouchableOpacity>


        {/* SignIn */}
        <TouchableOpacity
          onPress={() => router.replace('auth/sign-in')}
          style={[styles.button, { backgroundColor: Colors.white }]}>
          <Text style={{
            color: Colors.primary,
            textAlign: 'center'
          }}>Sign In</Text>
        </TouchableOpacity>



      </View>

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.gray,
    fontFamily: 'outfit',
    outlineStyle: 'none',
  },

  inputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },


  toggleText: {
    color: '#007BFF',
    marginLeft: 10,
  },
})