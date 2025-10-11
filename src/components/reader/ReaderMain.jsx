import { ReactReader } from "react-reader";

export default function ReaderMain({
  fileUrl,
  location,
  onLocationChanged,
  getRendition,
}) {
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
