import { DocumentRenderer as DR } from "@keystatic/core/renderer";

export default function DocumentRenderer({ document }: { document: any }) {
  return (
    <div className="font-sans leading-7">
      <DR document={document} />
    </div>
  );
}
