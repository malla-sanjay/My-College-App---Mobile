import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Events from "./screen/Events";
import OneTimeSetup from "./screen/OneTimeSetup";
import Schedules from "./screen/Schedules";
const tab = createMaterialBottomTabNavigator();
import { EventRegister } from "react-native-event-listeners";
import { useState, useEffect } from "react";
import { DefaultTheme } from "@react-navigation/native";
import theme from "./theme/theme";
import AppContext from "./AppContext";

//React Native Paper Component Dark theme
const themeDark = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(255, 170, 243)",
    onPrimary: "rgb(91, 0, 91)",
    primaryContainer: "rgb(129, 1, 129)",
    onPrimaryContainer: "rgb(255, 215, 245)",
    secondary: "rgb(218, 191, 210)",
    onSecondary: "rgb(61, 43, 58)",
    secondaryContainer: "rgb(85, 65, 81)",
    onSecondaryContainer: "rgb(247, 218, 239)",
    tertiary: "rgb(245, 184, 167)",
    onTertiary: "rgb(76, 38, 27)",
    tertiaryContainer: "rgb(102, 60, 47)",
    onTertiaryContainer: "rgb(255, 219, 209)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(30, 26, 29)",
    onBackground: "rgb(233, 224, 228)",
    surface: "rgb(30, 26, 29)",
    onSurface: "rgb(233, 224, 228)",
    surfaceVariant: "rgb(78, 68, 75)",
    onSurfaceVariant: "rgb(209, 194, 203)",
    outline: "rgb(154, 141, 149)",
    outlineVariant: "rgb(78, 68, 75)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(233, 224, 228)",
    inverseOnSurface: "rgb(52, 47, 50)",
    inversePrimary: "rgb(158, 42, 155)",
    elevation: {
      level0: "transparent",
      level1: "rgb(41, 33, 40)",
      level2: "rgb(48, 38, 46)",
      level3: "rgb(55, 42, 53)",
      level4: "rgb(57, 43, 55)",
      level5: "rgb(62, 46, 59)",
    },
    surfaceDisabled: "rgba(233, 224, 228, 0.12)",
    onSurfaceDisabled: "rgba(233, 224, 228, 0.38)",
    backdrop: "rgba(55, 46, 52, 0.4)",
  },
};

export default function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [college_id, setCollege_id] = useState(17);

  useEffect(() => {
    //listeners for making a global state all out
    const listener = EventRegister.addEventListener(
      "toggle-darkmode",
      (data) => {
        setDarkmode(data);
      }
    );
    const listener2 = EventRegister.addEventListener("set-college", (data) => {
      setCollege_id(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener, listener2);
    };
  }, [darkmode, college_id]);

  return (
    <AppContext.Provider value={darkmode ? theme.dark : theme.light}>
      <NavigationContainer theme={darkmode ? themeDark : DefaultTheme}>
        <tab.Navigator>
          <tab.Screen name="Settings" component={OneTimeSetup} />
          <tab.Screen name="Classes">
            {() => <Schedules college_id={college_id} />}
          </tab.Screen>
          <tab.Screen name="Events">
            {() => <Events college_id={college_id} />}
          </tab.Screen>
        </tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
