import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { observable, computed, action } from "mobx";
import { observer} from "mobx-react"

@observer
 class App extends Component {
  @observable start = Date.now();
  @observable current = Date.now();

  @computed
  get elapsedTime() {
    return this.current - this.start + "milliseconds";
  }

  @action
  tick() {
    this.current = Date.now();
  }
  render() {
    console.log(this.start)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js {this.elapsedTime}</Text>
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

export default App
