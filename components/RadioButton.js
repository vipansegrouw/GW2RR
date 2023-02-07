import React from 'react';
import CachedImage from 'react-native-expo-cached-image';
import { View, Pressable } from 'react-native';
import { useApi } from '../hooks/useApi';

export const MajorTraitRadio = ({ traits, onSelect }) => {
  return (
    <View style={{left: 208, marginLeft: 48}}>
      {traits?.map((item, i) => {
        return (
          <Pressable onPress={() => alert("Your choice: " + item.value)}>
            <MajorTraitIcon key={i} id = {item}/>
          </Pressable>
        )
      })}
    </View>
  );
}

const MajorTraitIcon = ({id, isSelected=false}) => {
  const json = useApi({endpoint: 'traits', id})
  return (
  <CachedImage isBackground source = {{uri: json['icon']}} style={{top: 142, width: 36, height: 36}}>
    <View style = {{width: `${15/16*100}%`, height: `${15/16*100}%`, top: `${1/32*100}%`, left: `${1/32*100}%`,  backgroundColor: `rgba(0,0,0, ${isSelected ? (0.0) : (0.5)})`}}/>
  </CachedImage>
  )

}
