import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useMailPasswordAuthentication } from "../../../services/auth/authService";
import { BUTTON, COLORS, FONTS, TEXT, TYPOGRAPHY, UI } from "../../../stylesheets/theme";
import { ButtonComponent } from "../../components/atoms";
import { GoBackTop, TextInputComponent } from "../../components/molecules";
import Loader from "../../components/atoms/Loader";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, isError] = useState(false);
  const [loginError, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const { signInUser } = useMailPasswordAuthentication();
  
 
  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await signInUser(email, password);
      navigation.navigate('Inside')
    } catch (error) {
      isError(true);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      <GoBackTop action={() => navigation.navigate('Opener')}/>
      <View style={{ marginTop: 50, padding: 20 }}>
        <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>
          Che piacere
        </Text>
        <Text style={{ fontFamily: FONTS.bold, fontSize: 35 }}>
          vederti di nuovo! 👋
        </Text>
        <Text
          style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}
        >
          Inserisci le tue credenziali per accedere alla tua clinica e gestire
          le attività.{" "}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInputComponent
          icon={{ name: "mail-outline", size: 24 }}
          placeholder="E-mail"
          secureText={false}
          onTextChange={handleEmailChange}
          color={{
            normal: COLORS.light.third,
            focus: COLORS.main.first,
            error: "red",
          }}
          error={error}
        />
        <TextInputComponent
          icon={{ name: "lock-closed-outline", size: 24 }}
          placeholder="Password"
          onTextChange={handlePasswordChange}
          secureText={true}
          color={{ normal: COLORS.light.third, focus: COLORS.main.first }}
          error={error}
        />
      </View>
      {loading ? (<Loader/>) : (
        <View style={UI.distances}>
        <ButtonComponent
          text="Accedi"
          buttonStyle={BUTTON.buttonFullBlue}
          textStyle={TEXT.light1}
          action={signIn}
        />
        </View>
      )}
      {error && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {loginError}
        </Text>
      )}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
  },
  loginButtonContainer: {
    alignItems: "center",
    backgroundColor: COLORS.main.first,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: COLORS.light.first,
  },
});
