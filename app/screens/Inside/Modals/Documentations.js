import { View, Text } from 'react-native';
import React from 'react';
import { GoBackTop } from '../../../components/molecules';
import { DocAll, DocSingle } from './DocumentationsTabs';
import { DocumentationsTabs } from '../../../../utils/config';

const Documentations = ({ navigation, route }) => {
  const { doc = 'all' } = route.params || {};
  const ComponentToRender = doc === "all" ? DocAll : DocSingle;

  const getDocObj = () => {
    return DocumentationsTabs.find(document => document.doc === doc);
  }

  const docObj = getDocObj();

  return (
    <View style={{flex:1, marginBottom:50}}>
      <GoBackTop 
        text={doc === "all" ? "Home" : "Documentazione"} 
        action={() => doc === "all" ? navigation.navigate("Home") : navigation.navigate("Documentations", {doc:"all"})} 
      />
      {ComponentToRender 
        ? <ComponentToRender navigation={navigation} doc={docObj} /> 
        : <Text>No component available for this activity type.</Text>
      }
    </View>
  );
};

export default Documentations;
