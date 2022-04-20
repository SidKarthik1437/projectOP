import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ImageState } from "../atoms/ImageState";
import tw from "twrnc";
import * as Location from "expo-location";
import axios from "axios";

const SubmitScreen = ({ navigation }) => {
  const [image, setImage] = useRecoilState(ImageState);
  const [hasGeoPermission, setHasGeoPermission] = useState(null);
  const [location, setLocation] = useState(null);
  // console.log(location);

  useEffect(() => {
    (async () => {
      const geoStatus = await Location.requestForegroundPermissionsAsync();
      setHasGeoPermission(geoStatus.status === "granted");

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const uploadData = async () => {
    let formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    console.log(formData);
    formData.append("latitude", location.coords.latitude);
    formData.append("longitude", location.coords.longitude);
    // headers.append("Authorization", "Client-ID 3980074b5b848c3");
    // var URL = "https://api.imgur.com/3/image";
    var URL = "http://192.168.29.138:8000/api/probs/create";
    // var URL = "http://192.168.29.220:8000/api/probs/create";
    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
      // body: JSON.stringify({
      //   image: image,
      //   location: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   },
      // }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-between `}>
      <View style={tw`mx-2 w-5/6 mt-10 rounded-2xl`}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[tw`w-full h-[32rem] rounded-2xl`]}
          />
        ) : (
          <View>
            <Text>Select an image</Text>
            <Button
              title="Select"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        )}
      </View>
      <View style={tw`flex-1 w-5/6`}>
        <TouchableOpacity
          style={styles.panelButton}
          title="Send"
          onPress={() => uploadData()}
        >
          <Text style={styles.panelButtonTitle}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubmitScreen;

const styles = StyleSheet.create({
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
