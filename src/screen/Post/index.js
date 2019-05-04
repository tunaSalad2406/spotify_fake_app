import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { observer, inject } from "mobx-react";
import Store from "./Store";
import { runInAction } from "mobx";
import { SharedStoreNames } from "../_shared/stores";
import { utils } from "../../core/utils";
import api from "../../core/apis";

@inject(SharedStoreNames.User)
@observer
class Post extends Component {
  store = new Store();

  twit = async () => {
    const { profile } = utils.propsFormInjection(
      SharedStoreNames.User,
      this.props
    );
    const { postContent, reset } = this.store;
    await api.post(profile.facebookId, profile.name, postContent);
    runInAction(() => reset());
  };

  render() {
    const { onContentChange, postContent } = this.store;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="What's on your mind?"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 0.4,
            padding: 10,
            width: 300,
            marginBottom: 10
          }}
          onChangeText={onContentChange}
          value={postContent}
        />
        <TouchableOpacity onPress={this.twit} style={styles.twit}>
          <Text style={styles.text}>Twit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  twit: {
    backgroundColor: "#38A1F3",
    padding: 5,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  text: {
    color: "white",
    fontSize: 15
  }
});

export default Post;
