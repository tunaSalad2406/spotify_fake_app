import { createStackNavigator } from "react-navigation";
import { Home } from "../screen";
import NavigatorMap from "./NavigatorMap";

const AuthorizedNavigator = createStackNavigator(
  {
    [NavigatorMap.Home]: Home
  },
  {
    defaultNavigationOptions: { header: null }
  }
);

export default AuthorizedNavigator;
