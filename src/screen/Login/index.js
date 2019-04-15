import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { observable, computed, action } from "mobx";
import { observer} from "mobx-react"
import NavigatorMap from "../../navigators/NavigatorMap"

@observer
 class Login extends Component {
  navigateHome = () => {
    console.log(this.props)
    this.props.navigation.navigate(NavigatorMap.Home)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Login {this.elapsedTime}</Text>
        <TouchableOpacity onPress={this.navigateHome}>
          <Text>Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login
