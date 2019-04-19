import { AsyncStorage } from "react-native";
import { observable, action, runInAction, reaction } from "mobx";
import { AccessToken, LoginManager } from "react-native-fbsdk";
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
    this.getAccessToken();
  }

  @action
  getAccessToken = async () => {
    try {
      const token = await AccessToken.getCurrentAccessToken();
      if (!token) {
        this.setAccessToken("");
        return;
      }
      this.setAccessToken(token.accessToken);
    } catch (error) {
      console.log("getAccessToken", error);
    }
  };

  @action
  setAccessToken = async token => {
    try {
      this.accessToken = token;
      await this.AsyncStorageStore.save(this.accessToken);
    } catch (error) {
      console.log("setAccessToken", error);
    }
  };

  @action
  clearAccessToken = async () => {
    this.accessToken = "";
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
          return;
        }
        this.accessToken = auth;
      });
    } catch (error) {
      console.log("loadAuth", error);
    }
  };
}
