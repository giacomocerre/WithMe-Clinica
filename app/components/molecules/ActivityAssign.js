import { View, Text, Animated, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BUTTON, COLORS, FONTS, MAIN_STYLE, SHADOW, TEXT, TYPOGRAPHY } from '../../../stylesheets/theme'
import { ButtonComponent, Icon } from '../atoms';
import { ActivitiesConfig } from '../../../utils/config';
import SearchBox from './SearchBox';
import EmptyMessage from '../atoms/EmptyMessage';
import { CLINICS } from '../../../services/clinic/clinicService';
import { useFocusEffect } from '@react-navigation/native';
import { CLOUD } from '../../../services/cloud/dataService';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import Loader from '../atoms/Loader';
import UserCard from './UserCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const ActivityAssign = ({activity, translateYValue, onClose}) => {

  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);  
  
  useFocusEffect(
    React.useCallback(() => {
      const initAssignablePatients = async() => {
        const tokensToExclude = activity.assignments.map(assignment => assignment);
        const AllPatients = await CLINICS.getPatients();
        const filterPatients = AllPatients.filter(patient => !tokensToExclude.includes(patient.token))
        setPatients(filterPatients);
        setFilteredPatients(filterPatients)
      }
      initAssignablePatients();
    }, [activity])
  );

    const close = () => {
        setIsSaved(false);
        setSelectedPatients([]);
        onClose();
    }
  
    const handlerSearch = (text) => {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(text.toLowerCase()) ||
          patient.surname.toLowerCase().includes(text.toLowerCase()) ||
          patient.token.toLowerCase().includes(text.toLowerCase())
      );
  
      setFilteredPatients(filtered);
    }

    const handleSelectPatient = (patient) => {
      const index = selectedPatients.findIndex((selectedPatient) => selectedPatient.token === patient.token);
      if (index === -1) {
        setSelectedPatients([...selectedPatients, patient]);
      } else {
        const updatedSelectedPatients = [...selectedPatients];
        updatedSelectedPatients.splice(index, 1);
        setSelectedPatients(updatedSelectedPatients);
      }
    }

    const handleSaveActivity = async () => {
      setIsLoading(true);
      try {
        await Promise.all(selectedPatients.map(async (patient) => {
          activity.assignments.push(patient.token);
          const activityData = doc(collection(FIREBASE_DB, "games"), activity.id);
          await updateDoc(activityData, {
            assignments: arrayUnion(patient.token)
          }); 
          await CLINICS.assignActivity(patient.token, activity);
        }));
        setIsSaved(true);
      } catch (error) {
        console.error("Errore durante il salvataggio dell'attività:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Animated.View style={[SHADOW.normal,{ transform: [{ translateY: translateYValue }], position: 'absolute', height:500, width:screenWidth, top: 0, flex:1, borderRadius:20, left: -20, right:0, borderRadius: 20, backgroundColor: COLORS.light.first }]}>
      <View style={{padding:20, marginBottom:20, position:"relative"}}>
            <View style={{position:"absolute", zIndex:10, right:20, top:20}}>
              <Icon icon="close" size={25} action={close}/>
            </View>
            {!isSaved ?
            <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

            <View style={{marginTop:30}}>
              <Text style={{marginTop:30, alignSelf:"baseline", fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}}>Assegna a un Paziente</Text>
              <SearchBox onSearch={handlerSearch} placeholder="Nome, Cognome o Token"/>
              <Text style={{fontFamily:FONTS.regular, marginVertical:5, marginLeft:10}}>Pazienti selezionati: <Text style={MAIN_STYLE.textBlueHighlight}>{selectedPatients.length}</Text></Text>
              <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              {selectedPatients.length>0 ? <ButtonComponent text="Assegna" action={handleSaveActivity} buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1}/> : null}

                <View style={{alignItems:"center", marginTop:10}}>
                  {filteredPatients.map((patient, i) =>
                    <TouchableOpacity key={i} onPress={() => handleSelectPatient(patient)} style={
                      [SHADOW.normal,{
                      borderWidth: selectedPatients.some(selectedPatient => selectedPatient.token === patient.token) ? 5 : 0,
                      borderColor: COLORS.main.first,
                      flexDirection:"row",padding:30, borderRadius:10, width:"95%", backgroundColor:COLORS.light.first, marginBottom:20}]}>
                      <Icon icon="person-circle-sharp" size={50} color={COLORS.main.first}/>
                      <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.xxl, marginLeft:10, marginTop:10}}>{patient.name}{"\n"}<Text style={{fontSize:TYPOGRAPHY.text.m}}>{patient.surname}</Text></Text>
                      <View style={{position:"absolute", right:20, top:20, padding:10, backgroundColor:COLORS.main.first,borderRadius:100}}>
                        <Text style={{fontFamily:FONTS.bold, color:COLORS.light.first, fontSize:TYPOGRAPHY.text.s}}>{patient.token}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                {isLoading && <Loader/>}
              </ScrollView>
              {filteredPatients.length === 0 && <EmptyMessage text="Nessun paziente trovato"/>}
            </View>
            </ScrollView>
                  :
        <View style={{marginTop:30}}>
          <Text style={{ fontFamily: FONTS.bold, color: "green", fontSize:TYPOGRAPHY.title.m, marginTop: 20, marginBottom:20 }}>Attività Asseganta con successo a:</Text>
           {selectedPatients.map((patient, i) =>
            <View key={i} style={{ flexDirection:"row",backgroundColor:COLORS.main.second, padding:20, borderRadius:10, marginVertical:5}}>
              <Icon icon="person-circle-sharp" size={20} color={COLORS.light.first}/>
              {patient.name
                ? <Text style={{fontFamily:FONTS.bold, marginTop:5, marginLeft:10 ,color:COLORS.light.first}}>{patient.name} {patient.surname}</Text>
                : <Text>{patient.token}</Text>
              }
              </View>
            )}
            <View style={{paddingTop:20, marginTop:20, borderTopWidth:1, borderColor:COLORS.light.third}}>
            <ButtonComponent text="Torna alla Home" buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} action={close}/>
            </View>

          </View>
        }
          </View>
      </Animated.View>
    )
}

export default ActivityAssign