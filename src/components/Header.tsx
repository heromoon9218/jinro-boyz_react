import { Link } from "react-router-dom";
import {
  IconSearch,
  IconUserCircle,
  IconSettings,
  IconLogout,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";
import "./Header.css";

export default function Header() {
  const { isLoggedIn } = useAuth();

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
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" className="header-link">
                  <IconUserCircle className="header-icon" size={20} />
                  プロフィール
                </Link>
              </li>
              <li>
                <Link to="/settings" className="header-link">
                  <IconSettings className="header-icon" size={20} />
                  設定変更
                </Link>
              </li>
              <li>
                <Link to="/logout" className="header-link">
                  <IconLogout className="header-icon" size={20} />
                  ログアウト
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="header-link">
                  <IconLogin className="header-icon" size={20} />
                  ログイン
                </Link>
              </li>
              <li>
                <Link to="/register" className="header-link header-register">
                  <IconUserPlus className="header-icon" size={20} />
                  新規登録
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
