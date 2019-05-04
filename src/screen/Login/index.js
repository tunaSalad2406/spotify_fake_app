import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { observer, inject, disposeOnUnmount } from "mobx-react";
import NavigatorMap from "../../navigators/NavigatorMap";
import { StoreNames } from "../../global_store";
import { utils } from "../../core/utils";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { reaction } from "mobx";
import api from "../../core/apis";
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
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login Cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(async data => {
            const accessToken = data.accessToken;
            const responseInfoCallback = async (error, result) => {
              if (error) {
                console.log(error);
              } else {
                try {
                  let response = await api.login(accessToken);
                  setAccessToken(response.data.token);
                } catch (error) {
                  console.log(error);
                }
              }
            };
            const infoRequest = new GraphRequest(
              "/me",
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: "email,name,first_name,middle_name,last_name"
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
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
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: "white",
            fontSize: 50,
            fontWeight: "bold",
            marginBottom: 50
          }}
        >
          Spotify Fake
        </Text>
        <TouchableOpacity
          onPress={this._fbAuth}
          style={{ padding: 15, backgroundColor: "#3b5998", borderRadius: 5 }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            Login With Facebook
          </Text>
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
    backgroundColor: "#1DB954"
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
