import { useRef, useEffect } from "react";

export function useInterval(callback: () => void, delay: { time: number }) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => savedCallback.current(), delay.time);

      return () => clearInterval(id);
    }
  }, [delay]);
}
