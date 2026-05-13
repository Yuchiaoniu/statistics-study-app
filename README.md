# 統計學學習工具 (statistics-study-app)

🌐 **線上版**：<https://yuchiaoniu.github.io/statistics-study-app/>

互動式統計學學習網站。純靜態網頁，部署在 GitHub Pages。

**內容**：

- 第 2 章 隨機變數：機率分配本質、PMF / PDF / CDF、Σ 與 ∫ 統一性
- 第 4 章 連續型分配：均勻、常態、指數、無記憶性（含互動圖表）
- 30 題練習題（每觀念 5 題），即時對錯回饋與解析

## 本機預覽

任選一種：

### 方式 1：Node `npx serve`

```powershell
npx serve .
```

### 方式 2：Python 內建 server

```powershell
python -m http.server 8000
```

### 方式 3：VS Code Live Server 擴充功能

右鍵 `index.html` → Open with Live Server

任一方式啟動後，瀏覽器開 http://localhost:8000（或其顯示的網址）。

## 部署到 GitHub Pages

1. 把整個資料夾推到 GitHub（公開 repo）

   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<你的帳號>/statistics-study-app.git
   git branch -M main
   git push -u origin main
   ```

2. GitHub repo → **Settings → Pages**
3. **Source** 選 `Deploy from a branch`
4. **Branch** 選 `main` / `(root)` → Save
5. 等 1-2 分鐘，網址會出現在頁面上：

   ```
   https://<你的帳號>.github.io/statistics-study-app/
   ```

部署完之後把這個網址貼回此 README 開頭。

## 如何新增題目

直接編輯 `data/questions.json`，加入一筆題目物件：

```json
{
  "id": "concept-006",
  "chapter": "continuous-distributions",
  "concept": "normal",
  "prompt": "題目敘述，可含 $\\mu$、$\\sigma$ 等 MathJax 公式",
  "options": ["選項A", "選項B", "選項C", "選項D"],
  "correct_index": 2,
  "explanation": "解析，說明為何正解、為何錯解"
}
```

- `concept` 必須是現有六個之一：`probability-essence`, `pmf-pdf-cdf`, `uniform`, `normal`, `exponential`, `memoryless`
- `correct_index` 是正解在 `options` 陣列中的索引（0 開始）
- 存檔後重新整理頁面即生效，不需要重新部署任何程式

## fork 改成自己的版本

1. 點 GitHub 頁面右上角 **Fork**
2. clone 你 fork 的 repo 到本機
3. 修改題庫、教材、樣式
4. push 回去後在自己的 Pages 開啟

## 目錄結構

```
statistics-study-app/
├── index.html               首頁
├── chapters/
│   ├── random-variables.html
│   └── continuous-distributions.html
├── css/main.css
├── js/
│   ├── quiz.js              選擇題判分（前端）
│   └── chart-panel.js       PDF/CDF 互動圖表
├── data/questions.json      題庫
├── .nojekyll                防止 GitHub Pages 用 Jekyll 處理
└── openspec/                專案規劃與變更追蹤
```

## 技術

- 純 HTML / CSS / vanilla JavaScript，無前端框架
- 圖表用 Canvas 自繪（無 Chart.js / D3 等外部依賴）
- 公式用 MathJax CDN 渲染
- 題庫為單一 JSON 檔，一次 fetch 載入後在前端篩選
