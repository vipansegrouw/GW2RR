import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native'
import { Traitline } from './components/TraitlineComponent';
import { ApiBuildContextProvider, useApiBuildContext } from './contexts/ApiContext';
import { BuildContextProvider } from './contexts/BuildContext';


export default function App() {

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
      "specialization_id": 42,
      "name": "",
      "minor": [],
      "major": {
        "adept": [],
        "master": [],
        "grandmaster": [],
      }
    },
    {
      "specialization_id": 16,
      "name": "",
      "minor": [],
      "major": {
        "adept": [],
        "master": [],
        "grandmaster": [],
      }
    },
    {
      "specialization_id": 13,
      "name": "",
      "minor": [],
      "major": {
        "adept": [],
        "master": [],
        "grandmaster": [],
      }
    },
    
  ]
  
  const { traitlines, updateTraitlines } = useApiBuildContext();
  return (
    <ApiBuildContextProvider initialIds = {[42, 16, 13,]}>
      <BuildContextProvider>
        <View style={styles.traitLinesContainer}>      
        {traitlines?.map((traitLineContext, i) => {
          return (
            <Traitline key={i} id={traitLineContext.specialisation_id} traitLineIndex={i}/>
          )
        })}
          <StatusBar style="auto" />
        </View>
      </BuildContextProvider>
    </ApiBuildContextProvider>
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

