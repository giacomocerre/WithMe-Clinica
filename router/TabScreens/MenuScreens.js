import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../../app/screens/Inside/Tabs/Menu.js";
import Backup from "../../app/screens/Inside/Modals/Backup.js";

const MenuStack = createNativeStackNavigator();

export const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Tab_Menu" component={Menu} options={{ headerShown: false }} />
    </MenuStack.Navigator>
  );
};