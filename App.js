import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Traitlines } from './resources/guardian/traitlines';
import { MajorTraitRadio } from './components/RadioButton';
import CachedImage from 'react-native-expo-cached-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-web';

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
    <View style={{flex: 1, top: 130}}>
      {/* <MajorTraitRadio style = {{gap: 10}} traits={majors[0]} /> */}
      <Text style={styles.text}>{majors}</Text>
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

  return (isLoading? (<ActivityIndicator/>) : (output)) 
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
            isbackground
            source={{uri: bg}}
            style={styles.traitLineImage}
          />
        <MajorTraits majors = {[adept, master, grandmaster]}/>
      </View>
    )
  }

  return(TraitlineRender(tld))
}

const styles = StyleSheet.create({
  traitLinesContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  text: {
    flex: 1,
    fontSize: 15,
    color: 'red',
  },
  traitLineImageWindow: {
    width: 647, 
    height: 136, 
    overflow: 'hidden',
    maxWidth: '100%',
    marginTop: 1
  },
  traitLineImage: {
    width: 1024,
    height: 256,
    left: 0,
    top: -120,
  },
  traitLineContent: {
    flex: 1,
    color: 'red',
    top: 175,
    left: 200,
  },
  majorTraitContainer: {
    flex: 1,
    color:'#000',
  },
});

