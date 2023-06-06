import { useEffect, useReducer, useState } from "preact/hooks";
import { useBackendFilesContext } from "../context/backend-files-context";
import { cn } from "../helpers/cn";
import RequestInput from "./request-input";

function RequestPanel() {
  const [request, changeRequest] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "changeMethod": {
          return {
            ...state,
            method: action.payload,
          };
        }
        default: {
          return state;
        }
      }
    },
    {
      url: "http://localhost:",
      queries: {},
      headers: {},
      method: "",
    }
  );

  const [open, setOpen] = useState(false);
  const { setBackendFiles } = useBackendFilesContext();

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");

    if (!open) document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      <button
        className="fixed top-0 right-0"
        onClick={() => {
          setOpen(true);
        }}
      >
        open
      </button>

      <div
        className={cn(
          "flex fixed flex-col p-4 overflow-auto w-[min(500px,100%)] h-full right-0 top-0 bg-neutral-800 border-l border-white/25 z-[15] transition-all",
          open ? "" : "-mr-[100%]"
        )}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex items-center justify-center relative gap-4"
        >
          <RequestInput
            method={request.method}
            setMethod={(v) => {
              changeRequest({
                type: "changeMethod",
                payload: v,
              });
            }}
          />

          <button className="bg-violet-500 hover:bg-violet-500/90 text-white text-[14px] px-7 h-[38px] font-semibold leading-none rounded">
            Send
          </button>
        </form>
      </div>

      <div
        onClick={() => setOpen(false)}
        className={cn(
          "flex fixed flex-col overflow-auto w-full h-full right-0 top-0 bg-black/40 transition-all",
          open ? "" : "-mr-[100%]"
        )}
      />
    </>
  );
}

export default RequestPanel;
