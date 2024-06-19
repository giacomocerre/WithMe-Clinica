import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useMailPasswordAuthentication } from "../../../services/auth/authService";
import { BUTTON, COLORS, FONTS, TEXT, TYPOGRAPHY } from "../../../stylesheets/theme";
import { ButtonComponent,Loader } from "../../components/atoms";
import { GoBackTop, TextInputComponent } from "../../components/molecules";

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, isError] = useState(false);
  const [loginError, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const { signUpUser } = useMailPasswordAuthentication();

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleSecondPasswordChange = (secondPassword) => {
    setSecondPassword(secondPassword);
  }

  const signUp = async () => {
    setLoading(true);
    try {
      if(password === secondPassword) {
        await signUpUser(email, password);
        navigation.navigate('Inside')
      }else{
        isError(true)
        setError('Le password non coincidono.')
      }
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
      <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>
          Benvenuto in HearMe! 👋
        </Text>
        <Text
          style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}
        >
          Iscriviti inseredo la tua email oppure tramite uno dei social.{" "}
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
        <TextInputComponent
          icon={{ name: "lock-closed-outline", size: 24 }}
          placeholder="Ripeti Password"
          onTextChange={handleSecondPasswordChange}
          secureText={true}
          color={{ normal: COLORS.light.third, focus: COLORS.main.first }}
          error={error}
        />
      {loading ? (<Loader/>) : (
        <View style={{marginTop: 20}}>
          <ButtonComponent
            text="Registrati"
            buttonStyle={BUTTON.buttonFullBlue}
            textStyle={TEXT.light1}
            action={signUp}
          />
        </View>
      )}
      {error && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {loginError}
        </Text>
      )}
      </View>

    </ScrollView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20
  }
});
