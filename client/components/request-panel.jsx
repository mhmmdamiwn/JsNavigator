import React from "react";
import { useBackendFilesContext } from "../context/backend-files-context";

function RequestPanel() {
  const { setBackendFiles } = useBackendFilesContext();

  return (
    <div className="fixed top-0 right-0">
      <button
        onClick={() => {
          setBackendFiles(["1", "8", "2", "6"]);
        }}
      >
        open
      </button>
    </div>
  );
}

export default RequestPanel;
