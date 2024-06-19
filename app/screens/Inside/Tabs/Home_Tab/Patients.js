import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { CLINICS } from "../../../../../services/clinic/clinicService";
import {Header, UserCard, SearchBox} from "../../../../components/molecules";
import { COLORS, FONTS, TYPOGRAPHY, UI } from "../../../../../stylesheets/theme";
import { useFocusEffect } from "@react-navigation/native";

const Patients = ({navigation}) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPatients = async () => {
        const patientsData = await CLINICS.getPatients();
        setPatients(patientsData);
        setFilteredPatients(patientsData);
      };
      fetchPatients();
        }, [])
    );

  const filterPatients = (term) => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.surname.toLowerCase().includes(term.toLowerCase()) ||
        patient.token.toLowerCase().includes(term.toLowerCase())
    );
    setSearchError(filtered.length === 0)
    setFilteredPatients(filtered);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    filterPatients(text);
  };

  return (
    <View style={{flex:1}}>
      <Header />
      <View style={UI.distances}>
        <View style={{borderBottomWidth:1, marginTop:10, marginBottom:20, borderBottomColor:COLORS.light.second}}>
          <View style={{marginBottom:20}}>
            <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl}}>Lista dei pazienti</Text>
            <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.xl, marginTop:10}}>La lista dei tuo pazieti</Text>
          </View>
        </View>
        <SearchBox onSearch={handleSearch} placeholder="Cerca Paziente"/>
        <View style={{padding:10,marginLeft:10, backgroundColor:COLORS.main.first, alignSelf:"baseline", borderRadius:10}}><Text style={{color:COLORS.light.first}}>{filteredPatients.length} Pazienti</Text></View>
      </View>
      {!searchError ?
        <ScrollView style={{ width: "100%", padding:25}}>
          {filteredPatients.map((patient) => (
            <UserCard key={patient.token} patient={patient} action={() => navigation.navigate("Patient", { patientData: patient })}/>
          ))}
        </ScrollView> : 
        <Text>Nessn paziente trovato</Text>}
        </View>
  );
};

export default Patients;
