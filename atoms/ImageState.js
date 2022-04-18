import { atom } from "recoil";

export const ImageState = atom({
  key: "ImageState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
