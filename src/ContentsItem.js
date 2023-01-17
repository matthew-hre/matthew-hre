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
      <a onClick={() => goToHeading()} href={() => false}>
        {props.title}
      </a>
    </li>
  );
}

export default ContentsItem;
