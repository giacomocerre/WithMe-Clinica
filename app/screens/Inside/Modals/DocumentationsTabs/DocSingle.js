import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, MAIN_STYLE, SHADOW, TYPOGRAPHY, UI } from '../../../../../stylesheets/theme'
import { Icon } from '../../../../components/atoms'
import ActionBox from '../../../../components/molecules/ActionBox'
import { GoBackTop } from '../../../../components/molecules'
import DocExplain from './DocLayout/DocExplain'
import DocPhoto from './DocLayout/DocPhoto'
import DocVideo from './DocLayout/DocVideo'

const DocSingle = ({navigation, doc}) => {

  const [isDocOpen, setIsDocOpen] = useState(false)
  const [currentDoc, setCurrentDoc] = useState(null)

  const handleOpenDocuments = (doc) => {
    setIsDocOpen(true)
    setCurrentDoc(doc)
    console.log(doc.docList)
  } 

  const handleCloseDocuments = () => {
    setCurrentDoc(null)
    setIsDocOpen(false)
  }

  return (
    <View style={{flex:1}}>
      {isDocOpen && <View style={{position:"absolute", top:-150, width:"100%"}}><GoBackTop action={handleCloseDocuments} text="Torna alla Documentazione"/></View> }
      <ScrollView>
        <View style={UI.distances}>
          <View style={{padding:isDocOpen ? 10 :20, marginVertical:10, margin:"auto", alignSelf:"baseline", borderRadius:100, backgroundColor:COLORS.main.first}}>
            <Icon iconSet={doc.icon.iconSet} icon={doc.icon.icon} size={isDocOpen ? 20: 40} color={COLORS.light.first}/>
          </View>
          <View>
            {!isDocOpen && <Text style={{fontFamily:FONTS.bold, fontSize:isDocOpen ? TYPOGRAPHY.title.s : TYPOGRAPHY.title.xl, textAlign:"center"}}>{doc.title}</Text>}
            {!isDocOpen && <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.paragraph, marginTop:10, marginBottom:30, textAlign:"center"}}>{doc.description}</Text>}
          </View>
          <View>
            {!isDocOpen &&
            doc.docs.map(doc => 
              <ActionBox key={doc.name} action={() => handleOpenDocuments(doc)} text={doc.name} tag={doc.tag} icon={{iconSet:doc.icon.iconSet, icon:doc.icon.icon}}/>
            )}
            {isDocOpen &&
            <View style={{borderTopWidth:1, marginTop:10}}>
              <View style={{flexDirection:"row", marginTop:10}}>
                <TouchableOpacity style={{paddingHorizontal:10, paddingVertical:5}} onPress={handleCloseDocuments}>
                  <Text style={{ fontFamily:FONTS.medium, textDecorationLine:"underline", fontSize:TYPOGRAPHY.text.s}}>{doc.title}</Text>
                </TouchableOpacity>
                <View style={{position:"relative", right:5, top:5}}>
                  <Icon iconSet="MaterialIcons" icon="chevron-left" size={15}/>
                </View>
                <View style={{paddingHorizontal:10, paddingVertical:5, backgroundColor:COLORS.main.first, borderRadius:100}}>
                  <Text style={{ fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.s, color:COLORS.light.first}}>{currentDoc.name}</Text>
                </View>
              </View>
              <View style={{padding:10, marginTop:20}}>
                {currentDoc.type === "explain" 
                  && <DocExplain docs={currentDoc.docList}/>
                }
                 {currentDoc.type === "photo" 
                  && <DocPhoto docs={currentDoc.docList}/>
                }
                 {currentDoc.type === "video" 
                  && <DocVideo docs={currentDoc.docList}/>
                }
              </View>
            </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DocSingle