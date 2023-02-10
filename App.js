import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native'
import { Traitline } from './components/TraitlineComponent';
import { BuildContextProvider } from './contexts/BuildContext';

export default function App() {
  const buildUIContext = [
    /* 
      Format:

      traitLineIndex: 
        {TraitColumn: TraitChoiceIndex}
    */
    [1, 0, 1,],
    [0, 1, 2,],
    [0, 1, 1,], 
  ]
  
  
  

  const buildApiContext = [
      /* 
    Format:
    [
      {
        "specialisation_id": 1337,
        "minor": [adeptId, masterId, grandmasterId],
        "major": {
          "adept": [topId, midId, botId],
          "master": [topId, midId, botId],
          "grandmaster": [topId, midId, botId],
        }
      }
    ]
  */
    {
      "specialisation_id": 42,
      "name": "",
      "minor": [],
      "major": {
        "adept": [],
        "master": [],
        "grandmaster": [],
      }
    },
    {
      "specialisation_id": 16,
      "name": "",
      "minor": [],
      "major": {
        "adept": [],
        "master": [],
        "grandmaster": [],
      }
    },
    {
      "specialisation_id": 13,
      "name": "",
      "minor": [],
      "major": {
        "adept": [],
        "master": [],
        "grandmaster": [],
      }
    },
    
  ]

  return (
    <BuildContextProvider>
      <View style={styles.traitLinesContainer}>      
      {buildApiContext?.map((traitLineContext, i) => {
        return (
          <Traitline key={i} id={traitLineContext.specialisation_id} traitLineIndex={i}/>
        )
      })}
        <StatusBar style="auto" />
      </View>
    </BuildContextProvider>
  );
}

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  traitLinesContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: '100%',
  },
  traitLineImageWindow: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    width: 647,
    height: 120,
    marginTop: 1,
    color: 'white',
  },
  traitLineImage: {
    width: 1024,
    height: 256,
    left: 81.5,
    top: -136,
  },
  traitLineContent: {
    // color: 'red',
    // top: 175,
    // left: 200,
  },
  majorTraitContainer: {
    color:'#000',
  },

  // TODO: make everything work flexy-style
  // traitLineImageWindow: {
  //   flex: 1,
  //   // alignItems: 'flex-start',
  //   justifyContent: 'center',
  //   // overflow: 'hidden',
  //   // width: '100%',
  //   maxWidth: '100%',
  //   maxHeight: '33.333333%',
  //   marginTop: 1,
  //   color: 'white',
  //   aspectRatio: 5.3916666,
  // },
  // traitLineImage: {
  //   flex: 1,
  //   width: '126%',
  //   maxWidth: '126%',
  //   maxHeight: '50%',
  //   aspectRatio: 4,
  //   // top: '10%',
  // },
  // traitLineContent: {
  //   // color: 'red',
  //   // top: 175,
  //   // left: 200,
  // },
  // traitLineIcon: {
  //   aspectRatio: 1,
  //   maxHeight: '100%',
  //   maxWidth: '100%',
  // },
  // majorTraitContainer: {
  //   color:'#000',
  // },
});

