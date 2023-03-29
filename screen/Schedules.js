import React from "react";
import { useContext } from "react";
import { EventRegister } from "react-native-event-listeners";
import AppContext from "../AppContext";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Picker } from "react-native";

const Schedules = ({ college_id }) => {
  const [classes, setClasses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const [selectedDay, setSelectedDay] = useState("ALL");

  useEffect(() => {
    //Grab events data
    console.log();
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/filesystem/classes/${college_id}`
        );
        const data = await response.json();
        setClasses(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    //grab student group data from college
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/studentGroup/getStudentGroup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              college_id: college_id,
            }),
          }
        );
        const data = await response.json();
        setGroups(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
    fetchGroups();
  }, [college_id]);

  //classes
  const renderCards = () => {
    let filteredClasses = classes;
    if (selectedGroup !== "ALL") {
      filteredClasses = classes.filter((c) => c.group === selectedGroup);
    }
    if (selectedDay !== "ALL") {
      filteredClasses = filteredClasses.filter(
        (c) => c.dayOfWeek === selectedDay
      );
    }
    return filteredClasses.map((c) => (
      <View
        key={c.id}
        style={[
          styles.card,
          { backgroundColor: theme.background2, marginTop: 15 },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          {c.module} - {c.teacher}
        </Text>
        <Text style={[styles.info, { color: theme.text }]}>
          {c.dayOfWeek} {c.startingTime} ({c.duration})
        </Text>
        <Text style={[styles.info, { color: theme.text }]}>{c.classroom}</Text>
        <Text style={[styles.info, { color: theme.text }]}>{c.block}</Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {c.faculty}
        </Text>
      </View>
    ));
  };

  //Group Filter
  const renderPickerItems = () => {
    return groups.map((group) => (
      <Picker.Item
        key={group.student_group_id}
        label={group.student_group_id}
        value={group.student_group_id}
      />
    ));
  };

  // Day filter
  const renderDayPickerItems = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    return (
      <>
        <Picker.Item key="ALL" label="Any Day" value="ALL" />
        {daysOfWeek.map((day) => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </>
    );
  };

  const theme = useContext(AppContext);
  return (
    <View style={style1.container}>
      <Text
        style={[
          style1.text,
          { color: theme.text, marginTop: 30, marginBottom: 20 },
        ]}
      >
        Schedules
      </Text>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[{ marginBottom: 10 }]}>
          <Picker
            selectedValue={selectedGroup}
            onValueChange={(itemValue) => setSelectedGroup(itemValue)}
          >
            <Picker.Item key="ALL" label="ALL Group" value="ALL" />
            {renderPickerItems()}
          </Picker>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
          >
            {renderDayPickerItems()}
          </Picker>
        </View>

        <ScrollView>{renderCards()}</ScrollView>
      </View>
    </View>
  );
};

const style1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default Schedules;
