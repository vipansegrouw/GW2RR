import { createContext, useContext, useCallback } from "react";

export const BuildContextState = createContext({});

export const useBuildContext = () => useContext(BuildContextState);

export const BuildContextProvider = ({ children }) => {
  const [traitSelections, setTraitSelection] = useState({});
  const updateTraitSelections = useCallback(( traitlineIndex, columnIndex, traitIndex ) => {
    const newSelections = [...traitSelections];
    newSelections[traitlineIndex][columnIndex] = traitIndex
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