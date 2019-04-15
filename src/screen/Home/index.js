import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { observable, computed, action } from "mobx";
import { observer} from "mobx-react"

@observer
 class Home extends Component {
  navigateLogin = () => {
    this.props.navigation.navigate(NavigatorMap.Login)
  }

  render() {
    return (
      <View style={styles.container} >
      <Text style={styles.instructions}>Home</Text>
      <TouchableOpacity onPress={this.navigateLogin}>
      <Text style={styles.instructions}>Home</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Home
