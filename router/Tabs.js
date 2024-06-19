import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../app/components/atoms/Icon";
import { COLORS } from "../stylesheets/theme";
import { MenuStackScreen, HomeStackScreen, ActivitiesStackScreen } from "./TabScreens";

const Tab = createBottomTabNavigator();


const TabNavigator = () => {

  const getIcon = (route, focused, color, size) => {
    let Iconsize = size;
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName =  focused ? "home-sharp" : "home-outline";
        iconSize = size;
        break;
      case 'Activities':
          iconName = focused ? "extension-puzzle-sharp" : "extension-puzzle-outline";
          iconSize = size;
          break;
      case 'Menu':
          iconName = focused ? "menu" : "menu";
          iconSize = size;
          break;

      default:
        break;
    }

      return <Icon icon={iconName} size={Iconsize} color={color} />;
  }

  return (
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      return getIcon(route, focused, color, size);
    },
    tabBarActiveTintColor: COLORS.main.first,
    tabBarInactiveTintColor: COLORS.dark.first,
  })}
>
  <Tab.Screen
    name="Home"
    component={HomeStackScreen}
    options={{  tabBarLabel: '', headerShown: false }}
  />
  <Tab.Screen
    name="Activities"
    component={ActivitiesStackScreen}
    options={{  tabBarLabel: '', headerShown: false }}
  />
  <Tab.Screen
    name="Menu"
    component={MenuStackScreen}
    options={{  tabBarLabel: '', headerShown: false }}
  />
</Tab.Navigator>
  );
};

export default TabNavigator;
