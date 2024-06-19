import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./Tabs";
import { Text, View } from "react-native";
import React, { useState } from "react";
import { CLOUD } from "../services/cloud/dataService";
import { LOCAL } from "../services/disk/dataService";
import { useFocusEffect } from "@react-navigation/native";
import * as MODALS from "../app/screens/Inside/Modals";

const InsiteStack = createNativeStackNavigator();

const InsideLayout = () => {
    const [userExists, setUserExists] = useState(null);
    const [localDataExist, setLocalDataExist] = useState(null);

    useFocusEffect(
      React.useCallback(() => {
        const checkUserExistence = async () => {
          console.log("User Exist:", await CLOUD.userExist())
          setUserExists(await CLOUD.userExist());
        };
        const checkLocalDataExistence = async () => {
          // LOCAL.deleteLocalData()
          console.log("Local File Exist:", await LOCAL.existLocalFile())
          setLocalDataExist(await LOCAL.existLocalFile()) 
        }
        checkUserExistence();
        checkLocalDataExistence()
          }, [])
      );
  
    if (userExists === null) {
      return (
        <View
          style={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <InsiteStack.Navigator
        initialRouteName={
            userExists 
              ? localDataExist 
                ? "TabNavigator"
                : 'Recovery'
              : "CodeGenerator"}
      >
        <InsiteStack.Screen
          name="CodeGenerator"
          component={MODALS.CodeGenerator}
          options={{ headerShown: false }}
        />
        <InsiteStack.Screen
          name="Recovery"
          component={MODALS.Recovery}
          options={{ headerShown: false }}
        />
         <InsiteStack.Screen
          name="BackupRecovery"
          component={MODALS.BackupRecovery}
          options={{ headerShown: false }}
        />
        <InsiteStack.Screen
          name="CodeRecovery"
          component={MODALS.CodeRecovery}
          options={{ headerShown: false }}
        />
        <InsiteStack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
          <InsiteStack.Screen
          name="AddPatient"
          component={MODALS.AddPatient}
          options={{ headerShown: false }}
        />
        <InsiteStack.Screen
          name="Patient"
          component={MODALS.Patient}
          options={{ headerShown: false }}
          initialParams={{ patientData: null }}
        />
        <InsiteStack.Screen
          name="PatientActivities"
          component={MODALS.PatientActivities}
          options={{ headerShown: false }}
          initialParams={{ token: null }}
        />
        <InsiteStack.Screen
          name="Backup"
          component={MODALS.Backup}
          options={{ headerShown: false }}
        />
          <InsiteStack.Screen
          name="ActivitiesList"
          component={MODALS.ActivitiesList}
          options={{ headerShown: false }}
        />
        <InsiteStack.Screen
          name="AudioActivity"
          component={MODALS.AudioActivity}
          options={{ headerShown: false }}
        />
        <InsiteStack.Screen
          name="GameMain"
          component={MODALS.GameMain}
          options={({ route }) => ({
            headerShown: false,
            activity: route.params.activity,
            token: route.params.token,
          })}
        />
        <InsiteStack.Screen
          name="Documentations"
          component={MODALS.Documentations}
          options={({ route }) => ({
            headerShown: false,
            doc: route.params.doc,
          })}
        />
      </InsiteStack.Navigator>
    );
  };

export default InsideLayout