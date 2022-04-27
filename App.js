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
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HeaderStyleInterpolators } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from "./screens/HomeScreen";
import CamScreen from "./screens/CamScreen";
import SubmitScreen from "./screens/SubmitScreen";
import ProbScreen from "./screens/ProbScreen";
import SettingsScreen from "./screens/SettingsScreen";

import LoginScreen from "./screens/LoginScreen";
import tw from "twrnc";

function DrawerRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      <Stack.Screen name="Submit" component={SubmitScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Cam" component={CamScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App({ navigation }) {
  // const [image] = useRecoilValue(ImageState);
  return (
    <RecoilRoot>
      <SafeAreaProvider style={tw``}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              swipeEdgeWidth: 600,
            }}
          >
            <Drawer.Screen name="Main" component={DrawerRoutes} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Probs" component={ProbScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
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

// options={{
//           headerRight: () => (
//             <Button
//               title="Next"
//               onPress={() => "Submit"}
//               color="#FF6347"
//               style={{ marginRight: 10 }}
//               // disabled={image ? "true" : "false"}
//             />
//           ),
//         }}
