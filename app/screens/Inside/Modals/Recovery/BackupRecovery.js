import {
  Text,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { ButtonComponent, Icon } from "../../../../components/atoms";
import { LOCAL } from "../../../../../services/disk/dataService";
import {
  BUTTON,
  COLORS,
  FONTS,
  MAIN_STYLE,
  TEXT,
  TYPOGRAPHY,
  UI,
} from "../../../../../stylesheets/theme";
import { GoBackTop } from "../../../../components/molecules";
import Loader from "../../../../components/atoms/Loader";

const BackupRecovery = ({ navigation }) => {
  const [backupData, setBackup] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadBackup = async () => {
    setIsUploading(true);
    const uploadData = await LOCAL.uploadBackup();
    if (uploadData.type === "success") {
      setIsUploadError(false);
      setIsUpload(true);
      setBackup(uploadData);
    } else {
      setIsUpload(false);
      setIsUploadError(true);
      setBackup(uploadData);
    }
    setIsUploading(false);
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="never"
    >
      <GoBackTop action={() => navigation.goBack()} />
      <View style={UI.distances}>
        <Text
          style={{
            fontFamily: FONTS.black,
            fontSize: TYPOGRAPHY.title.xl,
            marginBottom: 20,
          }}
        >
          {isUpload ? "Backup Caricato": "Carica un Backup"}
        </Text>
        {!isUpload && !isUploading ? (
          <View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: TYPOGRAPHY.paragraph,
                marginTop: 30,
              }}
            >
              Scegli da tuo dispositvo un file di backup.
            </Text>
            <View style={{ marginTop: 20 }}>
              <ButtonComponent
                text="Carica Backup"
                action={uploadBackup}
                buttonStyle={BUTTON.buttonFullBlue}
                textStyle={TEXT.light1}
              />
            </View>
          </View>
        ) : null}
        {isUploading ? (<Loader/>) : null}
        {isUpload && backupData ? (
          <View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: TYPOGRAPHY.title.s,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Abbiamo trovato questi <Text style={MAIN_STYLE.textBlueHighlight}>dati di backup</Text> tramite le informazioni che ci hai fornito:
            </Text>
            <View style={styles.boxHead}>
              
            <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: TYPOGRAPHY.text.xxl,
                  color: COLORS.light.first
                }}
              >
                  <Icon
                  icon="time-outline"
                  size={25}
                  color={COLORS.light.first}
                  fontSize={TYPOGRAPHY.text.xxl}
                  fontFamily={FONTS.extraBold}
                  text={"Backup del: " + backupData.backupDate}
                />
                  </Text>
            </View>
            <View style={styles.box}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  icon="person"
                  size={25}
                  color={COLORS.main.first}
                  fontSize={TYPOGRAPHY.text.xl}
                  fontFamily={FONTS.bold}
                  text={"Email"}
                />
                <View style={styles.key}>
                  <Text
                    style={{
                      fontFamily: FONTS.bold,
                      fontSize: TYPOGRAPHY.text.l,
                    }}
                  >
                    {backupData.data.email}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon
                  icon="barcode-outline"
                  size={25}
                  color={COLORS.main.first}
                  fontSize={TYPOGRAPHY.text.xl}
                  fontFamily={FONTS.bold}
                  text={"Token"}
                />
                <View style={styles.key}>
                  <Text
                    style={{
                      fontFamily: FONTS.bold,
                      fontSize: TYPOGRAPHY.text.l,
                    }}
                  >
                    {backupData.data.token}
                  </Text>
                </View>
              </View>
            </View>
            <ButtonComponent text="Salva e Procedi" buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} action={() => navigation.navigate("TabNavigator")}/>
          </View>
        ) : null}
        {isUploadError && backupData ? (
          <View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: TYPOGRAPHY.title.s,
                color: COLORS.error,
                marginTop: 20,
              }}
            >
              <Icon icon="warning" size={20} color={COLORS.error}></Icon>
              {backupData.message}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default BackupRecovery;

const styles = StyleSheet.create({
  boxHead: {
    backgroundColor:COLORS.main.second,
    padding: 10,
    marginTop: 20, borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  box: {
    paddingHorizontal:20,
    paddingVertical: 40,
    backgroundColor: COLORS.light.first,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 10,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
  },
  key: {
    fontSize: TYPOGRAPHY.text.l,
    fontFamily: FONTS.bold,
    position: "relative",
    bottom: 5,
    left: 10,
    padding: 10,
  },
});
