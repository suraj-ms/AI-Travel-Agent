import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../configs/FirebaseConfig";
import Login from "../components/Login";
import { Redirect } from "expo-router";

export default function Index() {
  const user = auth.currentUser;


  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={"/mytrip"} /> : <Login />}
    </View>
  );
}
