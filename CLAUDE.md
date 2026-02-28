# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 会話ガイドライン

- 常に日本語で会話する

## プロジェクト概要

**人狼BOYZ** フロントエンド。バックエンド API（`jinro-boyz_rails`、Rails 8.1）と連携する React 19 + TypeScript アプリ。

**スタック**: React 19, TypeScript 5.9, Vite 7, TailwindCSS 4, react-router-dom v7, @tabler/icons-react

## コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー（localhost:5173）
npm run dev

# ビルド
npm run build

# Lint + フォーマット（ESLint fix + Prettier）
npm run fix

# E2E テスト（Playwright / Chromium）
npm run test:e2e

# E2E テスト（インタラクティブ UI）
npm run test:e2e:ui
```

### src 編集後の必須チェック

`src/` 以下を変更した後は必ず以下を実行する:
1. `npm run fix` — ESLint 自動修正 + Prettier フォーマット
2. `npm run test:e2e` — E2E スモークテスト通過を確認

## アーキテクチャ

```
src/
├── api/client.ts        # fetch ラッパー。全 API リクエストはここを経由
├── components/          # 再利用 UI コンポーネント（例: Header）
├── pages/               # ルート単位のページコンポーネント
│   ├── VillagesPage.tsx # / — 村一覧
│   ├── ProfilePage.tsx  # /profile — プロフィール
│   └── SettingsPage.tsx # /settings — 設定
└── App.tsx              # BrowserRouter + Routes 定義
```

**API クライアント** (`src/api/client.ts`): `apiFetch(path, options)` が `VITE_API_URL/api/v1{path}` へ fetch を発行。Axios は不使用、ネイティブ fetch のみ。

**ルーティング**: react-router-dom v7 の `BrowserRouter` + `Routes`。`App.tsx` にルート一覧を集約。

**スタイル**: TailwindCSS 4（Vite プラグイン経由）。コンポーネントごとに `.css` ファイルを配置。

## 環境変数

`.env.example` を元に `.env` を作成:

```
VITE_API_URL=http://localhost:3000
```

デフォルトは `http://localhost:3000`（フォールバックは `client.ts` に定義済み）。

## E2E テスト

- テストファイル: `e2e/*.spec.ts`
- Playwright が `npm run dev` を自動起動（既存サーバーがあれば再利用）
- ベース URL: `http://localhost:5173`、ブラウザ: Chromium のみ

## ゲームドメイン（参考）

バックエンドのドメイン設計に合わせて実装する:

| ルーム | 表示対象 |
|--------|----------|
| MainRoom | 全生存者 |
| WolfRoom | 人狼のみ |
| DeadRoom | 死亡者のみ |

主要画面: 認証、村一覧・詳細、ゲーム画面（チャット・投票・占い・護衛）、プロフィール
