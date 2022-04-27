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
import Toast from "react-native-toast-message";
import axios from "axios";
import { UserState } from "../atoms/UserState";

const SubmitScreen = ({ navigation }) => {
  const [image, setImage] = useRecoilState(ImageState);
  const [hasGeoPermission, setHasGeoPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [user, setUser] = useRecoilState(UserState);
  // console.log(location);

  useEffect(() => {
    (async () => {
      const geoStatus = await Location.requestForegroundPermissionsAsync();
      setHasGeoPermission(geoStatus.status === "granted");

      // let loc = await Location.getCurrentPositionAsync({});
      // setLocation(loc);
    })();
  }, []);
  const getLoc = async () => {
    // const geoStatus = await Location.requestForegroundPermissionsAsync();
    // setHasGeoPermission(geoStatus.status === "granted");

    return await Location.getCurrentPositionAsync();
  };

  const uploadData = async () => {
    let formData = new FormData();
    await getLoc().then((loc) => {
      setLocation(loc);
      // console.log(location);
    });
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    formData.append("latitude", location.coords.latitude);
    formData.append("longitude", location.coords.longitude);
    console.log(formData);
    // headers.append("Authorization", "Client-ID 3980074b5b848c3");
    // var URL = "https://api.imgur.com/3/image";
    // var URL = "https://6e74-2405-201-d001-dbe6-b04d-2c5d-58a7-4d1.in.ngrok.io/api/probs/create";
    var URL = "http://192.168.1.2:8000/api/probs/create";
    // var URL = "http://192.168.29.220:8000/api/probs/create";
    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${user.access}`,
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
      // await axios
      //   .post(URL, formData, {
      //     headers: {
      //       // Accept: "application/json",
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `JWT ${user.access}`,
      //     },
      //   })
      .then((res) => {
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Image and Location Uploaded Successfully!",
          topOffset: 10,
          visibilityTime: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pushNotif = () => {
    // notifee.createChannel({
    //   id: "general",
    //   name: "General",
    //   importance: AndroidImportance.HIGH,
    // });
    // notifee.displayNotification({
    //   title: "Notification",
    //   body: "Hello World",
    //   android: {
    //     channelId: "general",
    //   },
    // });
    Toast.show({
      type: "success",
      text1: "Image and Location Uploaded Successfully!",
      topOffset: 10,
      visibilityTime: 1000,
    });
  };

  return (
    <View style={tw`flex-1 items-center justify-between `}>
      <View style={{ zIndex: 10 }}>
        <Toast style={{ backgroundColor: "red" }} />
      </View>
      <View style={tw`mx-2 w-5/6 mt-10 rounded-2xl`}>
        {image ? (
          <View>
            <Image
              source={{ uri: image }}
              style={[tw`w-full h-[32rem] rounded-2xl`]}
            />
          </View>
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
      <View style={tw`flex-1 w-5/6`}>
        <TouchableOpacity
          style={styles.panelButton}
          title="Send"
          onPress={() => pushNotif()}
        >
          <Text style={styles.panelButtonTitle}>Push</Text>
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
