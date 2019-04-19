import React from "react";
import { createStackNavigator } from "react-navigation";
import { Home } from "../screen";
import NavigatorMap from "./NavigatorMap";
import { observer, disposeOnUnmount, inject } from "mobx-react/native";
import { StoreNames } from "../global_store";
import { reaction } from "mobx";
import { utils } from "../core/utils";

const AuthorizedStack = createStackNavigator(
  {
    [NavigatorMap.Home]: Home
  },
  {
    defaultNavigationOptions: { header: null }
  }
);

@inject(StoreNames.Authorization)
@observer
class AuthorizedNavigator extends React.Component {
  static router = { ...AuthorizedStack.router };
  @disposeOnUnmount
  updateOnAuthorized = reaction(
    () => {
      const { accessToken } = utils.propsFormInjection(
        StoreNames.Authorization,
        this.props
      );
      return accessToken;
    },
    accessToken => {
      if (!accessToken) {
        this.navigateAuth();
      }
    }
  );

  navigateAuth = () => {
    this.props.navigation.navigate(NavigatorMap.Auth);
  };

  render() {
    const { navigation } = this.props;
    return <AuthorizedStack navigation={navigation} />;
  }
}

export default AuthorizedNavigator;