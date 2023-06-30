import React from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '../App';

export const DropdownBox = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Radiance'},
      {key:'2', value:'Valor'},
  ]

  return(
    <View style={styles.dropdownComponent}>
      <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
      />
    </View>
  )

};