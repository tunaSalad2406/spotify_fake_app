import { AsyncStorage } from "react-native";
import { observable, action, runInAction } from "mobx";
import { LoginManager } from "react-native-fbsdk";
import api from "../apis";
class Storage {
  load = async () => {
    try {
      let auth = await AsyncStorage.getItem("authorization");
      if (auth !== null) {
        return auth;
      }
    } catch (error) {
      console.log(error);
    }
  };

  save = async auth => {
    try {
      AsyncStorage.setItem("authorization", auth);
    } catch (error) {
      console.log(error);
    }
  };

  clear = async () => {
    AsyncStorage.removeItem("authorization");
  };
}

export default class AuthorizationStore {
  AsyncStorageStore = new Storage();

  @observable
  accessToken = "";

  constructor() {
    this.loadAuth();
  }

  @action
  setAccessToken = async token => {
    try {
      this.accessToken = token;
      api.authorizeApi(this.accessToken);
      await this.AsyncStorageStore.save(this.accessToken);
    } catch (error) {
      console.log("setAccessToken", error);
    }
  };

  @action
  clearAccessToken = async () => {
    this.accessToken = "";
    api.authorizeApi(this.accessToken);
    await this.AsyncStorageStore.clear();
    LoginManager.logOut();
    this.loadAuth();
  };

  loadAuth = async () => {
    try {
      let auth = await this.AsyncStorageStore.load();
      runInAction(() => {
        if (!auth) {
          this.accessToken = "";
          api.authorizeApi(this.accessToken);
          return;
        }
        this.accessToken = auth;
        api.authorizeApi(this.accessToken);
      });
    } catch (error) {
      console.log("loadAuth", error);
    }
  };
}
