import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useRecoilState } from "recoil";
import { ImageState } from "../atoms/ImageState";
import { CamState } from "../atoms/CameraState";
import { Camera } from "expo-camera";

const HomeScreen = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useRecoilState(ImageState);
  const [cam, setCam] = useRecoilState(CamState);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
    // setCam(false);
  }, []);

  if (hasGalleryPermission === false) {
    return <View />;
  }
  if (hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Submit")}
          title="Next"
          disabled={false}
        />
      ),
    });
  }, [navigation]);

  const renderInner = () => (
    <View style={styles.panel}>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          setCam(true);
          navigation.navigate("Cam");
        }}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={tw`bg-white items-center`}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
      </View>
    </View>
  );

  let bs = React.createRef();
  let fall = new Animated.Value(1);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      navigation.navigate("Submit");
    }
  };

  return (
    <View style={[tw`items-center`, styles.container]}>
      <BottomSheet
        ref={bs}
        snapPoints={[0, 220]}
        initialSnap={1}
        enabledGestureInteraction={true}
        renderContent={renderInner}
        renderHeader={renderHeader}
        callbackNode={fall}
      />
      {image && (
        <Image source={{ uri: image }} style={[tw`w-full h-[32rem]`]} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  header: {
    backgroundColor: "#FFFFFF",
    // shadowColor: "#333333",
    // shadowOffset: { width: -1, height: -3 },
    // shadowRadius: 2,
    // shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panel: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 20,
    height: "100%",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
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
