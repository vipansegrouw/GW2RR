import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native'
import { MajorTraitRadio } from './components/RadioButton';
import CachedImage from 'react-native-expo-cached-image';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <View style={styles.traitLinesContainer}>
      <Traitline id= {42}/>  
      <Traitline id= {16}/>
      <Traitline id= {13}/>
      <StatusBar style="auto" />
    </View>
  );
}


const MajorTraits = (majors) => {
  return (
    <View>
      {/* <MajorTraitRadio style = {{gap: 10}} traits={majors[0]} /> */}
    </View>
  );
}




const useApi = ({ endpoint, id }) => {
  const [isLoading, setLoading] = useState(true)
  const [output, setData] = useState([])

  const getApiResponseJson = async (request) => {
    return fetch(request).then(response=>{
        return response.json();
      }
    )
  }

  const getFromApi = async () =>{
    try {
    const url = `https://api.guildwars2.com/v2/${endpoint}/${id}`
    const json = await getApiResponseJson(url)
    setData(json)
    }
    catch (error){
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getFromApi();
  }, [])

  return (output) 
}

const Traitline = ({id}) => {
  const traitLineData = (data) => {
    return{
    id: data['id'],
    name: data['name'],
    bg: data['background'],
    icon: data['icon'],
    minor: data['minor_traits'],
    adept: data['major_traits']?.slice(0,3),
    master: data['major_traits']?.slice(3,6),
    grandmaster: data['major_traits']?.slice(6,9),
    elite: data['elite'],
    }
  }

  const tld = traitLineData(useApi({endpoint: 'specializations', id}))

  const TraitlineRender = (data) => {
    const { id, name, bg, icon, minor, adept, master, grandmaster, elite } = data;
    return (
      <View style={styles.traitLineImageWindow}>
        <CachedImage
            isBackground
            source={{uri: bg}}
            style={styles.traitLineImage}>
          <MajorTraits majors = {[adept, master, grandmaster]}/>
        </CachedImage>
      </View>
    )
  }

  return(TraitlineRender(tld))
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  traitLinesContainer: {
    flex: 1,
    backgroundColor: 'grey',
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

