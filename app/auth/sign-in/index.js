import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    if (!email || !password) {
      const errorMessage = 'Please enter all details';

        ToastAndroid.showWithGravity(errorMessage, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/mytrip')
      })
      .catch((error) => {
        const errorMessage = error.message;

          ToastAndroid.showWithGravity(`Invalid credential`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      });
  };

  const toggleSecureText = () => setSecureText(!secureText);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ padding: 25, backgroundColor: Colors.white, height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 30 }}>Let's Sign You In</Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 30, color: Colors.gray, marginTop: 20 }}>Welcome Back</Text>
      {/* <Text style={{ fontFamily: 'outfit', fontSize: 30, color: Colors.gray, marginTop: 10 }}>You've been missed</Text> */}

      {/* Email */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={styles.container}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ padding: 15, outlineStyle: 'none' }}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={secureText}
          />
          <TouchableOpacity style={{ marginEnd: '5%' }} onPress={toggleSecureText}>
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* SignIn */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.primary }]}
        onPress={onSignIn}
      >
        <Text style={{ color: Colors.white, textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')}
        style={[styles.button, { backgroundColor: Colors.white }]}
      >
        <Text style={{ color: Colors.primary, textAlign: 'center' }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  label: { marginBottom: 10, fontSize: 16, fontFamily: 'outfit' },
  input: { padding: 15, borderWidth: 1, borderRadius: 15, borderColor: Colors.gray, fontFamily: 'outfit', outlineStyle: 'none' },
  inputContainer: { borderWidth: 1, borderRadius: 15, borderColor: Colors.gray, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  button: { padding: 20, borderRadius: 15, marginTop: 20, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
});
