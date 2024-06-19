import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InsideLayout from "./Inside";
import Opener from "../app/screens/Public/Opener";
import Login from "../app/screens/Public/Login";
import Registration from "../app/screens/Public/Registration";

const Stack = createNativeStackNavigator();

const Router = (loaderRootView) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer onLayout={loaderRootView}>
      <Stack.Navigator initialRouteName="Opener">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Opener"
            component={Opener}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
