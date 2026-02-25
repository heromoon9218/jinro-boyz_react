import { Link } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import "./Header.css";

export default function Header() {
  return (
    <nav className="header">
      <div className="header-container">
        <Link to="/" className="header-brand">
          人狼BOYZ
        </Link>
        <ul className="header-nav">
          <li>
            <Link to="/" className="header-link">
              <IconSearch className="header-icon" size={20} />
              村を探す
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
