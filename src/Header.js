import "./index.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>matthew hrehirchuk</h1>
      </Link>
      <h4 id="taglines">
        software developer, game designer, all around great guy.
      </h4>
    </header>
  );
}

export default Header;
