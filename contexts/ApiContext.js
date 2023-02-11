import { createContext, useContext, useCallback, useState } from "react";
import { useApi } from "../hooks/useApi";

export const ApiBuildContextState = createContext({});

export const useApiBuildContext = () => useContext(ApiBuildContextState);

export const ApiBuildContextProvider = ({ children, initialIds }) => {

  const getTraitLineData = ( id ) => { 
    const apiResponse = useApi({endpoint: 'specializations', id})
    return {
      specialization_id: id,
      name: apiResponse.name,
      bg: apiResponse.background,
      minor: apiResponse.minor_traits,
      major: {
        adept: apiResponse.major_traits?.slice(0,3),
        master: apiResponse.major_traits?.slice(3,6),
        grandmaster: apiResponse.major_traits?.slice(6,9),
      }
    }
    
  } 
  const traitLinesData = initialIds?.map((id) => getTraitLineData(id))
  // const [ traitLinesData, setTraitLinesData ] = useState(initialTraitLinesData);

  const updateTraitLinesData = useCallback(( traitLineIndex, id ) => {

    const newTraitLineData = getTraitLineData(id)
    const newApiData = [...traitLinesData]
    newApiData[traitLineIndex] = newTraitLineData
    // setTraitLinesData(newApiData);
  }, [])
  return (
    <ApiBuildContextState.Provider
      value={{
        traitLinesData,
        updateTraitLinesData,
      }}
    >
      { children }
    </ApiBuildContextState.Provider>
  );
}