import { useState, useEffect, useContext } from "react";
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
import UserContext from "../contexts/UserContext";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ucontext = useContext(UserContext);

  const HandleLogin = () => {
    axios
      .post("http://localhost:4444/user/login", { email, password })
      .then(async (reply) => {
        if (reply.data.userData != null || reply.data.userData != undefined) {
          await AsyncStorage.setItem("token", reply.data.token);
          await AsyncStorage.setItem("userName", reply.data.userData.name);
          props.navigation.navigate("Home");
        } else {
          alert("Invalid Email or Password");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome....! {ucontext}</Text>
      <Text style={styles.title}>Login</Text>
      <View>
        <TextInput
          label={"Enter your Email"}
          mode="outlined"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextInput
          label={"Enter your Password"}
          mode="outlined"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View>
        <Button onPress={HandleLogin}>Login</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
