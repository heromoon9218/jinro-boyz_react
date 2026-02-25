import { apiFetch } from "./client";

export type User = {
  id: number;
  email: string;
  username: string;
  created_at: string;
};

export type AuthResponse = {
  user: User;
};

export type ErrorResponse = {
  error?: string;
  errors?: string[];
};

function getTokenFromResponse(response: Response): string | null {
  return (
    response.headers.get("Authorization")?.replace(/^Bearer\s+/, "") ?? null
  );
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await apiFetch("/users/sign_in", {
    method: "POST",
    body: JSON.stringify({ user: { email, password } }),
  });

  const token = getTokenFromResponse(response);
  if (token) {
    localStorage.setItem("jwt_token", token);
  }

  if (!response.ok) {
    const data: ErrorResponse = await response.json().catch(() => ({}));
    throw new Error(
      data.error ?? data.errors?.join(", ") ?? "ログインに失敗しました"
    );
  }

  const data: AuthResponse = await response.json();
  return data;
}

export async function register(
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> {
  const response = await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify({ user: { email, password, username } }),
  });

  const token = getTokenFromResponse(response);
  if (token) {
    localStorage.setItem("jwt_token", token);
  }

  if (!response.ok) {
    const data: ErrorResponse = await response.json().catch(() => ({}));
    throw new Error(data.errors?.join(", ") ?? "登録に失敗しました");
  }

  const data: AuthResponse = await response.json();
  return data;
}

export async function logout(): Promise<void> {
  const response = await apiFetch("/users/sign_out", {
    method: "DELETE",
  });

  localStorage.removeItem("jwt_token");

  if (!response.ok && response.status !== 401) {
    throw new Error("ログアウトに失敗しました");
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const response = await apiFetch("/users/me");

  if (response.status === 401) {
    localStorage.removeItem("jwt_token");
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const data: { user: User } = await response.json();
  return data.user;
}
