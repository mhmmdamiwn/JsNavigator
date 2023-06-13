import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { cn } from "../../helpers/cn";
import { memo } from "preact/compat";

const TabsContext = createContext();

export function TabRoot({ children, defaultTab, ...props }) {
  const [current, setCurrent] = useState(defaultTab);
  const [linePosition, setLinePosition] = useState({
    left: null,
    width: null,
    tabIndex: null,
  });

  return (
    <div {...props}>
      <TabsContext.Provider
        value={{
          current,
          setCurrent,
          linePosition,
          setLinePosition,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
}

export function TabTriggerLine({ className, ...props }) {
  const { linePosition } = useContext(TabsContext);

  return (
    <span
      style={{
        width: linePosition.width,
        left: linePosition.left,
      }}
      className={cn(
        "absolute transition-all h-[3px] rounded bg-violet-500 bottom-0",
        className
      )}
      {...props}
    />
  );
}

export const TabTrigger = memo(
  ({ type = "button", tabIndex, className, ...props }) => {
    const { setCurrent, current, setLinePosition, linePosition } =
      useContext(TabsContext);
    return (
      <button
        ref={(node) => {
          if (!node) return;

          if (tabIndex === current && tabIndex !== linePosition.tabIndex) {
            setTimeout(
              () =>
                setLinePosition({
                  left: node.offsetLeft,
                  width: node.offsetWidth,
                  tabIndex,
                }),
              0
            );
          }
        }}
        className={cn(
          "text-[12px] py-1 transition-colors",
          tabIndex === current
            ? "text-white font-medium"
            : "text-white/75 hover:text-white font-normal",
          className
        )}
        onClick={() => {
          if (tabIndex === current) return;

          setCurrent(tabIndex);
        }}
        type={type}
        {...props}
      />
    );
  }
);

export const TabTriggerWrapper = memo(({ children, ...props }) => {
  return (
    <div className="flex gap-5 relative" {...props}>
      {children}
      <TabTriggerLine />
    </div>
  );
});

export const TabContent = memo(({ tabIndex, className, ...props }) => {
  const { current } = useContext(TabsContext);
  if (current !== tabIndex) return null;

  return <div className={cn("", className)} {...props} />;
});