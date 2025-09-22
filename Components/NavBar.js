import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../style/Navbar.css";
const Navbar = () => {
  const location = useLocation();
  return (
    <div className="navbar">
      <h2 className="logo">🍹BeverageApp</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/queue">Queue</Link>
        </li>
        {location.pathname === "/queue" && (
          <li>
            <Link to="/queue/collected">History</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
