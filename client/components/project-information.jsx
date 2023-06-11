import { useState } from "preact/hooks";
import Button from "./ui/button";
import Input from "./ui/input";
import Select from "./ui/select";

function ProjectInformation({ handleChanges }) {
  const [entry, setEntry] = useState("");
  const [importMethod, setImportMethod] = useState("");

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
          });
        }}
      >
        <Input label="Entry file" value={entry} setValue={setEntry} />

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
