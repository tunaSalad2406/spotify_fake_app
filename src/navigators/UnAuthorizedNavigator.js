import { createStackNavigator } from "react-navigation";
import { Login } from "../screen";
import NavigatorMap from "./NavigatorMap";

const UnAuthorizedNavigator = createStackNavigator(
  {
    [NavigatorMap.Login]: Login
  },
  {
    defaultNavigationOptions: { header: null }
  }
);

export default UnAuthorizedNavigator;
