import { useState, useEffect } from "react";

export function useLocalStorageValue(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    const handler = () => {
      const saved = localStorage.getItem(key);
      setValue(saved ? JSON.parse(saved) : initialValue);
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, initialValue]);

  return value; 
}
