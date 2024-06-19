import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Animated, Dimensions, ScrollView, TouchableOpacity, ImageBackground, Keyboard } from "react-native";
import { CLOUD } from "../../../../services/cloud/dataService";
import { CLINICS } from "../../../../services/clinic/clinicService";
import { ButtonComponent, Icon } from "../../atoms";
import { BUTTON, COLORS, FONTS, MAIN_STYLE, SHADOW, TEXT, TYPOGRAPHY } from "../../../../stylesheets/theme";
import { SearchBox } from "../../molecules";
import {EmptyMessage, Loader} from "../../atoms";
import { appBackground, appCovers } from "../../../../utils/config";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SaveActivity = ({ navigation, activity, type, onSaved }) => {
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descrError, setDescrError] = useState(false);
  const [isSelectPatientOpen, setSelectPatientOpen] = useState(false);
  const [isCoversOpen, setCoversOpen] = useState(false);
  const [isBackgroundsOpen, setBackgroundsOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const [covers] = useState(new Animated.Value(0));
  const [backgrounds] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false); 
  const [isSaved, setIsSaved] = useState(false);

  const handlerGoHome = () => {
    onSaved();
  }

  const handleTextChange = (text) => {
    setTitleError(false);
    setActivityTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescrError(false);
    setActivityDescription(text);
  }

  const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
  };

  const handleSaveActivity = async () => {
    if(activityTitle === "") {
      setTitleError(true);
      return;
    }
    if(activityDescription === "") {
      setDescrError(true);
      return;
    }
    setIsLoading(true);
    setTitleError(false); 
    const ID = generateRandomId();
    const theActivity = {
      id: ID,
      title: activityTitle,
      description: activityDescription,
      type,
      activity,
      cover: {id:selectedCover.id, filename:selectedCover.filename},
      background: {id:selectedBackground.id, filename:selectedBackground.filename},
      assignments: selectedPatients.map(patient => patient.token)
    };

    await CLOUD.newDoc("games", theActivity, ID);
    await Promise.all(selectedPatients.map(async (patient) => {
      await CLINICS.assignActivity(patient.token, theActivity);
    }));
    setIsLoading(false);
    setIsSaved(true);
  };

  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectPatientOpen(false);
    });
  };

  const handleCoversClose = () => {
    Animated.timing(covers, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCoversOpen(false);
    });
  };

  const handleBackgroundsClose = () => {
    Animated.timing(backgrounds, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setBackgroundsOpen(false);
    });
  };

  const handlerAssign = async() => {
    console.log("qua")
    setSelectPatientOpen(true);
    const patients = await CLINICS.getPatients();
    console.log(patients)
    setPatients(patients);
    setFilteredPatients(patients)
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

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isSelectPatientOpen ? 1 : 0,
      duration: 300, 
      useNativeDriver: true,
    }).start();
  }, [isSelectPatientOpen]);

  useEffect(() => {
    Animated.timing(covers, {
      toValue: isCoversOpen ? 1 : 0,
      duration: 300, 
      useNativeDriver: true,
    }).start();
  }, [isCoversOpen]);

  useEffect(() => {
    Animated.timing(backgrounds, {
      toValue: isBackgroundsOpen ? 1 : 0,
      duration: 300, 
      useNativeDriver: true,
    }).start();
  }, [isBackgroundsOpen]);

  const handleSelectPatient = (patient) => {
    const index = selectedPatients.findIndex((selectedPatient) => selectedPatient.token === patient.token);
    if (index === -1) {
      setSelectedPatients([...selectedPatients, patient]);
    } else {
      const updatedSelectedPatients = [...selectedPatients];
      updatedSelectedPatients.splice(index, 1);
      setSelectedPatients(updatedSelectedPatients);
    }
  };

  return (
    <View style={{flex:1}}>
      {!isSaved ? 
      <View style ={{flex:1}}>
        <ScrollView style={{opacity:isSelectPatientOpen ? 0.5 : 1}}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginBottom: 5, fontFamily:FONTS.bold }}>
              Come vuoi chiamare questa attività?
            </Text>
            <TextInput
              style={{ padding: 10, borderColor: COLORS.main.first, borderRadius:10, fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l, borderBottomWidth: 3, backgroundColor:"#fff" }}
              placeholder="Nome Attività..."
              onChangeText={handleTextChange}
              value={activityTitle}
            />
            {titleError && (
              <Text style={{ color: "red", fontFamily: FONTS.bold }}>
                Il titolo dell'attività è obbligatorio!
              </Text>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginBottom: 5, fontFamily:FONTS.bold }}>
              Descrivi in poche parola questa attività
            </Text>
            <TextInput
              multiline={true}
              style={{ padding: 10, height:100, borderColor: COLORS.main.first, borderRadius:10, fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.m, borderBottomWidth: 3, backgroundColor:"#fff" }}
              placeholder="Descrizione.."
              onChangeText={handleDescriptionChange}
              value={activityDescription}
              onBlur={() => Keyboard.dismiss()}
            />
            {descrError && (
              <Text style={{ color: "red", fontFamily: FONTS.bold }}>
                La descrizione dell'attività è obbligatoria!
              </Text>
            )}
          </View>
          <Text style={{marginTop:30, fontFamily:FONTS.bold}}>Scegli la cover della tua attività:</Text>      
          <View style={{flex:1}}>
            {selectedCover 
              ? 
                <TouchableOpacity onPress={() => setCoversOpen(true)}>
                  <ImageBackground           
                    source={selectedCover.image} 
                    style={{
                      height:100, 
                      width:100, 
                      borderRadius: 20 , 
                      margin:5, 
                      overflow: 'hidden'
                    }}
                    resizeMode="cover"/>
                </TouchableOpacity>           
              : <ButtonComponent text="Scegli Cover" buttonStyle={BUTTON.buttonOutlineBlue} textStyle={TEXT.blue1} action={() => setCoversOpen(true)}/>
            }
            <Text style={{marginTop:30, fontFamily:FONTS.bold}}>Scegli uno sfondo per la tua attività:</Text>      
                  {selectedBackground 
                    ? 
                      <TouchableOpacity onPress={() => setBackgroundsOpen(true)}>
                        <ImageBackground           
                          source={selectedBackground.image} 
                          style={{
                            height:100, 
                            width:100, 
                            borderRadius: 20 , 
                            margin:5, 
                            overflow: 'hidden'
                          }}
                          resizeMode="cover"/>
                      </TouchableOpacity>           
                    : <ButtonComponent text="Scegli Sfondo" buttonStyle={BUTTON.buttonOutlineBlue} textStyle={TEXT.blue1} action={() => setBackgroundsOpen(true)}/>
              }
            <Text style={{ marginTop:20, fontFamily:FONTS.bold }}>Vuoi Asseganre l'attività a uno o più pazienti?</Text>
            <ButtonComponent
              text={selectedPatients.length > 0 ? "Gestisci Assegnazioni" : "Clicca per assegnare l'attività a un paziente"}
              action={() => handlerAssign()}
              buttonStyle={selectedPatients.length > 0 ? BUTTON.buttonFullBlue : BUTTON.buttonOutlineBlue}
              textStyle={selectedPatients.length > 0 ? [TEXT.light1,{fontFamily:FONTS.bold, marginTop:2}] : [TEXT.blue1,{fontFamily:FONTS.bold, marginTop:2}]}
              icon={{
                name: "people-circle-sharp",
                size: 20,
                color: selectedPatients.length > 0 ? COLORS.light.first : COLORS.main.first,
              }}
            />
          </View>
          {selectedPatients.length > 0 &&
            <View>
              <Text style={{fontFamily:FONTS.bold, marginTop:5, color:COLORS.dark.second}}>Pazienti Selezionati:</Text>
              <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                {selectedPatients.map((patient, i)=>
                <View key={i} style={{backgroundColor:COLORS.main.first, padding:5, borderRadius:100, marginTop:5, marginRight:5}}>
                  <Text style={{fontFamily:FONTS.bold, color:COLORS.light.first}}>{patient.name} {patient.surname}</Text>
                </View>
                )}
              </View>
            </View>
          }
          {!isLoading &&
          <View style={{ marginTop: 60, zIndex:100 }}>
            <ButtonComponent
              text={selectedPatients.length > 0 ? "Salve e Assegna Attviità" : "Salva Attività"}
              icon={{ name: "save", size: 20, color: COLORS.light.first }}
              buttonStyle={BUTTON.buttonFullBlue}
              textStyle={TEXT.light1}
              action={() => handleSaveActivity()}
              disabled={isLoading}
            />
          </View>
          }
          {isLoading && (
            <Loader/>
          )}
      </ScrollView>
      <Animated.View
        style={{
          display: isSelectPatientOpen ? 'block' : 'none',
          width: screenWidth,
          height: screenHeight,
          position: "absolute",
          top: -100,
          left: -20,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0], 
              }),
            },
          ],
        }}
      >
        {isSelectPatientOpen && (
          <View style={{width:"100%", flex:1}}>
            <View style={[SHADOW.normal,{backgroundColor: COLORS.light.first, position:"relative", top:10, padding:20, borderTopRightRadius:20,borderTopLeftRadius:20, height: screenHeight }]}>
            <View style={{position:"absolute", right:20, top:20}}>
              <Icon icon="close" action={handleClose}  size={25}/> 
            </View>
            <Text style={{marginTop:30, alignSelf:"baseline", fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}}>Cerca Paziente</Text>
              <SearchBox onSearch={handlerSearch} placeholder="Nome, Cognome o Token"/>
              <Text style={{fontFamily:FONTS.regular, marginVertical:5, marginLeft:10}}>Pazienti selezionati: <Text style={MAIN_STYLE.textBlueHighlight}>{selectedPatients.length}</Text></Text>
              <ScrollView>
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
              </ScrollView>
              {filteredPatients.length === 0 && <EmptyMessage text="Nessun paziente trovato"/>}
            </View>
          </View>
        )}
      </Animated.View>
      {/* COVERS */}
      <Animated.View
        style={{
          display: isCoversOpen ? 'block' : 'none',
          width: screenWidth,
          height: screenHeight,
          position: "absolute",
          top: -100,
          left: -20,
          transform: [
            {
              translateY: covers.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0], 
              }),
            },
          ],
        }}
      >
        {isCoversOpen &&
          <View style={{width:"100%", flex:1}}>
          <View style={[SHADOW.normal,{backgroundColor: COLORS.light.first, position:"relative", top:10, padding:20, borderTopRightRadius:20,borderTopLeftRadius:20, flex:1, height: screenHeight }]}>
              <View style={{position:"absolute", right:20, top:20}}>
                <Icon icon="close" action={handleCoversClose}  size={25}/> 
              </View>
              <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l, marginTop:30}}>Scegli una cover per la tua attività:</Text>
              {selectedCover && <ButtonComponent text="Scegli Cover" buttonStyle={BUTTON.buttonFullBlue}textStyle={TEXT.light1} action={handleCoversClose}/>}

              <ScrollView automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}style={{marginBottom:200}}>
              <View style={{flexDirection:"row", flexWrap:"wrap", marginTop:20, backgroundColor:COLORS.light.first}}>
              {appCovers.map((game, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => setSelectedCover(game)}
                  activeOpacity={0.7}
                >
                    <ImageBackground 
                    source={game.image} 
                    style={{
                      borderWidth: selectedCover && game.id === selectedCover.id ? 10 : 0,
                      borderColor: COLORS.main.first,
                      height:100, 
                      width:100, 
                      borderRadius: 30 , 
                      margin:5, 
                      overflow: 'hidden'
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
            </ScrollView>
          </View>
        </View> 
        }
        </Animated.View>
      {/* BACKGROUND */}
        <Animated.View
        style={{
          flex:1,
          display: isBackgroundsOpen ? 'block' : 'none',
          width: screenWidth,
          position: "absolute",
          top: -100,
          left: -20,
          transform: [
            {
              translateY: backgrounds.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0], 
              }),
            },
          ],
        }}
      >
        {isBackgroundsOpen &&
          <View style={{width:"100%", flex:1}}>
          <View style={[SHADOW.normal,{backgroundColor: COLORS.light.first, position:"relative", top:10, padding:20, borderTopRightRadius:20,borderTopLeftRadius:20, height: screenHeight }]}>
              <View style={{position:"absolute", right:20, top:20}}>
                <Icon icon="close" action={handleBackgroundsClose}  size={25}/> 
              </View>
              <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l, marginTop:30}}>Scegli una cover per la tua attività:</Text>
              {selectedBackground && <ButtonComponent text="Scegli Cover" buttonStyle={BUTTON.buttonFullBlue}textStyle={TEXT.light1} action={handleBackgroundsClose}/>}
              <ScrollView automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}style={{marginBottom:200}}>
                  <View style={{flexDirection:"row", flexWrap:"wrap", marginTop:20, backgroundColor:COLORS.light.first}}>
                      {appBackground.map((bg, index) => (
                        <TouchableOpacity 
                          key={index} 
                          onPress={() => setSelectedBackground(bg)}
                          activeOpacity={0.7}
                          style={[SHADOW.normal,{width:"100%"}]}
                        >
                            <ImageBackground 
                            source={bg.image} 
                            style={{
                              borderWidth: selectedBackground && bg.id === selectedBackground.id ? 10 : 0,
                              borderColor: COLORS.main.first,
                              height:300, 
                              width:"100%", 
                              borderRadius: 30 , 
                              marginVertical:10, 
                              overflow: 'hidden'
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ))}
              </View>
            </ScrollView>
          </View>
        </View> 
        }
        </Animated.View>
    </View>
    : 
    <View>
      <ScrollView style={{marginTop:10, borderWidth:2, borderRadius:10, borderColor:COLORS.main.first, padding:10}}>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}}>Complimenti! 🎉</Text>
        <View style={{padding:10, backgroundColor:"green", borderRadius:100, marginTop:10}}>
          <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.l, color:COLORS.light.first}}>Attività salvata con successo!</Text>
        </View>
        <View style={{alignItems:"center", marginVertical:30}}>
          <View style={[SHADOW.normal,{paddingVertical:20, width:"90%",borderRadius:10,backgroundColor:COLORS.light.first}]}>
            <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl, textAlign:"center"}}>{activityTitle}</Text>
          </View>
        </View>
        {selectedPatients.length > 0 &&
        <View>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.l}}> Hai asseganto l'attività anche ai pazienti:</Text>
          {selectedPatients.map((patient, i) =>
          <View key={i} style={{ flexDirection:"row",backgroundColor:COLORS.main.second, padding:20, borderRadius:10, marginVertical:5}}>
            <Icon icon="person-circle-sharp" size={20} color={COLORS.light.first}/>
            {patient.name
              ? <Text style={{fontFamily:FONTS.bold, marginTop:5, marginLeft:10 ,color:COLORS.light.first}}>{patient.name} {patient.surname}</Text>
              : <Text>{patient.token}</Text>
            }</View>
          )}
        </View>}
      </ScrollView>
      <ButtonComponent text="Home" icon={{name:"home-sharp", size:20, color:COLORS.light.first}} textStyle={TEXT.light1} buttonStyle={BUTTON.buttonFullBlue} action={handlerGoHome}/>
    </View>
    }
    </View>
  );
};

export default SaveActivity;
