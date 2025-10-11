import { useState, useEffect } from "react";

export default function useReaderProgress(fileUrl) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${fileUrl}`);
    if (saved) setLocation(saved);
  }, [fileUrl]);

  const onLocationChanged = (epubcfi) => {
    setLocation(epubcfi);
    setLoading(false);
    localStorage.setItem(`progress-${fileUrl}`, epubcfi);
  };

  return { location, onLocationChanged, loading };
}
