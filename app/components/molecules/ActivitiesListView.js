import { View, Text, Animated, Dimensions, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import SearchBox from './SearchBox';
import EmptyMessage from '../atoms/EmptyMessage';
import { COLORS, FONTS } from '../../../stylesheets/theme';
import Game from './Game';
import ActivityInfo from './ActivityInfo';
import ActivityAssign from './ActivityAssign';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const ActivitiesListView = ({activitiesList, onStartGame, onOpenDoc}) => {
    const [activities, setActivities] = useState([])
    const [filteredActivities, setFilteredActivitities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [openType, setOpenType] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Introduce loading state
    const translateYValue = useRef(new Animated.Value(screenHeight)).current;

    useFocusEffect(
        React.useCallback(() => {
          const initListActivities = async () => {
            try {
              setActivities(activitiesList);
              setFilteredActivitities(activitiesList);
            } catch (error) {
              console.error("Error fetching activities:", error);
            } finally {
              setIsLoading(false);
            }
          };
          initListActivities();
        }, [])
      );

      const handleActivityClick = (activity, type) => {
        setSelectedActivity(activity);
        setOpenType(type)
        Animated.parallel([
          Animated.timing(translateYValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      };

      const handleStartGame = (game) => {
        onStartGame(game);
      }

      const handleOpenDoc = (doc) => {
        onOpenDoc(doc)
      }
    
      const closeActivityInfo = () => {
        Animated.parallel([
          Animated.timing(translateYValue, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: true,
          }),      
        ]).start(() => setSelectedActivity(null));
      };

      const handlerSearch = (text) => {
        const filtered = activities.filter(
          (activity) =>
            activity.title.toLowerCase().includes(text.toLowerCase())
        );
    
        setFilteredActivitities(filtered);
      }

      const groupedActivities = filteredActivities.reduce((acc, activity) => {
        if (acc[activity.type]) {
          acc[activity.type].push(activity);
        } else {
          acc[activity.type] = [activity];
        }
        return acc;
      }, {});

      const renderActivityInfo  = () => {
        if(openType === "info") {
          return (<ActivityInfo activity={selectedActivity} onClose={closeActivityInfo}  onStartGame={() => handleStartGame(selectedActivity)} onOpenDoc={(doc) => handleOpenDoc(doc)} translateYValue={translateYValue}/>);
        }
        if(openType === "assign"){
          return (<ActivityAssign activity={selectedActivity} onClose={closeActivityInfo} translateYValue={translateYValue}/>);
        }
        return null;
      }
  return (
    <View style={{flex:1, height:500}}>
    <SearchBox onSearch={handlerSearch} placeholder="Cerca attività"/>
    {!isLoading ?
    <View style={{alignItems:"flex-start"}}>
        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
            {Object.keys(groupedActivities).map(type => (
            <View key={type}>
                <View style={{flexDirection:"row"}}>
                <View style={{backgroundColor:COLORS.main.first, alignSelf:"baseline", marginBottom:10,paddingVertical:5, borderRadius:100, marginLeft:5, paddingHorizontal:10}}>
                    <Text style={{fontFamily:FONTS.black, color:COLORS.light.first}}>Attività {type}</Text>
                </View>
                <Text style={{fontFamily:FONTS.bold, marginLeft:10, marginTop:5}}>{groupedActivities[type].length}</Text>
                </View>
                <ScrollView   
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:"row"}}>
                    {groupedActivities[type].map(activity => (
                    <Game 
                        key={activity.id}
                        activity={activity}
                        onSelection={(activity) => handleActivityClick(activity, "info")}
                        onAssign={(activity) => handleActivityClick(activity, "assign")}
                        onStartGame={(activity) => handleStartGame(activity)}
                        onOpenDoc={(doc) => handleOpenDoc(doc)}
                        />
                    ))}
                </View>
                </ScrollView>
            </View>
            ))}
            { filteredActivities.length === 0 && <EmptyMessage text="Nessuna Attività trovata"/>}
        </View>
    </View>
    : null }
        {selectedActivity && renderActivityInfo() }
    </View>
  )
}

export default ActivitiesListView