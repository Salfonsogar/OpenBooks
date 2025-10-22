import { ReactReader } from "react-reader";
import { useEffect } from "react";

export default function ReaderMain({
  fileUrl,
  location,
  onLocationChanged,
  getRendition,
}) {
  console.log("props: fileUrl:", fileUrl, " location:", location);
  useEffect(() => {
    if (!fileUrl) return;

    (async () => {
      try {
        const res = await fetch(fileUrl);
        console.log('fetch:', res.status, 'ok:', res.ok);
      } catch (err) {
        console.error('error fetching fileUrl:', err);
      }
    })();
  }, [fileUrl]);
  return (
    <main className="reader-main">
      <ReactReader
        url={fileUrl}
        location={location}
        locationChanged={onLocationChanged}
        getRendition={getRendition}
        showToc={true}
      />
    </main>
  );
}
