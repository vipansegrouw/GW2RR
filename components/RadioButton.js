import React from 'react';
import { View, Text } from 'react-native';

export const MajorTraitRadio = ({ traits, onSelect }) => {
  return (
    <View>
      {traits.map((item) => {
        return <Text style={{padding: 10}}> {item} </Text>;
      })}
    </View>
  );
}