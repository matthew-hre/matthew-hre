import "./index.css";

function ContentsItem(props) {
  function goToHeading() {
    const headings = document.querySelectorAll("h3");
    if (headings) {
      headings[props.idx].scrollIntoView({
        behavior: "smooth",
        block: "start",
        alignToTop: false,
      });
    }
  }

  return (
    <li>
      <u>
        <a
          onClick={() => goToHeading()}
          href={() => false}
          className="contents-item"
        >
          {props.title}
        </a>
      </u>
    </li>
  );
}

export default ContentsItem;
