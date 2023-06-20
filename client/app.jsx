import { useEffect, useState } from "preact/hooks";
import RequestPanel from "./components/request-panel";
import Visualize from "./components/visualize";
import { BackendFilesContextProvider } from "./context/backend-files-context";
import ProjectInformation from "./components/project-information";
import Loading from "./components/loading";
import { Suspense } from "preact/compat";

function App() {
  const [information, setInformation] = useState({
    entry: "",
    importMethod: "",
  });
  const [files, setFiles] = useState({
    1: ["2", "3"],
    2: ["4", "3"],
    3: [],
    4: ["1"],
  });
  const [loading, setLoading] = useState(false);

  // this is where we get files and set it using setFiles
  useEffect(() => {
    if (!Object.values(information).every((i) => i)) return;

    const handle = async () => {
      setLoading(true);
      try {
        const queryString = new URLSearchParams(information).toString();
        const url = `http://localhost:8585/jsnavigator?${queryString}`;
        console.log(url);

        const response = await fetch(url);
        const jsonData = await response.json();
        // const jsonData = await response.json();

        setFiles(jsonData);

        setLoading(false);
      } catch (err) {
        console.log("assssss", err);
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
      <Suspense fallback={<p>loading</p>}>
        <RequestPanel />
      </Suspense>
    </BackendFilesContextProvider>
  );
}

export default App;
