import { h, Fragment } from "preact";

import { useState } from "preact/hooks";
import Button from "./ui/button";
import Input from "./ui/input";
import Select from "./ui/select";
import { Icons } from "./icons";

function ProjectInformation({ handleChanges }) {
  const NumberPattern = new RegExp("^[0-9]+$");

  const [entry, setEntry] = useState("");
  const [importMethod, setImportMethod] = useState("");
  const [port, setPort] = useState("");

  const [errors, setErrors] = useState({
    entry,
    importMethod,
    port,
  });

  return (
    <main className="flex items-center justify-center w-full h-full bg-neutral-800 px-4">
      <form
        className="flex flex-col items-start w-[400px] gap-3 relative"
        onSubmit={(e) => {
          e.preventDefault();

          if (!entry && !importMethod)
            // this will change to highlight errors👇🏻
            return alert("You can't leave any field empty");

          handleChanges({
            entry,
            importMethod,
            port,
          });
        }}
      >
        <Input
          error={errors.entry}
          label="Entry file"
          value={entry}
          onChange={(e) => {
            const val = e.target.value;
            setEntry(val);
          }}
        />

        <Input
          error={errors.port}
          label="Backend port"
          value={port}
          onChange={(e) => {
            const val = e.target.value;

            if (!NumberPattern.test(val) && val)
              return setErrors((prev) => ({
                ...prev,
                port: "Port only can contain numbers",
              }));

            if (errors.port)
              setErrors((prev) => ({
                ...prev,
                port: "",
              }));
            setPort(val);
          }}
        />

        <Select
          label="Import method"
          value={importMethod}
          setValue={setImportMethod}
        />

        <Button className={"mt-1"} block>
          SUBMIT
        </Button>
      </form>
    </main>
  );
}

export default ProjectInformation;
