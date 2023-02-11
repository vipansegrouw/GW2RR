import { createContext, useContext, useCallback, useState } from "react";

export const ApiBuildContextState = createContext({});

export const useApiBuildContext = () => useContext(ApiBuildContextState);

export const ApiBuildContextProvider = ({ children }) => {
  const [traitLineData, setTraitLineData] = useState([{}]);
  const updateTraitLineData = useCallback(( traitLineIndex, id ) => {
    const apiResponse = useApi({endpoint: 'specializations', id})
    const newTraitLineData = {
      specialization_id: id,
      name: apiResponse.name,
      minor: apiResponse.minor_traits,
      major: {
        adept: apiResponse.major_traits.slice(0,3),
        master: apiResponse.major_traits.slice(3,6),
        grandmaster: apiResponse.major_traits.slice(6,9),
      }
    }
    const newApiData = [...traitLineData]
    newApiData[traitLineIndex] = newTraitLineData
    setTraitLineData(newApiData);
  }, [setTraitLineData, traitLineData])
  return (
    <ApiBuildContextState.Provider
      value={{
        traitLineData,
        updateTraitLineData,
      }}
    >
      {children}
    </ApiBuildContextState.Provider>
  );
}