import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Events from "./screen/Events";
import OneTimeSetup from "./screen/OneTimeSetup";
import Schedules from "./screen/Schedules";
const tab = createMaterialBottomTabNavigator();
import { EventRegister } from "react-native-event-listeners";
import { useState, useEffect } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import theme from "./theme/theme";
import AppContext from "./AppContext";

export default function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [college_id, setCollege_id] = useState(17);

  return (
    <tab.Navigator>
      <tab.Screen name="Settings" component={OneTimeSetup} />
      <tab.Screen name="Classes">
        {() => <Schedules college_id={college_id} />}
      </tab.Screen>
      <tab.Screen name="Events">
        {() => <Events college_id={college_id} />}
      </tab.Screen>
    </tab.Navigator>
  );
}
