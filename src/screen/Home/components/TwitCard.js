import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, CardItem, Body, Icon } from "native-base";
import { observer } from "mobx-react";
import NavigatorMap from "../../../navigators/NavigatorMap";
import { withNavigation } from "react-navigation";
import moment from "moment";
import api from "../../../core/apis";

@observer
class TwitCard extends Component {
  navigateProfile = () => {
    const { facebookId } = this.props.post.user;
    this.props.navigation.navigate(NavigatorMap.Profile, { id: facebookId });
  };

  calculateTime = passTime => {
    var start = moment(passTime, "HH:mm:ss");
    var minutesPassed = moment().diff(start, "minutes");
    return Math.abs(minutesPassed);
  };

  upvote = async id => {
    try {
      await api.upvote(id);
    } catch (error) {
      console.log("error cunt", error);
    }
  };

  downvote = async id => {
    try {
      await api.downvote(id);
    } catch (error) {
      console.log("error cunt", error);
    }
  };

  render() {
    const { post, profile } = this.props;
    const { vote } = post;
    const isVoted =
      vote &&
      vote.voter &&
      vote.voter.some(voteName => {
        return voteName === profile.name;
      });

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
            onPress={this.navigateProfile}
            style={{ width: "50%" }}
          >
            <Text style={{ fontWeight: "bold" }}>{post.user.name}</Text>
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
            backgroundColor: "#38A1F3"
          }}
        >
          <View>
            <Text style={{ color: "white" }}>{`${(post.vote &&
              post.vote.amount) ||
              0} vote`}</Text>
          </View>

          {!isVoted && (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 30
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderWidth: 0.7,
                  borderColor: "white",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 2
                }}
                onPress={() => this.upvote(post._id)}
              >
                <Icon
                  name="ios-arrow-round-up"
                  style={{ color: "white", width: 20 }}
                />
                <Text style={{ color: "white" }}>Upvote</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderWidth: 0.7,
                  borderColor: "white",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.downvote(post._id)}
              >
                <Icon
                  name="ios-arrow-round-down"
                  style={{ color: "white", width: 20 }}
                />
                <Text style={{ color: "white" }}>Downvote</Text>
              </TouchableOpacity>
            </View>
          )}
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({});

export default withNavigation(TwitCard);
