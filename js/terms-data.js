// js/terms-data.js — 統計學專詞資料庫

const STAGES = [
  {
    id: 1,
    name: '描述資料',
    en: 'Descriptive Statistics',
    desc: '整理手上的資料，算出能代表這組數字的幾個關鍵數值。這是解題的起點，也是題目直接給你的輸入。',
    color: '#fb923c',
    chapters: ['Ch 1', 'Ch 2', 'Ch 3']
  },
  {
    id: 2,
    name: '機率基礎',
    en: 'Probability',
    desc: '定義「可能性」的語言，是所有分配與推論的底層規則。沒有機率的定義，分配這個概念無法成立。',
    color: '#a3e635',
    chapters: ['Ch 4']
  },
  {
    id: 3,
    name: '分配族',
    en: 'Probability Distributions',
    desc: '把機率規則具體化成各種形狀的模型，描述不同現象的隨機行為。分配是選工具之前必須認識的語言。',
    color: '#38bdf8',
    chapters: ['Ch 5', 'Ch 6']
  },
  {
    id: 4,
    name: '橋接層',
    en: 'Sampling Distributions',
    desc: '從「個別觀測值」跨到「樣本統計量」。中央極限定理讓常態分配在推論中無處不在。',
    color: '#c084fc',
    chapters: ['Ch 7']
  },
  {
    id: 5,
    name: '推論前置',
    en: 'Inference Setup',
    desc: '進入假設檢定前需要掌握的工具：自由度、t 分配的選用條件、臨界值、信賴區間。',
    color: '#fb7185',
    chapters: ['Ch 8']
  },
  {
    id: 6,
    name: '假設檢定',
    en: 'Hypothesis Testing',
    desc: '用樣本資料對母體做出決策的完整流程，從設立假設到查表作結論。',
    color: '#fbbf24',
    chapters: ['Ch 9', 'Ch 10']
  },
  {
    id: 7,
    name: '進階工具',
    en: 'Advanced Modeling',
    desc: '建立在推論統計基礎上的更強大分析方法，用於多組比較、關係建模與類別資料分析。內容尚在建置中。',
    color: '#94a3b8',
    chapters: ['Ch 11', 'Ch 12', 'Ch 13', 'Ch 14', 'Ch 15']
  }
];

const TERMS = [

  // ── Stage 1：描述資料 ─────────────────────────────────────────

  {
    id: 'population',
    name: '母體',
    en: 'Population',
    stage: 1,
    easyDef: '研究想了解的「全體」——如果你想知道全台灣人的平均身高，母體就是全台灣所有人的身高資料。現實中幾乎永遠無法量遍，只能靠樣本推論。',
    def: '研究者感興趣的所有測量值的集合。母體通常太大無法全測，所以靠樣本來推論母體。'
  },
  {
    id: 'sample',
    name: '樣本',
    en: 'Sample',
    stage: 1,
    easyDef: '從母體中抽出的一小部分——就是你真正量到的那批資料。樣本越大，推論越準確。',
    def: '從母體中抽出的子集，用來代表母體做推論。'
  },
  {
    id: 'sample-mean',
    name: '樣本平均數',
    en: 'Sample Mean',
    stage: 1,
    formula: '\\bar X = \\dfrac{1}{n}\\sum_{i=1}^n x_i',
    symbols: [
      { sym: '\\bar X', desc: '樣本平均數，讀作「X bar」' },
      { sym: 'n', desc: '樣本個數（共有幾筆資料）' },
      { sym: 'x_i', desc: '第 i 筆觀測值（i 從 1 跑到 n）' },
      { sym: '\\sum', desc: '加總符號（Σ），將 i = 1 到 n 全部加起來' },
      { sym: '\\mu', desc: '母體平均數（被 $\\bar X$ 估計的目標）', link: 'population-mean' }
    ],
    easyDef: '把所有樣本數值加起來除以個數——最直觀的「中心」估計值，也是估計母體平均數 μ 的工具。',
    def: '樣本中所有觀測值的算術平均，記為 $\\bar X$。是推論統計中估計母體平均數 $\\mu$ 的點估計量。'
  },
  {
    id: 'variance',
    name: '變異數',
    en: 'Variance',
    stage: 1,
    formula: 's^2 = \\dfrac{\\sum(x_i - \\bar X)^2}{n-1}',
    symbols: [
      { sym: 's^2', desc: '樣本變異數（母體用 $\\sigma^2$）' },
      { sym: 'x_i', desc: '第 i 筆觀測值' },
      { sym: '\\bar X', desc: '樣本平均數', link: 'sample-mean' },
      { sym: '(x_i - \\bar X)^2', desc: '偏差平方，消除正負、放大大偏差' },
      { sym: 'n-1', desc: '自由度（分母用 n−1 是為了得到不偏估計）', link: 'dof' }
    ],
    easyDef: '每個資料點偏離平均值的距離，平方後取平均——代表資料的混亂程度。變異數越大，資料越散亂，越難從樣本看出真實規律。',
    def: '$s^2$（樣本）或 $\\sigma^2$（母體），衡量分配的離散程度。直接加偏差會因正負抵銷而失效，所以先平方再取平均。'
  },
  {
    id: 'std-dev',
    name: '標準差',
    en: 'Standard Deviation',
    stage: 1,
    formula: 's = \\sqrt{\\dfrac{\\sum(x_i - \\bar X)^2}{n-1}}',
    symbols: [
      { sym: 's', desc: '樣本標準差（母體用 $\\sigma$），與原始資料同單位' },
      { sym: '\\sqrt{\\cdot}', desc: '開根號，把變異數（單位²）還原成原始單位' },
      { sym: 's^2', desc: '變異數（根號內的東西）', link: 'variance' }
    ],
    easyDef: '「資料有多分散」的感受。s = 10 表示大多數個別資料距離平均值大概差 10 個單位——就像 GPS 定位誤差 10 公尺。',
    def: '變異數的平方根，與原始資料同單位，比變異數更直觀。母體標準差 $\\sigma$ 分母為 $N$；樣本標準差 $s$ 分母為 $n-1$（不偏估計）。'
  },
  {
    id: 'median',
    name: '中位數',
    en: 'Median',
    stage: 1,
    def: '把資料由小排到大後位於正中央的值。常態分配中中位數等於平均數。'
  },
  {
    id: 'mode',
    name: '眾數',
    en: 'Mode',
    stage: 1,
    def: '資料中出現最頻繁的值。常態分配中眾數等於平均數等於中位數。'
  },

  // ── Stage 2：機率基礎 ─────────────────────────────────────────

  {
    id: 'probability',
    name: '機率',
    en: 'Probability',
    stage: 2,
    def: '一件事發生的可能性，用 0 到 1 之間的數值表示。0 = 絕不發生、1 = 必然發生、0.5 = 一半機率。'
  },
  {
    id: 'sample-space',
    name: '樣本空間',
    en: 'Sample Space',
    stage: 2,
    def: '一個隨機實驗所有可能結果的集合，常用 $\\Omega$ 表示。例：丟一顆骰子的樣本空間是 $\\{1,2,3,4,5,6\\}$。'
  },
  {
    id: 'event',
    name: '事件',
    en: 'Event',
    stage: 2,
    def: '樣本空間的子集合，代表我們關心的某些結果。例：擲骰子「出現偶數」是事件 $\\{2,4,6\\}$。'
  },
  {
    id: 'prob-axioms',
    name: '機率公理',
    en: 'Probability Axioms (Kolmogorov)',
    stage: 2,
    def: '三條：① 非負性 $P(A) \\ge 0$、② 規範性 $P(\\Omega) = 1$、③ 可加性（互斥事件 $P(A \\cup B) = P(A) + P(B)$）。'
  },
  {
    id: 'conditional-prob',
    name: '條件機率',
    en: 'Conditional Probability',
    stage: 2,
    formula: 'P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}',
    def: '在 $B$ 發生的條件下，$A$ 發生的機率。'
  },
  {
    id: 'independence',
    name: '獨立性',
    en: 'Independence',
    stage: 2,
    def: '$A$、$B$ 獨立 ⟺ $P(A \\cap B) = P(A)P(B)$，等價於 $P(A \\mid B) = P(A)$（$B$ 是否發生不影響 $A$）。'
  },
  {
    id: 'mutually-exclusive',
    name: '互斥事件',
    en: 'Mutually Exclusive',
    stage: 2,
    def: '$A \\cap B = \\emptyset$，兩事件不可能同時發生。注意：互斥不等於獨立——兩非零事件若互斥則必不獨立。'
  },
  {
    id: 'bayes',
    name: '貝氏定理',
    en: "Bayes' Theorem",
    stage: 2,
    formula: "P(A \\mid B) = \\dfrac{P(B \\mid A)\\, P(A)}{P(B)}",
    def: '用「事後條件」反推「事前機率」。'
  },
  {
    id: 'total-prob',
    name: '全機率公式',
    en: 'Law of Total Probability',
    stage: 2,
    formula: 'P(B) = \\sum_i P(B \\mid A_i)\\, P(A_i)',
    def: '把 $B$ 的機率拆解為各種情境的加權和。'
  },

  // ── Stage 3：分配族 ──────────────────────────────────────────

  {
    id: 'random-variable',
    name: '隨機變數',
    en: 'Random Variable',
    stage: 3,
    def: '會隨機取不同數值的變數，通常用大寫字母 X、Y 表示。它本身不是一個固定的數，而是「會隨實驗結果變化的數量」。'
  },
  {
    id: 'prob-distribution',
    name: '機率分配',
    en: 'Probability Distribution',
    stage: 3,
    def: '把「總機率 = 1」這塊餅分配給所有可能結果的規則，本質上是一個函數（輸入結果，輸出機率或密度）。'
  },
  {
    id: 'discrete-rv',
    name: '離散型隨機變數',
    en: 'Discrete Random Variable',
    stage: 3,
    def: '只能取「可數」個值（例如：整數 0, 1, 2, ...）。例：丟硬幣 10 次正面數、書中錯字數。'
  },
  {
    id: 'continuous-rv',
    name: '連續型隨機變數',
    en: 'Continuous Random Variable',
    stage: 3,
    def: '可以取數線上某段區間內「不可數」個值。例：等公車時間、體重、溫度。'
  },
  {
    id: 'countable',
    name: '可數 / 不可數',
    en: 'Countable / Uncountable',
    stage: 3,
    def: '可數 = 可以一個一個列舉出來（如 $1, 2, 3, \\ldots$）；不可數 = 列不完（如 $[0, 1]$ 區間內所有實數）。'
  },
  {
    id: 'pmf',
    name: '機率質量函數',
    en: 'Probability Mass Function (PMF)',
    stage: 3,
    def: '離散型專用。輸入 $x$，輸出 $P(X=x)$，函數值就是機率本身。'
  },
  {
    id: 'pdf',
    name: '機率密度函數',
    en: 'Probability Density Function (PDF)',
    stage: 3,
    def: '連續型專用。輸入 $x$，輸出該點的「密度」。注意：密度不是機率，機率要積分後才出來。'
  },
  {
    id: 'cdf',
    name: '累積分配函數',
    en: 'Cumulative Distribution Function (CDF)',
    stage: 3,
    formula: 'F(x) = P(X \\le x) = \\int_{-\\infty}^{x} f(t)\\,dt',
    def: '「到 $x$ 為止累積了多少機率」。離散型是階梯函數，連續型是平滑曲線。'
  },
  {
    id: 'prob-density',
    name: '機率密度',
    en: 'Probability Density',
    stage: 3,
    def: '「每單位寬度的機率」，類似物理的「密度 = 質量 / 體積」。要乘上寬度 $dx$ 才會變成機率。'
  },
  {
    id: 'step-function',
    name: '階梯函數',
    en: 'Step Function',
    stage: 3,
    def: '離散型 CDF 的圖形樣貌。每個可能值處會「跳一階」，跳高度等於該點的 PMF 值。'
  },
  {
    id: 'jump-point',
    name: '跳點',
    en: 'Jump Point',
    stage: 3,
    formula: 'P(X = x_i) = F(x_i) - F(x_i^-)',
    def: '離散型 CDF 在可能值 $x_i$ 處的不連續位置。'
  },
  {
    id: 'point-prob-zero',
    name: '單點機率為 0',
    en: 'Point Probability = 0',
    stage: 3,
    def: '連續型 $P(X = x_0) = 0$ 永遠成立，因為「點」的區間長度為 0。所以連續型「≤」和「<」可以互換。'
  },
  {
    id: 'three-properties',
    name: 'PDF 三大性質',
    en: 'Three Properties of PDF',
    stage: 3,
    def: '合法的 PDF 必須滿足：① $f(x) \\ge 0$、② $\\int f(x)\\,dx = 1$、③ $P(c \\le X \\le d) = \\int_c^d f(x)\\,dx$。'
  },
  {
    id: 'expected-value',
    name: '期望值',
    en: 'Expected Value',
    stage: 3,
    formula: 'E(X) = \\sum x \\cdot P(X=x) \\quad \\text{（離散）}\\qquad E(X) = \\int x\\, f(x)\\,dx \\quad \\text{（連續）}',
    def: '$E(X)$ 或 $\\mu$，分配的「平均位置」。'
  },
  {
    id: 'population-mean',
    name: '母體平均數 μ',
    en: 'Population Mean',
    stage: 3,
    easyDef: '全體資料的真實平均——如果你能量到所有人的身高，算出來那個平均就是 μ。現實中幾乎永遠不知道，只能用樣本平均數 x̄ 去猜它。',
    def: '母體分配的期望值，通常未知。記為 $\\mu$（mu）；在假設檢定中寫成 $\\mu_0$（虛無假設的假定值）。與樣本平均數的關係：$E(\\bar X) = \\mu$（不偏性）。'
  },
  {
    id: 'mgf',
    name: '動差母函數',
    en: 'Moment Generating Function (MGF)',
    stage: 3,
    formula: 'M(t) = E(e^{tX})',
    def: '是個「生成器」：對它求 1 階導數得 $E(X)$、2 階導數得 $E(X^2)$。'
  },
  {
    id: 'linearity',
    name: '線性性質',
    en: 'Linearity of Expectation',
    stage: 3,
    formula: 'E(aX+b) = aE(X)+b \\qquad \\mathrm{Var}(aX+b) = a^2\\mathrm{Var}(X)',
    def: '注意變異數中「$+b$」不影響，但「$a$」要平方。'
  },
  // 離散分配族
  {
    id: 'binomial',
    name: '二項分配',
    en: 'Binomial Distribution B(n, p)',
    stage: 3,
    def: '$n$ 次獨立伯努利試驗中成功次數。例：丟硬幣 10 次正面數。$E(X) = np$，$\\mathrm{Var}(X) = np(1-p)$。'
  },
  {
    id: 'poisson',
    name: '波松分配',
    en: 'Poisson Distribution Poisson(λ)',
    stage: 3,
    def: '單位時間/空間內隨機事件發生次數。例：每小時客服電話數。特色：$E(X) = \\mathrm{Var}(X) = \\lambda$。'
  },
  {
    id: 'hypergeometric',
    name: '超幾何分配',
    en: 'Hypergeometric Distribution',
    stage: 3,
    def: '「不放回」抽樣的成功數。例：從 20 顆球（8 紅 12 白）抽 5 顆中的紅球數。對應放回版本的二項分配。'
  },
  {
    id: 'geometric',
    name: '幾何分配',
    en: 'Geometric Distribution',
    stage: 3,
    def: '「首次成功」前的試驗次數。例：第幾次丟硬幣才出現正面。具有無記憶性。'
  },
  {
    id: 'neg-binomial',
    name: '負二項分配',
    en: 'Negative Binomial Distribution',
    stage: 3,
    def: '「第 $r$ 次成功」前的試驗次數。幾何分配是 $r=1$ 的特例。'
  },
  {
    id: 'poisson-process',
    name: '波松過程',
    en: 'Poisson Process',
    stage: 3,
    def: '事件依固定速率 $\\lambda$ 隨機發生的過程。次數服從波松分配，等待時間服從指數分配。'
  },
  {
    id: 'poisson-approx',
    name: '波松近似二項',
    en: 'Poisson Approximation to Binomial',
    stage: 3,
    def: '當 $n \\ge 20$ 且 $np \\le 7$ 時，$B(n, p) \\approx \\mathrm{Poisson}(\\lambda = np)$，計算更方便。'
  },
  // 連續分配族
  {
    id: 'uniform',
    name: '連續型均勻分配',
    en: 'Continuous Uniform Distribution U(a, b)',
    stage: 3,
    def: 'X 在 $[a, b]$ 內每個位置密度相同的分配。PDF 是水平直線、CDF 是斜直線。例：等公車時間。'
  },
  {
    id: 'normal',
    name: '常態分配',
    en: 'Normal Distribution N(μ, σ²)',
    stage: 3,
    def: '對稱鐘形曲線，自然界與測量誤差最常見。$\\mu$ 控制位置、$\\sigma$ 控制胖瘦。'
  },
  {
    id: 'standard-normal',
    name: '標準常態分配',
    en: 'Standard Normal N(0, 1)',
    stage: 3,
    def: '$\\mu = 0,\\ \\sigma = 1$ 的常態。任意常態可透過 $Z = (X-\\mu)/\\sigma$ 轉成標準常態。'
  },
  {
    id: 'gaussian',
    name: '高斯分配',
    en: 'Gaussian Distribution',
    stage: 3,
    def: '常態分配的別名，紀念 Gauss 對此分配的研究貢獻。另有「鐘形分配」（因外型）。'
  },
  {
    id: 'inflection',
    name: '反曲點',
    en: 'Inflection Point',
    stage: 3,
    def: '曲線的凹凸方向改變的位置。常態曲線在 $\\mu - \\sigma$ 與 $\\mu + \\sigma$ 處各有一個反曲點。'
  },
  {
    id: 'z-transform',
    name: 'Z 化 / 標準化',
    en: 'Z-score Transformation',
    stage: 3,
    formula: 'Z = \\dfrac{X - \\mu}{\\sigma}',
    def: '把 $X \\sim N(\\mu, \\sigma^2)$ 轉成 $Z \\sim N(0,1)$ 的過程。先中心化（$-\\mu$）再縮放（$\\div\\sigma$）。'
  },
  {
    id: 'z-table',
    name: '標準常態分配表',
    en: 'Z Table / Standard Normal Table',
    stage: 3,
    def: '事先建好的 $N(0,1)$ 累積機率對照表。任意常態先 Z 化後就能查此表得機率。'
  },
  {
    id: 'lln',
    name: '大數法則',
    en: 'Law of Large Numbers',
    stage: 3,
    def: '當樣本數 $n$ 趨近無窮，樣本平均數會收斂到母體平均數。是 CLT 的近親。'
  },
  {
    id: 'z-symmetry',
    name: 'Z 分配對稱性',
    en: 'Symmetry of Z',
    stage: 3,
    def: '標準常態以 0 為中心對稱：$P(Z < -z) = P(Z > z)$，$P(-z < Z < 0) = P(0 < Z < z)$。是查表必備的轉換技巧。'
  },
  {
    id: 'inverse-z',
    name: '反查 z 值',
    en: 'Inverse Z Lookup',
    stage: 3,
    def: '給定機率反推 z 值的過程。例：題目給「前 15%」，先換成 $P(0 \\le Z \\le z) = 0.35$，再從 Z 表反查得 z ≈ 1.04。'
  },
  {
    id: 'normal-approx-binom',
    name: '常態近似二項',
    en: 'Normal Approximation to Binomial',
    stage: 3,
    def: '當 $np \\ge 5$ 且 $n(1-p) \\ge 5$ 時，$B(n,p) \\approx N(np,\\, np(1-p))$。讓二項計算可用 Z 表完成。'
  },
  {
    id: 'exponential',
    name: '指數分配',
    en: 'Exponential Distribution Exp(λ)',
    stage: 3,
    def: '波松過程「事件之間的等待時間」。$\\lambda$ 為發生率，$E(X) = 1/\\lambda$。具有無記憶性。'
  },
  {
    id: 'chi-square',
    name: '卡方分配',
    en: 'Chi-square Distribution χ²',
    stage: 3,
    def: '$n$ 個獨立 $N(0,1)$ 的平方和。用於變異數推論、適合度檢定。'
  },
  {
    id: 't-dist',
    name: 't 分配',
    en: "Student's t-distribution",
    stage: 3,
    easyDef: '小樣本（人少）時不確定性更高，所以曲線尾巴比常態更胖、臨界值更嚴格。樣本越多（ν 越大），越接近標準常態。',
    def: '由 W. S. Gosset 以筆名「Student」發表。當小樣本（$n < 30$）且母體 σ 未知時，用樣本標準差 $s$ 取代 σ 後的統計量服從 t 分配。自由度 $\\nu \\to \\infty$ 時 $t \\to Z$。'
  },
  {
    id: 'f-dist',
    name: 'F 分配',
    en: 'F-distribution',
    stage: 3,
    def: '兩個卡方分配（各除以自由度）之比。用於變異數比較、ANOVA。'
  },
  {
    id: 'memoryless',
    name: '無記憶性',
    en: 'Memoryless Property',
    stage: 3,
    formula: 'P(X > s+t \\mid X > s) = P(X > t)',
    def: '「過去多久不影響未來等待時間」。只有指數分配與幾何分配具有此性質。'
  },
  {
    id: 'empirical-rule',
    name: '68-95-99.7 法則',
    en: 'Empirical Rule',
    stage: 3,
    def: '常態分配中：$\\mu \\pm \\sigma$ 涵蓋 68%、$\\mu \\pm 2\\sigma$ 涵蓋 95%、$\\mu \\pm 3\\sigma$ 涵蓋 99.7%。'
  },

  // ── Stage 4：橋接層 ──────────────────────────────────────────

  {
    id: 'sampling-dist',
    name: '抽樣分配',
    en: 'Sampling Distribution',
    stage: 4,
    easyDef: '每次抽不同的 n 個人，算出的樣本平均值都不同——x̄ 本身也是一個隨機變數，有自己的分配，這就叫抽樣分配。',
    def: '樣本統計量（如 $\\bar X$）本身的機率分配，是統計推論的核心橋梁。'
  },
  {
    id: 'se',
    name: '標準誤',
    en: 'Standard Error (SE)',
    stage: 4,
    formula: 'SE = \\dfrac{\\sigma}{\\sqrt{n}} \\approx \\dfrac{s}{\\sqrt{n}}',
    easyDef: '「我估算的那個樣本平均值，本身能差多遠？」——抽 100 人算平均薪資，這個平均值的誤差比抽 1 人小 10 倍（√100 = 10）。',
    def: '樣本平均數 $\\bar X$ 的標準差，不是個別資料的標準差。$\\mathrm{Var}(\\bar X) = \\sigma^2/n$，開根號後得 $SE = \\sigma/\\sqrt{n}$。'
  },
  {
    id: 'sd-vs-se',
    name: '標準差 vs 標準誤',
    en: 'SD vs SE',
    stage: 4,
    easyDef: '標準差：每個跑者的速度有多分散。標準誤：100 人平均速度的估計本身有多不準。n 越大，標準誤越小；但標準差不隨 n 縮小。',
    def: '標準差 $s$：描述個別資料點的分散程度，不隨 $n$ 改變。標準誤 $SE = s/\\sqrt{n}$：描述樣本平均數的不確定性，$n$ 越大越小。口訣：「差」問個別資料、「誤」問平均估計。'
  },
  {
    id: 'clt',
    name: '中央極限定理',
    en: 'Central Limit Theorem (CLT)',
    stage: 4,
    formula: '\\bar X \\xrightarrow{d} N\\!\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right) \\quad (n \\ge 30)',
    easyDef: '不管原始資料是什麼形狀，只要樣本夠大（n ≥ 30），樣本平均數的分配就會接近常態分配。這是幾乎所有推論統計的核心基礎。',
    def: '當 $n$ 夠大（一般 $n \\ge 30$），無論母體分配為何，$\\bar X$ 近似服從 $N(\\mu, \\sigma^2/n)$。讓常態分配在推論中無處不在。'
  },
  {
    id: 'var-xbar',
    name: 'Var(x̄) = σ²/n',
    en: 'Variance of Sample Mean',
    stage: 4,
    formula: '\\mathrm{Var}(\\bar X) = \\mathrm{Var}\\!\\left(\\frac{X_1+\\cdots+X_n}{n}\\right) = \\frac{1}{n^2} \\cdot n\\sigma^2 = \\frac{\\sigma^2}{n}',
    easyDef: 'x̄ 是 n 個獨立觀測值的平均，除以 n 讓變異數縮小 n² 倍，但 n 個獨立量的總變異是 nσ²，相除後剩下 σ²/n。',
    def: '推導：$\\bar X = \\frac{1}{n}\\sum X_i$，常數 $\\frac{1}{n}$ 讓變異數乘以 $\\frac{1}{n^2}$；$n$ 個獨立 $X_i$ 的變異數相加得 $n\\sigma^2$；兩者相乘得 $\\sigma^2/n$。'
  },

  // ── Stage 5：推論前置 ─────────────────────────────────────────

  {
    id: 'dof',
    name: '自由度',
    en: 'Degrees of Freedom (df)',
    stage: 5,
    easyDef: '5 個人的身高，知道平均值後，只有 4 個人的身高可以「自由」是任意數——最後一個已被算死。所以 n = 5 時自由度 = 4。',
    def: '樣本中「獨立資訊個數」。單樣本平均數推論時 $\\nu = n - 1$（因為 $\\bar X$ 已用掉一個自由度）。查 t 表必備的參數。'
  },
  {
    id: 'normality-assumption',
    name: '母體常態假設',
    en: 'Normality Assumption',
    stage: 5,
    easyDef: '小樣本做 t 檢定有個隱藏前提：原始資料來自常態分配。大樣本（n ≥ 30）靠 CLT 不需要這個假設；小樣本若母體嚴重偏斜，t 檢定就不可靠。',
    def: '使用 t 分配的先決條件：「母體資料服從（或近似）常態分配」。大樣本（$n \\ge 30$）即使母體非常態，$\\bar X$ 也近似常態，可用 Z 檢定；小樣本（$n < 30$）必須依賴此假設。'
  },
  {
    id: 'critical-value',
    name: '臨界值',
    en: 'Critical Value',
    stage: 5,
    easyDef: '「超過這條線就算太極端了」的門檻——就像及格線。比這更極端的統計量，代表資料很難只靠運氣（H₀ 成立）來解釋。',
    def: '在某分配（Z 或 t）下，尾部面積等於 $\\alpha$ 對應的值。例：$t_{8,\\ 0.05} = 1.8595$ 表示「自由度 8 時，5% 機率落在 t > 1.8595」。'
  },
  {
    id: 'confidence-level',
    name: '信賴水準',
    en: 'Confidence Level (1−α)',
    stage: 5,
    easyDef: '「我有幾成把握」。95% 信賴水準 = 用這個方法重複估計 100 次，平均有 95 次的區間會包住真實值 μ。',
    def: '建構信賴區間時所選的把握度。常見 95%（$\\alpha = 0.05$）、99%（$\\alpha = 0.01$）。雙尾時 α 平均分配到兩側，故查表用 $\\alpha/2$。'
  },

  // ── Stage 6：假設檢定 ─────────────────────────────────────────

  {
    id: 'individual-obs',
    name: '個別資料 xᵢ',
    en: 'i-th Observation',
    stage: 6,
    def: '樣本中「第 $i$ 個」資料點。下標 $i$ 是編號（1, 2, ..., n），不是次方。寫公式時用 $\\sum x_i$ 比逐一列舉簡潔。'
  },
  {
    id: 'hypothesis-testing',
    name: '假設檢定',
    en: 'Hypothesis Testing',
    stage: 6,
    easyDef: '用少量樣本替整個母體「打官司」——先預設無罪（H₀），再問「如果真的無罪，看到這份資料的機率有多低？」低到超過門檻（α）就推翻預設。',
    def: '用樣本資料判斷母體是否符合某假設的統計流程。標準步驟：（1）設假設、（2）選 α、（3）算檢定統計量、（4）查臨界值、（5）作結論。'
  },
  {
    id: 'null-hypothesis',
    name: '虛無假設 H₀',
    en: 'Null Hypothesis',
    stage: 6,
    easyDef: '「沒有變化」的保守預設立場——就像法庭的「無罪推定」，是檢定想推翻的對象。',
    def: '必含等號（=, ≤, ≥）；對應「現狀、無作為」；直到被證據推翻前都採信。反證法邏輯：假裝 $H_0$ 是對的 → 看資料有多離譜 → 若超過拒絕域，就推翻 $H_0$。'
  },
  {
    id: 'alt-hypothesis',
    name: '對立假設 H₁',
    en: 'Alternative Hypothesis',
    stage: 6,
    easyDef: '「想證明的事」，與 H₀ 互斥。口訣：想證明什麼，放 H₁。',
    def: '必不含等號（>, <, ≠）；對應「有變化、有效果、有差異」。三種寫法：$H_1: \\mu > \\mu_0$（單尾右）、$H_1: \\mu < \\mu_0$（單尾左）、$H_1: \\mu \\neq \\mu_0$（雙尾）。'
  },
  {
    id: 'significance-level',
    name: '顯著水準 α',
    en: 'Significance Level',
    stage: 6,
    easyDef: '容許自己誤判的最大冒險率。α = 5% 就是「我願意賭 95% 的把握，剩下 5% 的機率我會誤判」。',
    def: '技術上是「型 I 誤差的最大機率」，由研究者事先決定。常用值：0.10 / 0.05 / 0.01 / 0.001。'
  },
  {
    id: 'test-statistic',
    name: '檢定統計量',
    en: 'Test Statistic',
    stage: 6,
    easyDef: '把「樣本均值偏離猜測值多少個標準誤」換算成一個純數字——就像把溫差換成「熱指數評分」，容易比較也好查表。',
    def: '用樣本算出的「分數」，用來決定是否拒絕 $H_0$。常見類型：Z 統計量、t 統計量、卡方統計量、F 統計量。'
  },
  {
    id: 'z-formula',
    name: 'Z 公式邏輯',
    en: 'Why Z = (x̄ − μ₀) / SE',
    stage: 6,
    formula: 'Z = \\dfrac{\\bar X - \\mu_0}{s/\\sqrt{n}}',
    symbols: [
      { sym: 'Z', desc: '標準化後的純數字，代表「偏了幾個標準誤」' },
      { sym: '\\bar X', desc: '樣本平均數（從資料算出來的）', link: 'sample-mean' },
      { sym: '\\mu_0', desc: 'H₀ 假定的母體平均數（題目給的猜測值）', link: 'null-hypothesis' },
      { sym: 's', desc: '樣本標準差', link: 'std-dev' },
      { sym: 'n', desc: '樣本個數' },
      { sym: 's/\\sqrt{n}', desc: '標準誤（SE）：$\\bar X$ 正常應有的誤差幅度', link: 'se' }
    ],
    easyDef: '想知道「樣本均值偏離假設值有多誇張」，把偏差量除以「正常應有的誤差範圍（SE）」，得到純數字：「偏了幾個誤差單位」。Z = 2 表示偏了 2 個 SE，已相當少見。',
    def: '分子 $\\bar X - \\mu_0$：樣本均值與假設值的差距（有單位）。分母 $SE = s/\\sqrt{n}$：正常應有的誤差尺規。結果 Z：落在 $(-1.96,\\ 1.96)$ 外才算超出雙尾 95% 臨界值。'
  },
  {
    id: 'rejection-region',
    name: '拒絕域',
    en: 'Rejection Region',
    stage: 6,
    def: '「檢定統計量落在這裡就拒絕 $H_0$」的範圍，由臨界值與檢定方向決定。單尾右尾：$Z > Z_\\alpha$；單尾左尾：$Z < -Z_\\alpha$；雙尾：$|Z| > Z_{\\alpha/2}$。'
  },
  {
    id: 'retention-region',
    name: '保留域',
    en: 'Retention Region',
    stage: 6,
    def: '拒絕域的補集——檢定統計量落在這裡就不拒絕 $H_0$。注意：「保留 $H_0$」不等於「接受 $H_0$ 是真的」，只是「證據不足以推翻」。'
  },
  {
    id: 'one-tailed',
    name: '單尾檢定',
    en: 'One-tailed Test',
    stage: 6,
    easyDef: '只關心「有沒有超過」或「有沒有低於」——就像驗血只問「血壓有沒有太高」，不管太低。',
    def: '$H_1$ 寫成 $>$ 或 $<$（單向關心）。拒絕域只在一邊。題目關鍵字：「增加 / 減少 / 提升 / 超過 / 不足」。α = 0.05 時臨界值 $Z = \\pm 1.645$。'
  },
  {
    id: 'two-tailed',
    name: '雙尾檢定',
    en: 'Two-tailed Test',
    stage: 6,
    easyDef: '關心「有沒有改變（任何方向都算）」——就像藥物測試，藥效可能太強也可能太弱，兩邊都要防。',
    def: '$H_1$ 寫成 $\\neq$（兩向都關心）。拒絕域分在兩邊各 α/2。題目關鍵字：「改變 / 不同」。α = 0.05 時臨界值 $Z = \\pm 1.96$（每側分 2.5%）。'
  },
  {
    id: 'z-test',
    name: 'Z 檢定',
    en: 'Z-test',
    stage: 6,
    easyDef: '資料夠多（n ≥ 30）時用的標準版本。臨界值固定（1.645 或 1.96），不需要每次根據自由度另查。',
    def: '適用：（a）σ 已知，或（b）大樣本 $n \\ge 30$（用 $s$ 近似 σ）。統計量：$Z = (\\bar X - \\mu_0)/(s/\\sqrt{n})$。'
  },
  {
    id: 't-test',
    name: 't 檢定',
    en: 't-test',
    stage: 6,
    easyDef: '資料太少（n < 30）時的謹慎版本。因為樣本小、不確定性高，臨界值比 Z 更嚴格（尾巴更胖），防誤判的保護更多。',
    def: '適用：σ 未知且小樣本 $n < 30$。統計量：$t = (\\bar X - \\mu_0)/(s/\\sqrt{n})$。臨界值要查 t 表（自由度 $\\nu = n-1$）。'
  },
  {
    id: 'p-value',
    name: 'p-value',
    en: 'p-value',
    stage: 6,
    easyDef: '如果 H₀ 是真的，看到這種（或更極端的）樣本的機率。p 越小代表證據越強。',
    def: '決策規則：$p < \\alpha$ → 拒絕 $H_0$；$p \\ge \\alpha$ → 保留 $H_0$。例：p = 0.0062 表示「H₀ 為真時看到這種樣本的機率只有 0.62%」，證據相當有力。'
  },
  {
    id: 'type1-error',
    name: '型 I 誤差',
    en: 'Type I Error',
    stage: 6,
    easyDef: '冤枉好人——H₀ 實際為真，卻拒絕了它。發生機率等於 α。',
    def: '$H_0$ 實際為真，但卻拒絕了它。法庭比喻：把無辜的人判有罪。發生機率 = α。'
  },
  {
    id: 'type2-error',
    name: '型 II 誤差',
    en: 'Type II Error',
    stage: 6,
    easyDef: '放過壞人——H₀ 實際為假，卻沒有拒絕它。發生機率記為 β。',
    def: '$H_0$ 實際為假，但卻沒拒絕。法庭比喻：把真兇判無罪。發生機率記為 $\\beta$。'
  },
  {
    id: 'power',
    name: '檢定力',
    en: 'Statistical Power (1−β)',
    stage: 6,
    def: '「正確抓出 $H_0$ 為假」的能力 = $1-\\beta$。提升檢定力的方法：增加樣本數 $n$、放寬 α、效應量越大越容易抓。'
  },

  // ── Stage 7：進階工具 ─────────────────────────────────────────

  {
    id: 'anova',
    name: 'ANOVA',
    en: 'Analysis of Variance',
    stage: 7,
    easyDef: '同時比較三組以上的平均數是否有差異——比跑很多次 t 檢定更嚴謹，不會因為重複比較累積誤判機率。',
    formula: 'F = \\dfrac{MS_{between}}{MS_{within}} = \\dfrac{SSB/(k-1)}{SSW/(N-k)}',
    def: '用來檢定多個母體平均數是否相等（$H_0: \\mu_1 = \\mu_2 = \\cdots = \\mu_k$）。核心思路：把總變異拆成「組間變異」與「組內變異」，計算 F 統計量。（Ch 11）'
  },
  {
    id: 'simple-regression',
    name: '簡單線性迴歸',
    en: 'Simple Linear Regression',
    stage: 7,
    easyDef: '用一條直線描述兩個變數之間的關係——X 每增加 1 單位，Y 平均增加多少。',
    formula: 'y = \\beta_0 + \\beta_1 x + \\varepsilon',
    def: '建立一個自變數 $x$ 與一個應變數 $y$ 的線性模型。$\\beta_0$ 是截距、$\\beta_1$ 是斜率、$\\varepsilon$ 是誤差項。用最小平方法（OLS）估計參數。（Ch 12）'
  },
  {
    id: 'multiple-regression',
    name: '多元迴歸',
    en: 'Multiple Regression',
    stage: 7,
    easyDef: '用多個變數同時預測一個結果——比簡單迴歸更強大，但也需要更嚴格的假設檢查。',
    formula: 'y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\cdots + \\beta_k x_k + \\varepsilon',
    def: '納入多個自變數的迴歸模型。每個 $\\beta_i$ 是「控制其他變數不變時，$x_i$ 增加 1 單位對 $y$ 的影響」。（Ch 13）'
  },
  {
    id: 'chi-square-test',
    name: '卡方檢定',
    en: 'Chi-Square Test',
    stage: 7,
    easyDef: '專門用來分析類別資料（不是連續數字）的檢定——看「觀察到的次數分配」與「期望的次數分配」差多遠。',
    formula: '\\chi^2 = \\sum \\frac{(O - E)^2}{E}',
    def: '用於適合度檢定與獨立性檢定。$O$ 是觀察次數、$E$ 是期望次數。統計量服從卡方分配，自由度視表格大小而定。（Ch 14）'
  },
  {
    id: 'nonparametric',
    name: '無母數統計',
    en: 'Nonparametric Statistics',
    stage: 7,
    easyDef: '不假設資料來自哪種分配的檢定方法——當樣本太小或資料明顯非常態時，比 t 檢定更安全。',
    def: '不依賴母體分配形狀假設的統計方法。常見例子：Wilcoxon 符號秩檢定、Mann-Whitney U 檢定、Kruskal-Wallis 檢定。（Ch 15）'
  },
];
