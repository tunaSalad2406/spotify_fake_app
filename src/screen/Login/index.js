import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { observer, inject, disposeOnUnmount } from "mobx-react";
import NavigatorMap from "../../navigators/NavigatorMap";
import { StoreNames } from "../../global_store";
import { utils } from "../../core/utils";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { reaction } from "mobx";

@inject(StoreNames.Authorization)
@observer
class Login extends Component {
  @disposeOnUnmount
  updateAuthorized = reaction(
    () => {
      const { accessToken } = utils.propsFormInjection(
        StoreNames.Authorization,
        this.props
      );
      return accessToken;
    },
    accessToken => {
      if (accessToken) {
        this.navigateApp();
      }
    }
  );

  navigateApp = () => {
    this.props.navigation.navigate(NavigatorMap.App);
  };

  _fbAuth = () => {
    const { setAccessToken } = utils.propsFormInjection(
      StoreNames.Authorization,
      this.props
    );
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login Cancelled");
        } else {
          console.log("Login Success permission granted:", result);
          AccessToken.getCurrentAccessToken().then(data => {
            setAccessToken(data.accessToken);
          });
        }
      },
      function(error) {
        console.log("some error occurred!!");
      }
    );
  };

  render() {
    const { accessToken } = utils.propsFormInjection(
      StoreNames.Authorization,
      this.props
    );
    console.log("accessToken..................", accessToken);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth}>
          <Text>Login With Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default Login;
