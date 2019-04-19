import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StoreNames } from "../../global_store";
import { observer, inject } from "mobx-react";
import { utils } from "../../core/utils";

@inject(StoreNames.Authorization)
@observer
class Home extends Component {
  navigateLogin = () => {
    this.props.navigation.navigate(NavigatorMap.Login);
  };

  _fbLogout = () => {
    utils
      .propsFormInjection(StoreNames.Authorization, this.props)
      .clearAccessToken();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Home</Text>
        <TouchableOpacity onPress={this._fbLogout}>
          <Text>Logout</Text>
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
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default Home;
