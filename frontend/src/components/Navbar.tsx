import { Link } from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
  return (
    <nav>
      <Link to="/">Start</Link>
      <Link to="/authors">Författare</Link>
    </nav>
  );
}

export default Navbar;