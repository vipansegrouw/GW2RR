import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Traitlines } from './resources/guardian/traitlines';
import { MajorTraitRadio } from './components/RadioButton';
import CachedImage from 'react-native-expo-cached-image';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <View style={styles.traitLinesContainer}>
      <Traitline id= {42}/>  
      {/* <Traitline id= {16}/>
      <Traitline id= {13}/> */}
      <StatusBar style="auto" />
    </View>
  );
}


const MajorTraits = (majors) => {
  return (
    <View>
      {/* <MajorTraitRadio style = {{gap: 10}} traits={majors[0]} /> */}
      <Text style={{color: 'red'}}>{JSON.stringify(majors)}</Text>
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
          <CachedImage
            source={{uri: icon}}
            style={styles.traitLineIcon}
            />
          <MajorTraits majors = {[adept, master, grandmaster]}/>
        </CachedImage>
      </View>
    )
  }

  return(TraitlineRender(tld))
}

const styles = StyleSheet.create({
  traitLinesContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  text: {
    fontSize: 15,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitLineImageWindow: {
    width: 647, 
    height: 136, 
    overflow: 'hidden',
    // maxWidth: '100%',
    aspectRatio: 647/136,
    marginTop: 1,
  },
  traitLineImage: {
    left: 0,
    top: -120,
    width: '100%',
    height: '100%'
  },
  traitLineContent: {
    // color: 'red',
    // top: 175,
    // left: 200,
  },
  traitLineIcon: {
    maxHeight: 64,
    aspectRatio: 1
  },
  majorTraitContainer: {
    color:'#000',
  },
});

