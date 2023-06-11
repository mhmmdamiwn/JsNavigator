import { cn } from "../helpers/cn";
import Button from "./ui/button";
import Input from "./ui/input";
import Select from "./ui/select";

function ProjectInformation({ handleChanges }) {
  return (
    <main className="flex items-center justify-center w-full h-full bg-neutral-800 px-4">
      <form
        className="flex flex-col items-start w-[400px] gap-3 relative"
        onSubmit={(e) => {
          e.preventDefault();
          handleChanges({
            entry: "test",
            importMethod: "test",
          });
        }}
      >
        <Input label="Entry file" />

        <Select label="Import method" />

        <Button className={"mt-1"} block>
          SUBMIT
        </Button>
      </form>
    </main>
  );
}

export default ProjectInformation;
