import { atom } from "recoil";

export const CamState = atom({
  key: "CamState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
