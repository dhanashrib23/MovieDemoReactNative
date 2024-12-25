import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Button, TextInput, Card, Avatar, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function Home() {
  const [uname, setUserName] = useState("");

  AsyncStorage.getItem("userName").then((reply) => {
    setUserName(reply);
  });
  return (
    <View>
      <Text>Welcome..! {uname}</Text>
    </View>
  );
}

export default Home;
