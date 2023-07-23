# 網頁切版直播班 Vite 範例

## Node.js 版本

- 專案的 Node.js 版本需為 v16 以上
- 查看自己版本指令：`node -v`

## 指令列表

- `npm install` - 初次下載該範例專案後，需要使用 npm install 來安裝套件
- `npm run dev` - 執行開發模式
  - 若沒有自動開啟瀏覽器，可嘗試手動在瀏覽器上輸入
    `http://localhost:5173/<專案名稱>/pages/index.html`
- `npm run build` - 執行編譯模式（不會開啟瀏覽器）
- `npm ru deploy` - 自動化部署

## 資料夾結構

- assets # 靜態資源放置處

  - images # 圖片放置處
  - scss # SCSS 的樣式放置處

- layout # ejs 模板放置處
- pages # 頁面放置處

- JavaScript 程式碼可寫在 main.js 檔案

### 注意事項

- 已將 pages 資料夾內的 index.html 預設為首頁，建議不要任意修改 index.html 的檔案名稱
- .gitignore 檔案是用來忽略掉不該上傳到 GitHub 的檔案（例如 node_modules），請不要移除 .gitignore

## 開發模式的監聽

vite 專案執行開發模式 `npm run dev` 後即會自動監聽，不需要使用 `Live Sass Compiler` 的 `Watch SCSS` 功能

## 部署 gh-pages 流程說明

### Windows 版本

1. 在 GitHub 建立一個新的 Repository

2. 部署前請務必先將原始碼上傳到 GitHub Repository 也就是初始化 GitHub，因此通常第一步驟會在專案終端機輸入以下指令

```cmd
git init # 若已經初始化過就可以不用輸入
git add .
git commit -m 'first commit'
git branch -M main
git remote add origin [GitHub Repositories Url]
git push -u origin main // 僅限第一次輸入，往後只需要輸入 git push
```

3. 初始化完畢後，執行 `npm run deploy` 指令進行自動化部署

## 程式碼說明

#### vite.config.js

1. `import { defineConfig } from 'vite';`: 導入了一個 `defineConfig` 函數，它可以幫助你更清楚地定義 Vite 的配置。

2. `import { ViteEjsPlugin } from 'vite-plugin-ejs';`: 導入一個將 EJS 模板支持引入到 Vite 的插件。

3. `import { fileURLToPath } from 'node:url';`: `fileURLToPath` 是一個 Node.js 的內建工具，能將文件 URL 轉換成系統路徑。

4. `import path from 'node:path';`: 引入 Node.js 的內建 `path` 模組，用於處理檔案和目錄路徑。

5. `import { glob } from 'glob';`: `glob` 是一個 Node.js 的模組，用於使用 "glob" 模式匹配檔案。

6. `import liveReload from 'vite-plugin-live-reload';`: 導入一個插件，使得當你更改了一些檔案後，Vite 會自動重新加載頁面。

7. `moveOutputPlugin`: 這是一個自定義的插件，它會在構建結束後，修改一些輸出文件的路徑。

8. `export default defineConfig({ ... })`: 這個部分定義了 Vite 的配置，包括：

   - `base`: 設定公共基礎路徑。

   - `plugins`: 這裡註冊了以上提到的插件。

   - `server`: 設定開發服務器的選項。

   - `build`: 設定構建（也就是編譯和打包）的選項。

     - `rollupOptions`: 這裡定義了 Rollup（Vite 使用的打包工具）的選項。
     - `input`: 使用 `glob` 來動態生成輸入檔案的列表。
     - `outDir`: 指定構建輸出目錄。

#### vite.config.js => moveOutputPlugin

當然可以，以下是將上述內容轉換為 Markdown 格式的結果：

1. `name: 'move-output'`: 設定插件的名稱，它是一個唯一標識符，用於在報錯或警告訊息中識別該插件。

2. `enforce: 'post'`: 表示該插件的 hooks 應在所有其他插件之後運行。在這裡，它確保 `generateBundle` 在所有其他插件完成後運行。

3. `apply: 'build'`: 表示該插件只在構建（即 `vite build`）時應用，而不是在開發服務器運行（即 `vite dev`）時。

4. `async generateBundle(options, bundle) { ... }`: 這是 Rollup 的一個 hook。當所有模塊已被讀取，且最終的捆綁包即將生成時，該 hook 將被呼叫。在這裡，它被用來遍歷所有的輸出檔案並修改它們的檔名。

   - `for (const fileName in bundle) { ... }`: 遍歷所有的輸出檔案。

   - `if (fileName.startsWith('pages/')) { ... }`: 如果檔案路徑以 "pages/" 開頭，則進行處理。

   - `const newFileName = fileName.slice('pages/'.length);`: 從原檔案名切割掉 "pages/"，得到新的檔案名稱。

   - `bundle[fileName].fileName = newFileName;`: 將新的檔名賦值給輸出檔案的 `fileName` 屬性，這將改變該檔案的輸出路徑。

## 相關網址

1. 圖庫 https://github.com/hexschool/2022-web-layout-training/tree/main/week3-4

2. 設計稿 https://xd.adobe.com/view/5b20cbc4-5c64-4b67-814e-633b078a8cd4-0e73/grid

3. HackMD https://rpg.hexschool.com/training/36/show?embedhm=yAuiWgHrQzaLy_ZAlXUuOw
