import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput
} from "react-native";
import { Icon } from "native-base";
import { observer } from "mobx-react";
import { observable, action, runInAction } from "mobx";
import api from "../../../core/apis";
import NavigatorMap from "../../../navigators/NavigatorMap";
import { withNavigation } from "react-navigation";

@observer
class PersonalInfo extends Component {
  @observable
  value = "";

  @observable
  searchResult = [];

  @action
  setValue = async newValue => {
    try {
      this.value = newValue;
      if (this.value !== "") {
        const response = await api.search(this.value);
        runInAction(() => {
          this.searchResult = response.data;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  navigateProfile = facebookId => {
    this.props.navigation.navigate(NavigatorMap.Profile, { id: facebookId });
    this.setValue("");
  };

  render() {
    const { profile } = this.props;
    return (
      <View
        style={{
          backgroundColor: "#38A1F3",
          width: "100%",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
            flex: 1
          }}
        >
          <Image
            source={{ uri: profile.avatar }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              marginRight: 20,
              marginLeft: 20,
              borderColor: "white",
              borderWidth: 0.9
            }}
          />
          <Text style={{ fontWeight: "400", color: "white" }}>
            {profile.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingVertical: 10,
            flex: 1
          }}
        >
          <Icon name="search" style={{ color: "white", fontSize: 25 }} />

          <View
            style={{
              height: 30,
              width: "50%",
              marginRight: 20,
              marginLeft: 20,
              paddingHorizontal: 5,
              flexDirection: "column"
            }}
          >
            <TextInput
              value={this.value}
              onChangeText={this.setValue}
              style={{
                height: 30,
                width: "100%",
                borderColor: "white",
                borderWidth: 0.9,
                color: "white"
              }}
            />
            {this.searchResult.length > 0 && this.value !== "" ? (
              <View
                style={{
                  backgroundColor: "white",
                  height: 100,
                  width: "100%",
                  borderColor: "#38A1F3",
                  borderWidth: 0.7,
                  zIndex: 10
                }}
              >
                {this.searchResult.map((result, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => this.navigateProfile(result.facebookId)}
                    >
                      <Text>{result.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withNavigation(PersonalInfo);
