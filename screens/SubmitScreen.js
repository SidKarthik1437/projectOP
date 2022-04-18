import { View, Text, Image } from "react-native";
import React from "react";
import { useRecoilState } from "recoil";
import { ImageState } from "../atoms/ImageState";
import tw from "twrnc";

const SubmitScreen = () => {
  const [image, setImage] = useRecoilState(ImageState);
  return (
    <View style={tw`flex-1 items-center `}>
      <View style={tw`mx-2 w-5/6 mt-10 rounded-2xl`}>
        {image && (
          <Image
            source={{ uri: image }}
            style={[tw`w-full h-[32rem] rounded-2xl`]}
          />
        )}
      </View>
    </View>
  );
};

export default SubmitScreen;
