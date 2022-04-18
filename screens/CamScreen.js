import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { useRecoilState } from "recoil";
import { ImageState } from "../atoms/ImageState";
import { CamState } from "../atoms/CameraState";

const CamScreen = ({ navigation }) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [cameraacc, setCameraacc] = useRecoilState(CamState);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useRecoilState(ImageState);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      setCameraacc(false);
      navigation.navigate("Submit");
    }
  };

  return (
    <View>
      <View style={[styles.cameraContainer]}>
        {cameraacc ? (
          <Camera
            style={[styles.fixedRatio]}
            type={type}
            ratio={"1:1"}
            ref={(ref) => setCamera(ref)}
          />
        ) : (
          <View />
        )}
      </View>
      <Button
        title="Flip"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button
        title="takePicture"
        onPress={() => {
          takePicture();
        }}
      />
    </View>
  );
};

export default CamScreen;

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
