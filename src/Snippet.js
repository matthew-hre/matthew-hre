import "./index.css";
import { useState } from "react";

function Snippet({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  let firstLine = children[0];

  // is the last character of firstLine a period?
  let ellipsis = "...";

  let shownChildren = children.slice(1);

  function collapse() {
    setCollapsed(!collapsed);
  }

  function copy() {
    navigator.clipboard.writeText(
      children
        .toString()
        .replaceAll(",[object Object],", "\n")
        .replaceAll(",[object Object]", "")
        .replaceAll("[object Object]", "")
    );
  }

  return (
    <>
      <div className="snippet">
        {firstLine}
        {ellipsis && collapsed && ellipsis}
        {shownChildren && !collapsed && shownChildren}
        <br />
        <span className="snippet-buttons">
          <a onClick={collapse} href={() => false}>
            {"collapse" && collapsed ? "expand" : "collapse"}
          </a>{" "}
          <a onClick={copy} href={() => false}>
            copy
          </a>
        </span>
      </div>
    </>
  );
}

export default Snippet;
