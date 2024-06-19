import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { ButtonComponent } from "../../components/atoms";
import { BUTTON, COLORS, FONTS, TEXT, TYPOGRAPHY } from "../../../stylesheets/theme";

const Opener = ({ navigation }) => {
  return (
    <View>
      <ImageBackground style={styles.openerMain} source={require('../../../assets/img/openerBg.png')}>
      <Image style={styles.openerLogo} source={require("../../../assets/img/logo_light.png")} />
      <View style={styles.openerContainer}>
        <View style={styles.openerText}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: TYPOGRAPHY.title.xxl,
              marginBottom: 20,
              color: COLORS.light.first,
            }}
          >
            A supporto della clinica
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: TYPOGRAPHY.paragraph,
              color: COLORS.light.first,
            }}
          >
            Qui per supportare la clinica nell'offrire un'esperienza medica superiore ai pazienti, con accesso semplificato e informazioni affidabili.
          </Text>
        </View>
        <ButtonComponent
          action={() => navigation.navigate("Login")}
          buttonStyle={BUTTON.buttonFullLight}
          textStyle={TEXT.blue1}
          text="Accedi"
        />
        <ButtonComponent
          action={() => navigation.navigate("Registration")}
          buttonStyle={BUTTON.buttonOutlineLight}
          textStyle={TEXT.light1}
          text="Registarti"
        />
      </View>
      </ImageBackground>
    </View>
  );
};

export default Opener;

const styles = StyleSheet.create({
  openerMain: {
    height: '100%',
    position: "relative",
    resizeMode: 'cover',
  },
  openerLogo: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 50,
    left: 20,
    resizeMode: "contain",
  },
  openerContainer: {
    position: "absolute",
    padding: 20,
    bottom: 0,
  },
  openerText: {
    marginBottom: 40,
  },
});
