import { useEffect, useReducer, useRef, useState } from "preact/hooks";
import { useBackendFilesContext } from "../context/backend-files-context";
import { cn } from "../helpers/cn";
import RequestInput from "./request-input";
import { Icons } from "./icons";
import QueryParams from "./query-params";
import RequestHeaders from "./request-headers";
import { TabContent, TabRoot, TabTrigger, TabTriggerWrapper } from "./ui/tabs";
import { memo } from "preact/compat";

function RequestPanel() {
  const [focus, setFocus] = useState({
    idx: null,
    key: null,
  });

  const [request, changeRequest] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "changeMethod": {
          return {
            ...state,
            method: action.payload,
          };
        }
        case "changeUrl": {
          const url = action.payload;

          if (!url) return state;

          const q_idx = url?.search(/\?/);

          if (q_idx < 0) return state;

          const queries = new URLSearchParams(
            url?.substring(q_idx, url.length)
          );

          const entries = Object.entries(
            Object.fromEntries(queries.entries())
          ).map(([key, value]) => ({
            key,
            value,
          }));

          const disabledQueries = [];

          state?.queries?.map((item, idx) => {
            if (!item.disabled) return;
            disabledQueries.push({
              query: item,
              idx,
            });
          });

          for (let i = 0; i < disabledQueries.length; ++i) {
            entries.splice(
              disabledQueries[i]?.idx,
              0,
              disabledQueries[i]?.query
            );
          }

          return {
            ...state,
            queries: entries.map((item, idx) => ({
              ...item,
              disabled: state.queries[idx]?.disabled
                ? state.queries[idx]?.disabled
                : false,
            })),
            url: url,
          };
        }
        case "changeQuery": {
          const clone = structuredClone(state?.queries);
          const url = state.url;

          clone[action.payload.idx][action.payload.property] =
            action.payload.value;

          const params = {};
          clone.forEach((item) => {
            if (item.disabled) return;
            params[item.key] = item.value;
          });

          const params_string = new URLSearchParams(params).toString();

          const q_idx = url.search(/\?/);

          if (q_idx < 0) {
            return {
              ...state,
              queries: clone,
              url: url + "?" + params_string,
            };
          }

          return {
            ...state,
            queries: clone,
            url: url.substring(0, q_idx) + "?" + params_string,
          };
        }
        case "removeQuery": {
          const clone = state.queries.filter(
            (_, idx) => idx !== action.payload
          );

          const url = state.url;

          const params = {};
          clone.forEach((item) => {
            if (item.disabled) return;
            params[item.key] = item.value;
          });

          const params_string = new URLSearchParams(params).toString();

          const q_idx = url.search(/\?/);

          if (q_idx < 0) {
            return {
              ...state,
              queries: clone,
              url: url + "?" + params_string,
            };
          }

          return {
            ...state,
            queries: clone,
            url: url.substring(0, q_idx + 1) + params_string,
          };
        }
        case "createQuery": {
          const new_query = {
            key: "",
            value: "",
            disabled: false,
          };
          const clone = [
            ...structuredClone(state.queries),
            {
              ...new_query,
              [action.payload.key]: action.payload.value,
            },
          ];

          setFocus({
            idx: clone.length - 1,
            key: action.payload.key,
          });

          const url = state.url;

          const params = {};
          clone.forEach((item) => {
            if (item.disabled) return;
            params[item.key] = item.value;
          });

          const params_string = new URLSearchParams(params).toString();

          const q_idx = url.search(/\?/);

          if (q_idx < 0) {
            return {
              ...state,
              queries: clone,
              url: url + "?" + params_string,
            };
          }

          return {
            ...state,
            queries: clone,
            url: url.substring(0, q_idx + 1) + params_string,
          };
        }
        case "changeHeader": {
          const clone = structuredClone(state?.headers);

          clone[action?.payload?.idx][action?.payload?.property] =
            action.payload.value;

          return {
            ...state,
            headers: clone,
          };
        }
        case "createHeader": {
          const new_query = {
            key: "",
            value: "",
            disabled: false,
          };

          const clone = [
            ...structuredClone(state?.headers),
            {
              ...new_query,
              [action.payload.key]: action.payload.value,
            },
          ];

          setFocus({
            idx: clone.length - 1,
            key: action.payload.key,
          });

          return {
            ...state,
            headers: clone,
          };
        }
        case "removeHeader": {
          const headers = state.headers.filter(
            (_, idx) => idx !== action.payload
          );

          return {
            ...state,
            headers,
          };
        }
        default: {
          return state;
        }
      }
    },
    {
      url: "http://localhost:3000",
      headers: [],
      queries: [],
      method: "",
    }
  );

  const [open, setOpen] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const { setBackendFiles } = useBackendFilesContext();

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");

    if (!open) document.body.classList.remove("overflow-hidden");
  }, [open]);

  const tabs = [
    {
      title: "Params",
      Component: QueryParams,
      props: {
        queries: request?.queries,
        changeRequest: changeRequest,
        focus: focus,
        setFocus: setFocus,
      },
    },
    {
      title: "Headers",
      Component: RequestHeaders,
      props: {
        headers: request?.headers,
        changeRequest: changeRequest,
        focus: focus,
        setFocus: setFocus,
      },
    },
  ];

  return (
    <>
      <button
        className="fixed top-4 transition-colors right-4 p-1 rounded hover:bg-white/25"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icons.PanelRightOpen className="text-[21px] text-white" />
      </button>

      <div
        className={cn(
          "flex fixed flex-col p-4 overflow-auto w-[min(500px,100%)] h-full right-0 top-0 bg-neutral-800 border-l border-white/25 z-[15] transition-all",
          open ? "" : "-mr-[100%]"
        )}
      >
        <div className="flex w-full border-white/10">
          <button
            className="p-1 hover:bg-white/25 transition-colors rounded"
            onClick={() => setOpen(false)}
          >
            <Icons.X className="text-[21px] text-white" />
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            setLoadingReq(true);

            await new Promise((resolve) => {
              setTimeout(() => resolve(), 1000);
            });

            setBackendFiles(["1", "9", "5"]);

            setLoadingReq(false);
          }}
          className="flex items-center justify-center mt-4 relative gap-4 z-[10]"
        >
          <RequestInput
            url={request?.url}
            setUrl={(v) => {
              changeRequest({
                type: "changeUrl",
                payload: v,
              });
            }}
            method={request?.method}
            setMethod={(v) => {
              changeRequest({
                type: "changeMethod",
                payload: v,
              });
            }}
          />

          <button
            className={cn(
              "flex transition-colors items-center justify-center text-white text-[14px] w-[100px] h-[38px] font-semibold leading-none rounded",
              loadingReq
                ? "bg-violet-500/50"
                : "bg-violet-500 hover:bg-violet-500/90"
            )}
          >
            {loadingReq ? (
              <Icons.Spinner className="animate-spin text-[18px]" />
            ) : (
              "Send"
            )}
          </button>
        </form>

        <TabRoot defaultTab={tabs[0]?.title} className="mt-3">
          <TabTriggerWrapper>
            {tabs.map(({ title }) => (
              <TabTrigger tabIndex={title}>{title}</TabTrigger>
            ))}
          </TabTriggerWrapper>

          <div>
            {tabs?.map(({ Component, props, title }) => (
              <TabContent tabIndex={title}>
                <Component {...props} />
              </TabContent>
            ))}
          </div>
        </TabRoot>
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

export default memo(RequestPanel);
