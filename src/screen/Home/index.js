import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Footer, Container, Content, Body, Header } from "native-base";
import { observable, runInAction } from "mobx";
import { StoreNames } from "../../global_store";
import { SharedStoreNames } from "../_shared/stores";
import { observer, inject } from "mobx-react";
import { utils } from "../../core/utils";
import Post from "../Post";
import { TwitCard, PersonalInfo } from "./components";
import NavigatorMap from "../../navigators/NavigatorMap";
import api from "../../core/apis";
@inject(StoreNames.Authorization, SharedStoreNames.User)
@observer
class Home extends Component {
  @observable
  posts = [];

  @observable
  profile = {};

  componentDidMount() {
    this.fetch();
  }

  navigateLogin = () => {
    this.props.navigation.navigate(NavigatorMap.Login);
  };

  fetch = async () => {
    try {
      let response = await api.getPost();
      runInAction(() => {
        this.posts = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  _fbLogout = () => {
    utils
      .propsFormInjection(StoreNames.Authorization, this.props)
      .clearAccessToken();
  };

  render() {
    const { profile } = utils.propsFormInjection(
      SharedStoreNames.User,
      this.props
    );
    return (
      <Container>
        <Header style={styles.height}>
          <Body>
            <Text>{NavigatorMap.Home}</Text>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container} scrollEnabled={false}>
          <PersonalInfo profile={profile} style={styles.info} />
          <Post />
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            {this.posts &&
              this.posts.map((post, key) => {
                return <TwitCard post={post} key={key} profile={profile} />;
              })}
          </ScrollView>
        </Content>
        <Footer>
          <TouchableOpacity onPress={this._fbLogout} style={styles.logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  height: { height: 50 },
  info: { width: "100%", backgroundColor: "#38A1F3" },
  scrollview: { width: "80%", marginBottom: 20 },
  container: {
    flex: 1,
    alignItems: "center"
  },
  instructions: {
    textAlign: "center",
    marginBottom: 5
  },
  logout: {
    padding: 10,
    backgroundColor: "#38A1F3",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  logoutText: { color: "white", fontSize: 15 }
});

export default Home;
