import { useEffect, useState } from "preact/hooks";
import RequestPanel from "./components/request-panel";
import Visualize from "./components/visualize";
import { BackendFilesContextProvider } from "./context/backend-files-context";
import ProjectInformation from "./components/project-information";
import Loading from "./components/loading";

function App() {
  const [information, setInformation] = useState({
    entry: "",
    importMethod: "",
  });
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  // this is where we get files and set it using setFiles
  useEffect(() => {
    if (!Object.values(information).every((i) => i)) return;

    const handle = async () => {
      setLoading(true);

      try {
        // here, instead of creating a fake promise we can get files
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              1: ["1", "2", "3"],
              2: ["1", "3"],
              6: ["1", "3"],
              5: ["1", "3"],
              8: ["1", "3"],
              9: ["1", "3"],
              7: ["1", "3"],
              5: ["1"],
              4: ["6"],
            });
          }, 2000);
        });

        setFiles(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    handle();
  }, [information]);

  const handleInformationChanges = (info) => {
    setInformation(info);
  };

  if (loading) return <Loading />;

  if (!files)
    return <ProjectInformation handleChanges={handleInformationChanges} />;

  return (
    <BackendFilesContextProvider>
      <Visualize files={files} />
      <RequestPanel />
    </BackendFilesContextProvider>
  );
}

export default App;
