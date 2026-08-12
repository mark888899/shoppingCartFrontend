# ShoppingCart 前端

使用 Vue 3、Vite、Vue Router、Axios 與 Bootstrap 製作的購物車前端。

## 線上服務

| 項目 | 網址 |
|---|---|
| 公開 Demo | https://shopping-cart-frontend-hazel.vercel.app |
| GitHub | https://github.com/mark888899/shoppingCartFrontend |
| Railway 後端 | https://shoppingcart-production-fbf6.up.railway.app |
| 後端 GitHub | https://github.com/mark888899/shoppingCart |

## 需求

- Node.js（建議使用目前 Vite 支援的 LTS 版本）
- npm
- 可使用的 ShoppingCart 後端 API

## 安裝

```sh
npm install
```

若由上層的 `E:\ShoppingCart\Start-Website.cmd` 啟動，缺少套件時腳本會自動安裝。

## 環境變數

前端透過 `VITE_API_BASE_URL` 指定後端 API：

本機開發可建立不提交 Git 的 `.env.local`：

```env
VITE_API_BASE_URL=http://localhost:8080
```

Vercel 正式環境使用：

```env
VITE_API_BASE_URL=https://shoppingcart-production-fbf6.up.railway.app
```

修改 Vercel 環境變數後必須重新部署，新的值才會寫入前端建置結果。

## 本機開發

直接啟動：

```sh
npm run dev -- --host 127.0.0.1 --port 4000
```

開啟 `http://localhost:4000`。

也可以執行上層的 `E:\ShoppingCart\Start-Website.cmd`，一次啟動 MySQL、後端與前端。

## 建置與預覽

正式建置：

```sh
npm run build
```

預覽建置結果：

```sh
npm run preview
```

輸出目錄為 `dist`。

## 部署

- 平台：Vercel
- Framework Preset：Vite
- Root Directory：`./`
- 程式碼來源：GitHub `main` 分支
- 環境變數：`VITE_API_BASE_URL`
- Vercel GitHub App 僅授權 `mark888899/shoppingCartFrontend`

推送到 `main` 後 Vercel 會自動建立新的正式部署。

## CORS

瀏覽器會直接從 Vercel 前端呼叫 Railway 後端，因此 Railway 的 `CORS_ALLOWED_ORIGINS` 必須包含：

```text
https://shopping-cart-frontend-hazel.vercel.app
```

網址結尾不要加 `/`。若日後更換正式網域，必須同步更新 Railway 設定。

## 常見問題

### `vite` 不是內部或外部命令

先執行：

```sh
npm install
```

再使用 `npm run dev`，不要直接輸入 `vite`。

### 商品列表顯示「目前沒有可用商品」

前端已成功連接 API，但 Railway MySQL 可能尚未匯入初始資料。雲端資料庫與本機 Docker MySQL 不共用資料。

### 前端無法呼叫後端

請依序確認：

1. `VITE_API_BASE_URL` 是否為正確的 Railway 後端網址。
2. Railway 後端是否為 Online。
3. Railway 的 `CORS_ALLOWED_ORIGINS` 是否包含目前前端網域。
4. 修改環境變數後是否已重新部署。

## 安全注意事項

- Vite 的 `VITE_*` 變數會被打包到瀏覽器程式碼中，只能放公開設定。
- 不要將資料庫密碼、JWT 金鑰或其他秘密放入任何 `VITE_*` 變數。
- 本機及雲端秘密保存在 `E:\ShoppingCart\secrets` 與部署平台的 Variables 中，不提交 Git。
