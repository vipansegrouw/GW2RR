import { StyleSheet, View } from 'react-native';
import { Traitline } from './components/TraitlineComponent';
import {
  ApiBuildContextProvider,
  useApiBuildContext,
} from './contexts/ApiContext';
import { BuildContextProvider } from './contexts/BuildContext';

export default function App() {
  return (
    <ApiBuildContextProvider initialIds={[42, 16, 13]}>
      <BuildContextProvider>
        <View style={styles.mainContainer}>
          <Traitlines />
        </View>
      </BuildContextProvider>
    </ApiBuildContextProvider>
  );
}

const Traitlines = () => {
  const { traitLinesData } = useApiBuildContext();

  return (
    <View style={styles.traitLinesContainer}>
      {traitLinesData?.map((traitLineContext, i) => {
        return (
          <Traitline
            key={i}
            id={traitLineContext.specialisation_id}
            traitLineIndex={i}
            tld={traitLineContext}
          />
        );
      })}
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  traitLinesContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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
  majorTraitContainer: {
    color: '#000',
  },
});
