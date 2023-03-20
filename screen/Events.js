import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useState, useContext } from "react";
import { EventRegister } from "react-native-event-listeners";
import AppContext from "../AppContext";
import { useEffect } from "react";

const Events = ({ college_id }) => {
  //const { college_id } = route.params;
  const theme = useContext(AppContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/filesystem/events/${college_id}`
        );
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, [college_id]);

  //cards rendered here
  const renderItem = ({ item }) => (
    <View
      key={item.id}
      style={[styles.card, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.date, { color: theme.text }]}>{item.date}</Text>
      <Text style={[styles.faculty, { color: theme.text }]}>
        {item.faculty}
      </Text>
      <Text style={[styles.description, { color: theme.text }]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={stylesFirst.container}>
      <Text style={[stylesFirst.text, { color: theme.text, paddingTop: 30 }]}>
        Events
      </Text>

      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const stylesFirst = StyleSheet.create({
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
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  faculty: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Events;
