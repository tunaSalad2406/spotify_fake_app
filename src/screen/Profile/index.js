import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { observer, inject } from "mobx-react";
import {
  Footer,
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Header
} from "native-base";
import NavigatorMap from "../../navigators/NavigatorMap";
import { runInAction, observable } from "mobx";
import moment from "moment";
import api from "../../core/apis";
import { SharedStoreNames } from "../_shared/stores";
import { utils } from "../../core/utils";

@inject(SharedStoreNames.User)
@observer
class Profile extends Component {
  @observable
  profile = {};

  @observable
  posts = [];

  componentDidMount() {
    this.fetchProfile();
    this.fetchPosts();
  }

  fetchProfile = async () => {
    try {
      const { id } = this.props.navigation.state.params;
      const response = await api.getUserById(id);
      runInAction(() => {
        this.profile = response.data;
        console.log("this................", this.profile);
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchPosts = async () => {
    const { id } = this.props.navigation.state.params;
    const response = await api.getPostById(id);
    runInAction(() => {
      this.posts = response.data;
    });
  };

  calculateTime = passTime => {
    var start = moment(passTime, "HH:mm:ss");
    var minutesPassed = moment().diff(start, "minutes");
    return Math.abs(minutesPassed);
  };

  render() {
    const { profile } = utils.propsFormInjection(
      SharedStoreNames.User,
      this.props
    );

    const isFollowed =
      profile &&
      profile.following &&
      profile.following.some(name => {
        return name === this.profile.name;
      });
    console.log(
      ".......profile",
      utils.propsFormInjection(SharedStoreNames.User, this.props)
    );
    return (
      <Container>
        <Header style={styles.height}>
          <Body>
            <Text>{NavigatorMap.Profile}</Text>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container} scrollEnabled={false}>
          <View style={styles.headWrapper}>
            <View style={styles.head}>
              <Image
                source={{ uri: this.profile.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.profileName}>{this.profile.name}</Text>
            </View>
            {profile.facebookId !== this.profile.facebookId && !isFollowed ? (
              <View style={styles.head}>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={async () => {
                    const res = await api.follow(this.profile.name);
                    console.log("follow....", res);
                  }}
                >
                  <Text style={styles.white}>Follow</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {isFollowed ? (
              <View style={styles.head}>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={async () => {
                    const res = await api.unfollow(this.profile.name);
                    console.log("unfollow....", res);
                  }}
                >
                  <Text style={styles.white}>Unfollow</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            {this.posts &&
              this.posts.map((post, key) => {
                return (
                  <Card style={{ width: "100%" }}>
                    <CardItem
                      header
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "flex-start"
                      }}
                    >
                      <TouchableOpacity
                        onPress={this.navigateDetail}
                        style={{ width: "50%" }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          {post.user.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <Text style={{ fontWeight: "100" }}>
                          {this.calculateTime(post.createdAt)} minutes ago
                        </Text>
                      </View>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>{post.content}</Text>
                      </Body>
                    </CardItem>
                    <CardItem
                      footer
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#38A1F3",
                        justifyContent: "flex-end"
                      }}
                    >
                      <TouchableOpacity>
                        <Icon
                          name="ios-add-circle-outline"
                          style={{ color: "white" }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Icon
                          name="ios-close-circle-outline"
                          style={{ color: "white" }}
                        />
                      </TouchableOpacity>
                    </CardItem>
                  </Card>
                );
              })}
          </ScrollView>
        </Content>
        <Footer />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  white: { color: "white" },
  followButton: {
    marginHorizontal: 20,
    borderWidth: 0.7,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  height: { height: 50 },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 20,
    borderColor: "white",
    borderWidth: 0.9
  },
  head: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10
  },
  headWrapper: {
    backgroundColor: "#38A1F3",
    width: "100%",
    flexDirection: "row"
  },
  profileName: { fontWeight: "400", color: "white" },
  scrollview: { width: "80%", marginBottom: 20 }
});

export default Profile;
