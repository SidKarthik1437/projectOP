import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ImageState } from "../atoms/ImageState";
import tw from "twrnc";
import * as Location from "expo-location";

const SubmitScreen = () => {
  const [image, setImage] = useRecoilState(ImageState);
  const [hasGeoPermission, setHasGeoPermission] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const geoStatus = await Location.requestForegroundPermissionsAsync();
      setHasGeoPermission(geoStatus.status === "granted");

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      console.log(loc);
    })();
  }, []);

  const upload = async () => {};

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
