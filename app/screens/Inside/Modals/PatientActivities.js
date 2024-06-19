import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { GoBackTop } from '../../../components/molecules'
import { useFocusEffect } from '@react-navigation/native';
import { CLINICS } from '../../../../services/clinic/clinicService';
import Loader from '../../../components/atoms/Loader';
import { FONTS, MAIN_STYLE, TYPOGRAPHY, UI } from '../../../../stylesheets/theme';
import ActivitiesListView from '../../../components/molecules/ActivitiesListView';

const PatientActivities = ({navigation, route}) => {
  const {token} = route.params;
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const initActivities = async () => {
        try{
          setIsLoading(true)
          const activities = await CLINICS.getPatientActivities(token);
          const patient = await CLINICS.getPatient(token)
          setPatient(patient)
          setActivities(activities);
        }catch(e){
          console.log("Error fetch activities", e);
        }finally{
          setIsLoading(false);
        }
      };

      initActivities();
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <View>
        <GoBackTop action={() => navigation.goBack()} />
        <ScrollView>
          <View style={UI.distances}>
            {patient &&
            <View>
              <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>Queste sono le attività assegante al paziente:</Text>
              <Text  style={[MAIN_STYLE.textBlueHighlight,{marginVertical:20, fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}]}>{patient ? patient.name + " " + patient.surname : patient.token}</Text>
            </View>
            }
            {isLoading 
              ? <Loader/> 
              :  activities && 
                <ActivitiesListView
                  activitiesList={activities}
                  onStartGame={(game) => navigation.navigate('GameMain', { activity: game })}
                  onOpenDoc={(doc) => navigation.navigate('Documentations', { doc })}/>
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default PatientActivities