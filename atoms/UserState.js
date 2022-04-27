import { atom } from "recoil";

export const UserState = atom({
  key: "UserState", // unique ID (with respect to other atoms/selectors)
  default: {
    access: "",
    refresh: "",
  }, // default value (aka initial value)
});
