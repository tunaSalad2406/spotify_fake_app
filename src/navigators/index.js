import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {Home,Login} from "../screen"
import NavigatorMap from "./NavigatorMap"

const AppStack = createStackNavigator({ [NavigatorMap.Home] : Home });
const AuthStack = createStackNavigator({ [NavigatorMap.Login]: Login });

  const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    [NavigatorMap.App]: AppStack,
    [NavigatorMap.Auth]: AuthStack,
  },
  {
    initialRouteName: NavigatorMap.Auth,
  }
));

export default AppNavigator
