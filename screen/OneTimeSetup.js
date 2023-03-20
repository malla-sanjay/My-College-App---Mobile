import { Switch } from "react-native";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const OneTimeSetup = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { color: theme.text }]}>OneTimeSetup</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 30,
  },

  minicontainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  sectioning: {
    paddingBottom: 20,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default OneTimeSetup;
