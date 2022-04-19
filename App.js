import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";
import * as NavigationBar from "expo-navigation-bar";
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { ImageState } from "./atoms/ImageState";

const Stack = createNativeStackNavigator();

import HomeScreen from "./screens/HomeScreen";
import CamScreen from "./screens/CamScreen";
import SubmitScreen from "./screens/SubmitScreen";
import SettingsScreen from "./screens/SettingsScreen";

export default function App({ navigation }) {
  // const [image] = useRecoilValue(ImageState);
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <Button
                  title="Next"
                  onPress={() => "Submit"}
                  color="#FF6347"
                  // disabled={image ? "true" : "false"}
                />
              ),
            }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Submit" component={SubmitScreen} />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Cam" component={CamScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
