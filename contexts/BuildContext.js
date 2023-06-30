import { createContext, useContext, useCallback, useState } from "react";

export const BuildContextState = createContext({});

export const useBuildContext = () => useContext(BuildContextState);

export const BuildContextProvider = ({ children }) => {
  const [traitSelections, setTraitSelections] = useState([[], [], [], []]);

  const updateTraitSelections = useCallback((traitLineIndex, columnIndex, traitIndex) => {
    setTraitSelections((prevSelections) => {
      const newSelections = [...prevSelections];
      newSelections[traitLineIndex][columnIndex] = traitIndex;
      return newSelections;
    });
  }, []);

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
};
