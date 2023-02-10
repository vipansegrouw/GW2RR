export const ApiContextState = createContext({});

export const useBuildContext = () => useContext(ApiContextState);

export const ApiContextProvider = ({ children, config }) => {
  const [apiBuildContext, setApiBuildContext] = useState({});
  // TODO
  const updateApi = useCallback((ApiContentId, traitId) => {
    const updatedApi = (generate updated stuff)
    setApiBuildContext(updatedTraits);
  }
  return { traits, updateTrait };
}