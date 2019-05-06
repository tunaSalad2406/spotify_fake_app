import React from "react";
import { createStackNavigator } from "react-navigation";
import { Home, Profile } from "../screen";
import NavigatorMap from "./NavigatorMap";
import { observer, disposeOnUnmount, inject, Provider } from "mobx-react";
import { StoreNames } from "../global_store";
import { reaction } from "mobx";
import { utils } from "../core/utils";
import UserStore from "../screen/_shared/stores/UserStore";

const AuthorizedStack = createStackNavigator(
  {
    [NavigatorMap.Home]: Home,
    [NavigatorMap.Profile]: Profile
  },
  {
    defaultNavigationOptions: { header: null }
  }
);

@inject(StoreNames.Authorization)
@observer
class AuthorizedNavigator extends React.Component {
  static router = { ...AuthorizedStack.router };

  sharedStore = new UserStore();

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
    return (
      // rerender why ?
      <Provider UserStore={this.sharedStore}>
        <AuthorizedStack navigation={navigation} />
      </Provider>
    );
  }
}

export default AuthorizedNavigator;
