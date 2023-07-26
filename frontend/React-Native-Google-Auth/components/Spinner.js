import React from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

const windowHeight = Dimensions.get("window").height;
const Spinner = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#FFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      paddingTop: '50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006994",
     height:windowHeight
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Spinner;
