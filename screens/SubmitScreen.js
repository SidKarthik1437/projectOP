import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ImageState } from "../atoms/ImageState";
import tw from "twrnc";
import * as Location from "expo-location";

const SubmitScreen = () => {
  const [image, setImage] = useRecoilState(ImageState);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(text);

  return (
    <View style={tw`flex-1 items-center `}>
      <View style={tw`mx-2 w-5/6 mt-10 rounded-2xl`}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[tw`w-full h-[32rem] rounded-2xl`]}
          />
        ) : (
          <View>
            <Text>Select an image</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SubmitScreen;
