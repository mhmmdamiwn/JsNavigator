import { h, Fragment } from "preact";

import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const ExecutedFilesContext = createContext();

export const ExecutedFilesContextProvider = ({ children }) => {
  const [executedFiles, setExecutedFiles] = useState([]);

  const handleSetExecutedFiles = (v) => {
    setExecutedFiles(v);
  };

  return (
    <ExecutedFilesContext.Provider
      value={{
        executedFiles,
        setExecutedFiles: handleSetExecutedFiles,
      }}
    >
      {children}
    </ExecutedFilesContext.Provider>
  );
};

export const useExecutedFilesContext = () => {
  const context = useContext(ExecutedFilesContext);

  return context;
};
