import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../app/screens/Inside/Tabs/Home";
import Patients from "../../app/screens/Inside/Tabs/Home_Tab/Patients";

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Tab_Home" component={Home} options={{ headerShown: false }} />
        <HomeStack.Screen name="Tab_Patients" component={Patients} options={{ headerShown: false }} />
      </HomeStack.Navigator>
    );
};