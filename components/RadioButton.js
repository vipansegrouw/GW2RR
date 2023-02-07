import React from 'react';
import { View, Text } from 'react-native';
import { useApi } from './useApi';
import CachedImage from 'react-native-expo-cached-image';

export const MajorTraitRadio = ({ styleProps, traits, onSelect }) => {
  return (
    traits?.map((item) => {
      return (<MajorTraitIcon styleProps= {styleProps} id = {item}/>)
    })
  );
}

const MajorTraitIcon = ({ styleProps, id }) => {
  const json = useApi({endpoint: 'traits', id})
  return (<CachedImage source = {{uri: json['icon']}} style={{styleProps, top: 142, width: 36, height: 36}}/>)
}