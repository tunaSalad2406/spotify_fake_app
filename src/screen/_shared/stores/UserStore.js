import { observable, runInAction } from "mobx";
import api from "../../../core/apis";

export default class UserStore {
  @observable
  profile = {};

  constructor() {
    this.fetchProfile();
  }

  fetchProfile = async () => {
    try {
      let response = await api.getUser();

      runInAction(() => {
        this.profile = response.data;
        alert("this.profile");
      });
    } catch (error) {
      console.log(error);
    }
  };
}
