import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Camera, CameraView } from 'expo-camera'
import { GoBackTop } from '../../../components/molecules'
import { BUTTON, COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from '../../../../stylesheets/theme'
import { ButtonComponent, Tag, Icon } from '../../../components/atoms'
import { CLINICS } from '../../../../services/clinic/clinicService'
import { useFocusEffect } from '@react-navigation/native'

const AddPatient = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [codeOpen, setCodeOpen] = useState(false)
  const [scannedData, setScannedData] = useState(null)
  const [trySave, setTrySave] = useState(false)
  const [savedError, setSavedError] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === 'granted')
      })()
        }, [])
    );

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data)
  }

  const renderCamera = () => {
    return (
      <View>
        <View style={UI.distances}>
          <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l, marginVertical: 20}}>Scansiona un <Text style={MAIN_STYLE.textBlueHighlight}>QR Code</Text></Text>
        </View>
        <CameraView
          style={{ flex: 1, width: '100%', height: 500 }}
          facing="back"
          onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
        />
      </View>
    )
  }

  const renderDataIncorrect = () => {
    return (
      <View>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl,marginVertical: 20}}>Oh No... 😔</Text>
        <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.paragraph, marginVertical: 10}}> <Icon icon="warning" size={25} color={COLORS.main.first}/> Questi dati che hai appena scansionato <Text style={MAIN_STYLE.textBlueHighlight}>non sono compatibili</Text> con il formato richiesto per aggiungere un nuovo utente. Ti invitiamo a ottenere un <Text style={MAIN_STYLE.textBlueHighlight}>nuovo QR Code</Text> con i dati corretti e riprovare.</Text>
        <ButtonComponent text="Torna Indietro e Riprova" action={navigationSetup} buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{ name: "arrow-back", size: 20, color: COLORS.light.first }}/>
      </View>
    )
  }

  const renderDataCorrect = (data) => {
    return(
      <View>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl,marginTop: 20, marginBottom:10}}>Perfetto! 😉</Text>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl}}>Hai scansionato i dati di un <Text style={MAIN_STYLE.textBlueHighlight}>paziente registrato.</Text></Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.xl, marginVertical: 10}}>I dati del paziente trovato sono:</Text>
        <View style={{marginVertical:20}}>
          <Tag tag={"nome"} value={data.name}/>
          <Tag tag={"cognome"} value={data.surname}/>
          <Tag tag={"token"} value={data.token}/>
        </View>
        <ButtonComponent text="Salva Paziente" action={() => saveUser(data)}buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{name:"save-outline", size:22, color:COLORS.light.first}}/>
        <ButtonComponent text="Annulla" buttonStyle={BUTTON.buttonFullRed} textStyle={TEXT.light1} action={navigationSetup}/>

      </View>
    )
  }

  const renderUserAlreadyExist = () => {
    return(
      <View style={UI.distances}>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl,marginTop: 20, marginBottom:10}}>Questo Paziente risulta gia registrato!</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.paragraph, marginBottom: 20}}>Controlla la lista dei tuoi pazienti prima di provare nuovamente</Text>
        <ButtonComponent text="Controlla lista pazienti" buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{name:"people-circle-sharp", size:20, color: COLORS.light.first}} action={() => navigation.navigate("Tab_Patients")}/>
      </View>
    )
  }

  const renderSaved = () => {
    return (
      <View style={UI.distances}>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl,marginTop: 20, marginBottom:10}}>Paziente Registato con Successo! 🥳</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.title.m, marginBottom: 20}}>Il paziente <Text style={MAIN_STYLE.textBlueHighlight}>{(JSON.parse(scannedData)).name} {(JSON.parse(scannedData)).surname}</Text> è stato aggiunto alla lista dei tuoi pazienti</Text>
        <ButtonComponent text='Vai a  "I tuoi Pazienti" ' buttonStyle={BUTTON.buttonOutlineBlue} textStyle={TEXT.blue1} icon={{name:"people-circle-sharp", size:20, color: COLORS.main.first}} action={() => navigation.navigate("Tab_Patients")}/>
      </View>
    )
  }

  const saveUser = async (data) => {
      const result = await CLINICS.addPatient(data);
      setTrySave(true);
      setSavedError(!result.success);
  }

  const renderResult = () => {
    const data = JSON.parse(scannedData);
    return (
      <View style={UI.distances}>
        {data.localDataSave === "WithMe-Data"
        ? renderDataCorrect(data)
        : renderDataIncorrect()}
      </View>
    )
  }

  const checkCameraPermission = () => {
    try {
       if (hasPermission === null) {
        return <Text>Requesting camera permission</Text>;
      } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return renderCamera();
      }
    } catch (error) {
      console.error("Error rendering camera:", error);
      return <Text>Error rendering camera</Text>;
    }
  };

  const navigationSetup = () => {
    if(codeOpen || cameraOpen ){
      setScannedData(null);
      setCodeOpen(false);
      setTrySave(false);
      setCameraOpen(false);
    }else{
      navigation.goBack();
    }
  }

  return (
    <ScrollView>

        <View>
          <GoBackTop action={navigationSetup} />
          {!trySave ?
            !cameraOpen && !codeOpen ? 
              <View style={UI.distances}>
                <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>Nuovo paziente in arrivo! 😊</Text>
                <Text style={{ fontFamily: FONTS.medium, fontSize: TYPOGRAPHY.text.xl, marginVertical: 20 }}>Scegli un opzione qui sotto per aggiungerlo</Text>
                <Text style={{ fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.paragraph, marginBottom: 20 }}>Con il <Text style={MAIN_STYLE.textBlueHighlight}>QR Code</Text> puoi semplicemente usare la fotocamera del tuo telefono per inquadrare il codice sul telefono del paziente e collegarti istantaneamente.</Text>
                <Text style={{ fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.paragraph, marginBottom: 20 }}>Se invece inserisci il <Text style={MAIN_STYLE.textBlueHighlight}>Codice Paziente</Text>, dovrai farti fornire dal paziente il suo codice unico e inserirlo nel campo specifico.</Text>

                <ButtonComponent text="Scansiona QR Code" action={() => setCameraOpen(true)} buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{ name: "qr-code", size: 20, color: COLORS.light.first }} />
                <ButtonComponent text="Inserisci Codice Paziente" action={() => setCodeOpen(true)} buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{ name: "barcode-outline", size: 20, color: COLORS.light.first }} />
              </View>
              : cameraOpen ? (scannedData ? renderResult() : checkCameraPermission())
              : codeOpen ? <Text>Code Insert</Text> : null
          :  savedError ? renderUserAlreadyExist() : renderSaved()   }
        </View>
 
      

    </ScrollView>
  )
}

export default AddPatient

