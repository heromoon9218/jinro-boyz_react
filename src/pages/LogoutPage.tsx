import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LogoutPage() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      if (isLoggedIn) {
        try {
          await logout();
        } catch {
          // エラー時もログアウト状態にする
        }
      }
      navigate("/login", { replace: true });
    };

    doLogout();
  }, [logout, isLoggedIn, navigate]);

  return (
    <div>
      <p>ログアウト中...</p>
    </div>
  );
}
