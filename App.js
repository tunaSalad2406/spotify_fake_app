import React, {Component} from 'react';
import AppNavigator from "./src/navigators"
import { Provider } from 'mobx-react';
import rootStoreCreating from "./src/global_store"

 class App extends Component {
  render() {
    return (
      <Provider {...rootStoreCreating()}>
      <AppNavigator/>
      </Provider>
    );
  }
}



export default App
