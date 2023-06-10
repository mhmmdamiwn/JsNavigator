import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const BackendFilesContext = createContext();

export const BackendFilesContextProvider = ({ children }) => {
  const [backendFiles, setBackendFiles] = useState([]);

  const handleSetBackendFiles = (v) => {
    setBackendFiles(v);
  };

  return (
    <BackendFilesContext.Provider
      value={{
        backendFiles,
        setBackendFiles: handleSetBackendFiles,
      }}
    >
      {children}
    </BackendFilesContext.Provider>
  );
};

export const useBackendFilesContext = () => {
  const context = useContext(BackendFilesContext);

  return context;
};
