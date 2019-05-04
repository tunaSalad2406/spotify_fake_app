import { observable, action } from "mobx";

export default class Store {
  @observable
  postContent = "";

  @action
  onContentChange = content => {
    this.postContent = content;
  };

  @action
  reset = () => {
    this.postContent = "";
  };
}
