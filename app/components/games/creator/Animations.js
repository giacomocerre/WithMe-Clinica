import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../../stylesheets/theme';
import LottieView from 'lottie-react-native';
import { CLOUD } from '../../../../services/cloud/dataService';
import { useFocusEffect } from '@react-navigation/native';
import { EmptyMessage, SearchBox } from '../../molecules';
import { Icon } from '../../atoms';
import Loader from '../../atoms/Loader';

const Animations = ({ isSelectable, maxSelection, onSelectedAnimations }) => {
  const animationsRef = useRef([]);
  const [animations, setAnimations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimations, setSelectedAnimations] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      const initAnimation = async () => {
        try{
          const loadedAnimations = await CLOUD.fetchCollection("animations");
          setAnimations(loadedAnimations);
        }catch(e){
          console.log("Error fetch games");
        }finally{
          setIsLoading(false);
        }
      };

      initAnimation();
    }, [])
  );

  useEffect(() => {
    onSelectedAnimations(selectedAnimations);
  }, [selectedAnimations, onSelectedAnimations]);

  const toggleAnimation = (animation, index) => {
    if (!isSelectable) return;
    const selectedIndex = selectedAnimations.findIndex((selected) => selected.index === index);
    if (selectedIndex !== -1) {
      setSelectedAnimations(prevSelectedAnimations => {
        const updatedSelectedAnimations = [...prevSelectedAnimations];
        updatedSelectedAnimations.splice(selectedIndex, 1);
        return updatedSelectedAnimations;
      });
    } else {
      if (selectedAnimations.length < maxSelection) {
        setSelectedAnimations(prevSelectedAnimations => {
          const updatedSelectedAnimations = [...prevSelectedAnimations, { animation, index }];
          return updatedSelectedAnimations;
        });
      }
    }
  };

  const handleSearch = (search) => {
    setSearchQuery(search);
  };

  const filteredAnimations = animations.filter((anim) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      anim.title.toLowerCase().includes(searchLower) ||
      anim.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderColor: COLORS.light.second }}>
        <SearchBox onSearch={handleSearch} placeholder="Cerca Animazione" />
      </View>
      <View style={{ marginBottom:10, borderColor:COLORS.main.first, backgroundColor:selectedAnimations.length === maxSelection ? COLORS.main.first: COLORS.light.first ,borderWidth:1, alignSelf:"baseline", flexDirection:"row", paddingVertical:10, paddingHorizontal:20, borderRadius:100}}>
            <Icon iconSet="MaterialIcons" icon="animation" size={15} color={selectedAnimations.length === maxSelection ? COLORS.light.first : COLORS.main.first}/>
            <Text style={{fontFamily:FONTS.bold, position:"relative", left:5, top:2, fontSize:TYPOGRAPHY.text.m, color:selectedAnimations.length === maxSelection ? COLORS.light.first : COLORS.main.first}}>{selectedAnimations.length}/3</Text>
          </View>
      <ScrollView
        style={{ paddingTop: 10 }}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {isLoading
          ? <Loader/>
          : <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, flexWrap: 'wrap', maxWidth: '100%' }}>
              {filteredAnimations.map((anim, index) => (
                <View key={index} style={{ marginBottom: 30, position: 'relative' }}>
                  {selectedAnimations.map((selected, selectedIndex) => (
                    selected.index === index && isSelectable && (
                      <View
                        key={selected.index}
                        style={{
                          borderColor: COLORS.main.first,
                          borderWidth: 1,
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor: selectedIndex + 1 === 0 ? "rgba(255,255,255,0.9)" : COLORS.main.first,
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 1,
                        }}>
                        <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.text.l, color: selectedIndex + 1 === 0 ? COLORS.main.first : COLORS.light.first, position: "relative", top: 1 }}>{selectedIndex + 1}</Text>
                      </View>
                    )
                  ))}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleAnimation(anim, index)}
                    style={{ position: 'relative', zIndex: 0 }}>
                    <View style={[SHADOW.normal, { justifyContent: 'center', borderRadius: 10, alignItems: 'center', backgroundColor: selectedAnimations.some((selected) => selected.index === index) ? COLORS.main.first : COLORS.light.first, width: 170, height: 170 }]}>
                      <LottieView
                        autoPlay
                        ref={(ref) => (animationsRef.current[index] = ref)}
                        style={{
                          width: '90%',
                          height: '90%',
                          backgroundColor: COLORS.light.second,
                        }}
                        source={JSON.parse(anim.animation)}
                        onAnimationFinish={() => setIsPlaying(false)}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{ backgroundColor: COLORS.main.first, padding: 10, marginTop: 10, borderRadius: 100 }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.text.m, color: COLORS.light.first }}>{anim.title}</Text>
                  </View>
                </View>
              ))}
              {filteredAnimations.length === 0 && <EmptyMessage text="Nessuna Animazione Trovata" />}
            </View>
          }
      </ScrollView>
    </View>
  );
};

export default Animations;
