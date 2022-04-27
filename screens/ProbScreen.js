import { View, Text, Button, SafeAreaView, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/UserState";
import tw from "twrnc";

const ProbScreen = ({ navigation }) => {
  const [probs, setProbs] = useState();
  const [user, setUser] = useRecoilState(UserState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Main")}
          title="Home"
          disabled={false}
          color="#FF6347"
        />
      ),
    });
  }, [navigation]);

  const getProbs = async () => {
    console.log(user.access);
  };

  useEffect(async () => {
    await axios
      .get("http://192.168.1.2:8000/api/probs/", {
        headers: {
          Authorization: `JWT ${user.access}`,
          "Content-Type": "multi-part/form-data",
        },
      })
      .then((res) => {
        // console.log(probs);
        if (res.data !== probs) {
          setProbs(res.data);
          console.log("SET NEW DATA");
        }
      });
  }, []);

  return (
    <View style={tw`flex-1 h-5/6 w-full`}>
      {probs?.map((prob) => (
        <View key={prob.id}>
          <Text>{prob.id}</Text>
          <Image
            source={{ uri: `http://192.168.1.2:8000${prob.image}` }}
            style={{ width: 200, height: 200 }}
          />
          <Text>{prob.image}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProbScreen;
