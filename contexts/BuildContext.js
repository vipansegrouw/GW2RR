import { createContext, useContext, useCallback, useState } from "react";

export const BuildContextState = createContext({});

export const useBuildContext = () => useContext(BuildContextState);

export const BuildContextProvider = ({ children }) => {
  const [traitSelections, setTraitSelection] = useState([[],[],[],]);
  const updateTraitSelections = useCallback(( traitLineIndex, columnIndex, traitIndex ) => {
    const newSelections = [...traitSelections];
    newSelections[traitLineIndex][columnIndex] = traitIndex
    setTraitSelection(newSelections);
  }, [setTraitSelection, traitSelections])
  return (
    <BuildContextState.Provider
      value={{
        traitSelections,
        updateTraitSelections,
      }}
    >
      {children}
    </BuildContextState.Provider>
  );
}