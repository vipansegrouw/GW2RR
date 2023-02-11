import React from 'react';
import CachedImage from 'react-native-expo-cached-image';
import { View, Pressable } from 'react-native';
import { useApi } from '../hooks/useApi';
import { useBuildContext } from '../contexts/BuildContext';
import { styles } from '../App';


const MajorTraitIcon = ({ key, id, isSelected=false }) => {
  const json = useApi({endpoint: 'traits', id})
  const radioButtonStyle = {width: `${15/16*100}%`, height: `${15/16*100}%`, top: `${1/32*100}%`, left: `${1/32*100}%`}
  return (
  <CachedImage isBackground source = {{uri: json['icon']}} style={{top: 142, width: 36, height: 36}}>
    <View key={key} style = {{...radioButtonStyle,  backgroundColor: `rgba(0,0,0, ${isSelected ? (0.0) : (0.5)})`}}/>
  </CachedImage>
  )

}

export const Traitline = ({ traitLineIndex, tld }) => {
  const { traitSelections, updateTraitSelections } = useBuildContext();
  
  
  const TraitlineRender = (data) => {
    const { bg, major } = data;
    const majors = [major?.adept, major?.master, major?.grandmaster]
    return (
        <View style={styles.traitLineImageWindow}>
          <CachedImage
              isBackground
              source={{uri: bg}}
              style={styles.traitLineImage}>
            <View style={{flexDirection: 'row'}}>
              {majors?.map((traits, columnIndex) => {
                return (
                  <View key={columnIndex} style={{left: 208, marginLeft: 48}}>
                    {traits?.map((traitId, traitIndex) => {     
                      return (
                        <Pressable key={traitIndex} onPressIn={() => updateTraitSelections(traitLineIndex, columnIndex, traitIndex)}>
                          <MajorTraitIcon id = {traitId} isSelected={traitSelections[traitLineIndex]?.[columnIndex] === traitIndex}/>
                        </Pressable>
                      )
                    })}
                  </View>
                )
                })
              }
            </View>
          </CachedImage>
        </View>
    )
  }
  return(TraitlineRender(tld))
}
