import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, CardItem, Body, Icon } from "native-base";
import { observer } from "mobx-react";
import NavigatorMap from "../../../navigators/NavigatorMap";
import { withNavigation } from "react-navigation";
import moment from "moment";

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

  render() {
    const { post } = this.props;
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
            backgroundColor: "#38A1F3",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity>
            <Icon name="ios-add-circle-outline" style={{ color: "white" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-close-circle-outline" style={{ color: "white" }} />
          </TouchableOpacity>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({});

export default withNavigation(TwitCard);
