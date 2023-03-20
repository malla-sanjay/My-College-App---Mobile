import { Switch } from "react-native";
import React from "react";
import { useState, useContext } from "react";
import { EventRegister } from "react-native-event-listeners";
import AppContext from "../AppContext";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const OneTimeSetup = () => {
  const [darkmode, setDarkmode] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  //fetch college id
  const fetchColleges = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/authentication/getColleges"
      );

      const data = await response.json();
      setColleges(data.data);

      //set a default value of the first value
      if (data.data.length > 0) {
        setSelectedCollegeId(data.data[0].college_id);
        EventRegister.emit("set-college", data.data[0].college_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //handle dropdown
  const handleCollegeChange = (collegeId) => {
    setSelectedCollegeId(collegeId);
    EventRegister.emit("set-college", collegeId);
  };

  const theme = useContext(AppContext);

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { color: theme.text }]}>OneTimeSetup</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={[{ color: theme.text, paddingRight: 5 }]}>Dark Mode</Text>
        <Switch
          value={darkmode}
          onValueChange={(value) => {
            setDarkmode(value);
            EventRegister.emit("toggle-darkmode", value);
          }}
        />
      </View>

      <View style={[{ marginTop: 20 }]}>
        <Text style={[styles.label, { color: theme.text }]}>
          Select a college:
        </Text>
        <Picker
          selectedValue={selectedCollegeId}
          onValueChange={handleCollegeChange}
        >
          {colleges.map((college) => (
            <Picker.Item
              key={college.college_id}
              label={college.college_name}
              value={college.college_id}
            />
          ))}
        </Picker>
      </View>
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
