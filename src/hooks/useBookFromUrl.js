import { useState, useEffect } from "react";

export default function useBookFromUrl(fileUrl) {
  const [url, setUrl] = useState(fileUrl);

  useEffect(() => {
    setUrl(fileUrl);
  }, [fileUrl]);

  return url;
}
