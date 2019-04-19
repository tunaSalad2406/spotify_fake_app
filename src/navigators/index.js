import { createSwitchNavigator, createAppContainer } from "react-navigation";
import NavigatorMap from "./NavigatorMap";
import AuthorizedNavigator from "./AuthorizedNavigator";
import UnAuthorizedNavigator from "./UnAuthorizedNavigator";

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      [NavigatorMap.App]: AuthorizedNavigator,
      [NavigatorMap.Auth]: UnAuthorizedNavigator
    },
    {
      initialRouteName: NavigatorMap.Auth
    }
  )
);

export default AppNavigator;
