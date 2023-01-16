import "./index.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ContentsItem from "./ContentsItem";

function Contents(props) {
  const location = useLocation();

  useEffect(() => {
    const headings = document.querySelectorAll("h3");
    if (headings) {
      headings[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  const data = props.data.split(", ");
  let elements = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i].split(": ");
    const title = element[0];
    const idx = parseInt(element[1]) - 1;

    // add a ContentItem component to the unordered list
    elements.push(<ContentsItem title={title} idx={idx} />);
  }

  return (
    <div>
      <ul className="nobull contents">
        <h4>Table of Contents</h4>
        {elements}
      </ul>
    </div>
  );
}

export default Contents;
