import { useEffect, useRef } from "preact/hooks";

export const useClickOutSide = (cb, handle) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current || !handle) return;

    const handleClickOutSide = (e) => {
      const target = e.target;
      if (ref.current !== target && !ref.current?.contains(target)) {
        cb();
      }
    };

    window.addEventListener("mousedown", handleClickOutSide);

    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [ref, cb, handle]);

  return [ref];
};
