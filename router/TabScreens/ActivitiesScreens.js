import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateActivity from "../../app/screens/Inside/Tabs/Activities_Tab/CreateActivity";
import Activities from "../../app/screens/Inside/Tabs/Activities";
import AudioActivity from "../../app/screens/Inside/Modals/Activities/Audio/Audio_Activity";

const ActivitiesStack = createNativeStackNavigator();

export const ActivitiesStackScreen = () => {
    return (
      <ActivitiesStack.Navigator>
        <ActivitiesStack.Screen name="Tab_Activities" component={Activities} options={{ headerShown: false }} />
        <ActivitiesStack.Screen name="Tab_CreateActivity" component={CreateActivity} options={{ headerShown: false }} />
      </ActivitiesStack.Navigator>
    );
};