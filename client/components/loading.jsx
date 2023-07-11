import { Icons } from "./icons";

function Loading() {
  return (
    <main className="flex flex-col items-center justify-center bg-neutral-800 w-full h-full">
      <Icons.Spinner className="text-white text-[21px] animate-spin" />

      <p className="text-[13px] text-white mt-1">
        This process can take a couple of seconds to complete please be patient
      </p>
    </main>
  );
}

export default Loading;
