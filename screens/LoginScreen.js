import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Input, Block, Icon, Button } from "galio-framework";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/UserState";
import { storeData } from "../services/LocalStore";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValue(key) {
  return await SecureStore.getItemAsync(key);
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("management.projectop@gmail.com");
  const [password, setPassword] = useState("sid");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(UserState);

  const refreshToken = async () => {
    let ref = await getValue("refresh");
    await axios
      .post(
        "http://192.168.1.2:8000/auth/jwt/refresh/",
        JSON.stringify({
          refresh: ref,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `JWT ${access}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUser({
          access: res.data.access,
        });
        save("access", res.data.access);
      });
  };

  useEffect(async () => {
    let access = getValue("access");
    let refresh = getValue("refresh");
    if (access && refresh) {
      await refreshToken().then((res) => {
        navigation.navigate("Probs");
      });
    } else {
      return;
    }
  }, []);

  const login = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log({
      email,
      password,
    });
    // await fetch("http://192.168.29.138:8000/auth/jwt/create/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => {
    //     console.log(res);
    //     // setUser({
    //     //   access: res.headers.get("access"),
    //     // })
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    await axios
      .post(
        "http://192.168.1.2:8000/auth/jwt/create/",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        // console.log(res);
        setUser({
          access: res.data.access,
          refresh: res.data.refresh,
        });
        save("access", res.data.access);
        save("refresh", res.data.refresh);
        navigation.navigate("Probs");
      })
      .catch((err) => {
        console.warn(err);
        // setLoading(false);
      });
    setLoading(false);
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-xl tracking-widest text-gray-500`}>LOGIN</Text>
      <Block style={tw``}>
        <TextInput
          placeholder="Email"
          style={tw`w-72 h-12 rounded-lg p-2 my-2 border border-orange-200`}
          placeholderTextColor="grey"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={tw`w-72 h-12 rounded-lg p-2 my-2 border border-orange-200`}
          placeholderTextColor="grey"
          onChangeText={(e) => setPassword(e)}
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
        disabled={loading}
      >
        LOGIN
      </Button>
      {/* <Button
        style={tw`text-xl`}
        capitalize={true}
        loading={loading}
        color="#FF6347"
        onPress={refresh}
        type="submit"
        disabled={loading}
      >
        Refresh
      </Button> */}
    </View>
  );
};

export default LoginScreen;
