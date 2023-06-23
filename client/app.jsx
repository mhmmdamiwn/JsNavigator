import { useEffect, useState } from "preact/hooks";
import RequestPanel from "./components/request-panel";
import Visualize from "./components/visualize";
import { ExecutedFilesContextProvider } from "./context/executed-files-context";
import ProjectInformation from "./components/project-information";
import Loading from "./components/loading";
import { Suspense } from "preact/compat";

function App() {
  const [information, setInformation] = useState({
    entry: "",
    importMethod: "",
    port: "",
  });

  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!Object.values(information).every((i) => i)) return;

    const handle = async () => {
      setLoading(true);
      try {
        const queryString = new URLSearchParams(information).toString();
        const url = `http://localhost:8585/jsnavigator?${queryString}`;

        const response = await fetch(url);
        const jsonData = await response.json();

        setFiles(jsonData);

        setLoading(false);
      } catch (err) {
        console.error(err);
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
    <ExecutedFilesContextProvider>
      <Visualize files={files} />
      <Suspense fallback={<p>loading</p>}>
        <RequestPanel port={information?.port} />
      </Suspense>
    </ExecutedFilesContextProvider>
  );
}

export default App;
