import React from 'react';
import { View, Text } from 'react-native';
import { useApi } from '../App';

export const MajorTraitRadio = ({ traits, onSelect }) => {
  return (
    <View style = {{top: 100, left: 100}}>
      {traits?.map((item) => {
        <MajorTraitIcon id={item}/>;
      })}
    </View>
  );
}

const MajorTraitIcon = ({id}) => {
  const json = useApi({endpoint: 'traits', id})
  imgUri = json['icon']
  return (<CachedImage source = {{uri: {imgUri}}} style={{width: 48, height: 48}}/>)
}