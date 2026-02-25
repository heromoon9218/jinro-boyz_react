# 人狼BOYZ React セットアップ手順

## 前提条件

- Node.js 24.13.1
- バックエンド（jinro-boyz_rails）が起動していること（API 連携時）

---

## 1. React アプリケーションの生成（初回のみ）

プロジェクトディレクトリで以下を実行し、Vite + React + TypeScript のプロジェクトを生成します。

```bash
cd jinro-boyz_react
npm create vite@latest . -- --template react-ts
```

※ ディレクトリが空でない場合は上書き確認が出る場合があります。既存の `README.md` や `.cursor/` は必要に応じてバックアップしてください。

---

## 2. 依存関係のインストール

```bash
npm install
```

---

## 3. React 19 のインストール（推奨）

Vite のデフォルトテンプレートは React 18 の場合があります。React 19 を使用する場合:

```bash
npm install react@19 react-dom@19
npm install --save-dev @types/react@latest @types/react-dom@latest
```

---

## 4. 環境変数の設定

バックエンド API の URL を設定します。

### 方法 A: `.env` ファイルを作成

プロジェクトルートに `.env` を作成:

```
VITE_API_URL=http://localhost:3000
```

### 方法 B: Docker Compose 利用時

`compose.yaml` の `environment` で `VITE_API_URL` が設定済みです（デフォルト: `http://localhost:3000`）。

---

## 5. 開発サーバー起動

### ローカルで起動する場合

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

### Docker Compose で起動する場合

```bash
docker compose up
```

※ Vite がコンテナ内で 0.0.0.0 にバインドするよう、`vite.config` で `server.host: true` を設定してください（下記参照）。

---

## 6. Vite 設定（Docker 利用時）

Docker 内で開発サーバーを起動する場合、`vite.config.ts`（または `vite.config.js`）に以下を追加します。

```ts
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0 でバインドし、コンテナ外からアクセス可能にする
    port: 5173,
  },
});
```

---

## 7. Playwright MCP（Vibe Coding・AI ブラウザ連携）

AI がブラウザを直接操作して開発フローを支援するために、Playwright MCP を利用できます。

### 設定

- `jinro-boyz_react/.cursor/mcp.json` に Playwright MCP が設定済みです
- ワークスペースが GitPro の場合用に `GitPro/.cursor/mcp.json` にも同設定を配置しています（両方で MCP が有効になります）

### 有効化

1. Cursor を**完全に再起動**する
2. MCP サーバーが自動起動し、AI からブラウザ操作ツールが利用可能になります

### 利用例（Vibe Coding）

- コード変更後に AI に「localhost:5173 でログインフローを確認して」と依頼
- E2E テストの生成・実行支援
- DOM の検証やアクセシビリティツリーの確認

### 補足

- `cursor-ide-browser` には既知の不具合があるため、代わりに Microsoft Playwright MCP を使用しています
- Node.js 18 以上が必要です

---

## 8. プロジェクト構成（生成後の例）

```
jinro-boyz_react/
├── .cursor/
│   ├── mcp.json
│   └── SPEC.md
├── compose.yaml
├── index.html
├── package.json
├── SETUP.md
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── ...
```

---

## トラブルシューティング

### Docker で起動できない

- `package.json` が存在するか確認
- `npm run dev` が Vite のデフォルトスクリプトか確認（`"dev": "vite"`）

### API に接続できない

- バックエンド（jinro-boyz_rails）が http://localhost:3000 で起動しているか確認
- CORS がバックエンドで有効か確認
- `VITE_API_URL` が正しく設定されているか確認
