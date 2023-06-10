import RequestPanel from "./components/request-panel";
import Visualize from "./components/visualize";
import { BackendFilesContextProvider } from "./context/backend-files-context";

function App() {
  return (
    <BackendFilesContextProvider>
      <Visualize />
      <RequestPanel />
    </BackendFilesContextProvider>
  );
}

export default App;
