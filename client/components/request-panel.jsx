import { useEffect, useReducer, useRef, useState } from "preact/hooks";
import { useExecutedFilesContext } from "../context/executed-files-context";
import { cn } from "../helpers/cn";
import RequestInput from "./request-input";
import { Icons } from "./icons";
import QueryParams from "./query-params";
import RequestHeaders from "./request-headers";
import { TabContent, TabRoot, TabTrigger, TabTriggerWrapper } from "./ui/tabs";
import { memo } from "preact/compat";
import IconButton from "./ui/icon-button";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResponseAsJson from "./response/response-as-json";
import ResponseAsTable from "./response/response-as-table";
import { turnArrayToObject } from "../helpers/turn-array-to-object";

function RequestPanel({ port }) {
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

          if (q_idx < 0) return { ...state, url };

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
            url,
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
          return {
            ...state,
            queries: clone,
            url:
              q_idx < 0
                ? url + "?" + params_string
                : url.substring(0, q_idx + 1) + params_string,
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
      url: "http://localhost:" + port,
      headers: [],
      queries: [],
      method: "",
    }
  );
  const [response, setResponse] = useState({
    data: null,
    code: null,
  });
  const [open, setOpen] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const { setExecutedFiles } = useExecutedFilesContext();

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");

    if (!open) document.body.classList.remove("overflow-hidden");
  }, [open]);

  const reqTabs = [
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

  const resTabs = [
    {
      title: "Table",
      Component: ResponseAsTable,
      props: {
        data: response.data,
        code: response.code,
      },
      show: typeof response.data !== "string",
    },
    {
      title: "JSON",
      Component: ResponseAsJson,
      props: {
        data: response.data,
        code: response.code,
      },
      show: true,
    },
  ];

  return (
    <>
      <IconButton
        size="md"
        variant="ghost"
        className="fixed top-4 right-4"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icons.PanelRightOpen className="text-[21px] text-white/75 hover:text-white transition-all" />
      </IconButton>

      <div
        className={cn(
          "flex fixed flex-col p-4 overflow-auto w-[min(500px,100%)] h-full right-0 top-0 bg-neutral-800 border-l border-white/25 z-[15] transition-all",
          open ? "" : "-mr-[100%]"
        )}
      >
        <div className="flex w-full border-white/10">
          <IconButton variant="ghost" size="md" onClick={() => setOpen(false)}>
            <Icons.X className="text-[21px]" />
          </IconButton>

          <a
            target="_blank"
            href="https://github.com/mhmmdamiwn/JsNavigator"
            className="flex items-center justify-end gap-2 w-full"
          >
            <IconButton size="sm" variant="outlined">
              <Icons.Github className="text-[16px] h-[16px]" />
            </IconButton>
          </a>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!request.method) return;

            setLoadingReq(true);

            try {
              const obj = {
                data: "",
                code: "",
              };

              const user_res = await fetch(request.url, {
                method: request.method,
                headers: turnArrayToObject(request.headers, "key", "value"),
              });

              obj.code = user_res.status;

              if (!user_res.ok) {
                return setResponse(obj);
              }

              const user_data = await user_res.text();
              obj.data = user_data;

              const postman_res = await fetch(
                "http://localhost:8585/jsnavigator/postman"
              );

              if (!postman_res.ok) {
                // TODO
                // show a model for acknowledging user about failed attempt to get executed files
                setResponse(obj);
                return;
              }

              const postman_data = await postman_res.json();
              console.log(postman_data);

              setExecutedFiles(postman_data?.executed ?? []);
              setResponse(obj);

              setLoadingReq(false);
            } catch (err) {
              setLoadingReq(false);
              setResponse({
                data: {
                  error: err.message,
                },
                code: 500,
              });
            }
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
              "flex transition-all items-center justify-center text-white text-[14px] w-[100px] h-[38px] font-semibold leading-none rounded",
              loadingReq ? "bg-primary/50" : "bg-primary hover:bg-primary/90"
            )}
          >
            {loadingReq ? (
              <Icons.Spinner className="animate-spin text-[18px]" />
            ) : (
              "Send"
            )}
          </button>
        </form>

        <PanelGroup direction="vertical">
          <Panel className="relative">
            <TabRoot
              defaultTab={reqTabs[0]?.title}
              className="h-full mt-3 overflow-auto pb-5"
            >
              <TabTriggerWrapper>
                {reqTabs.map(({ title }) => (
                  <TabTrigger tabIndex={title}>{title}</TabTrigger>
                ))}
              </TabTriggerWrapper>

              <div>
                {reqTabs?.map(({ Component, props, title }) => (
                  <TabContent tabIndex={title}>
                    <Component {...props} />
                  </TabContent>
                ))}
              </div>
            </TabRoot>
          </Panel>

          {Object.values(response).some((v) => v !== null) ? (
            <>
              <PanelResizeHandle className="h-0.5 my-0.5 hover:my-[1px] hover:py-0.5 bg-white/25 hover:bg-white/40 active:bg-primary" />
              <Panel className="relative">
                <TabRoot
                  defaultTab={resTabs.filter(({ show }) => show)[0]?.title}
                  className="mt-3 h-full overflow-auto pb-4"
                >
                  <TabTriggerWrapper>
                    {resTabs.map(({ title, show }) => {
                      if (!show) return <></>;

                      return <TabTrigger tabIndex={title}>{title}</TabTrigger>;
                    })}
                  </TabTriggerWrapper>

                  <div>
                    {resTabs?.map(({ Component, props, title, show }) => {
                      if (!show) return;

                      return (
                        <TabContent tabIndex={title}>
                          <Component {...props} />
                        </TabContent>
                      );
                    })}
                  </div>
                </TabRoot>
              </Panel>
            </>
          ) : (
            <></>
          )}
        </PanelGroup>
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
