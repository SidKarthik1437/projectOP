import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Input, Block, Icon, Button } from "galio-framework";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log({
      email,
      password,
    });
    await fetch("192.168.29.138:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios.post(
      "192.168.29.138:8000/auth/jwt/create/",
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-xl tracking-widest text-gray-500`}>LOGIN</Text>
      <Block style={tw``}>
        <TextInput
          placeholder="Email"
          style={tw`w-72 h-12 rounded-lg p-2 my-2`}
          borderless={true}
          help="Email"
          placeholderTextColor="grey"
          iconSize={20}
          onChangeText={(e) => setEmail(e)}
          value={email}
          required
        />
        <TextInput
          placeholder="Password"
          style={tw`w-72 h-12 rounded-lg p-2 my-2`}
          borderless={true}
          password
          viewPass
          iconSize={20}
          help="Password"
          placeholderTextColor="grey"
          onChangeText={(e) => setPassword(e)}
          on
          value={password}
        />
      </Block>
      <Button
        style={tw`text-xl`}
        capitalize={true}
        loading={loading}
        color="#FF6347"
        onPress={login}
        type="submit"
      >
        LOGIN
      </Button>
    </View>
  );
};

export default LoginScreen;
