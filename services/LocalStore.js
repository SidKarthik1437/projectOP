import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value) => {
  value = JSON.stringify(value);
  try {
    await AsyncStorage.setItem("@user", value);
  } catch (e) {
    console.error(e);
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
