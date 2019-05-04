import UserStore from "./UserStore";

export const SharedStoreNames = {
  User: "UserStore"
};

export default function sharedStoreCreating() {
  return {
    [SharedStoreNames.User]: new UserStore()
  };
}
