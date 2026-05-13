const SQRT_2PI = Math.sqrt(2 * Math.PI);

const DISTRIBUTIONS = {
  uniform: {
    name: '均勻分配 U(a, b)',
    params: [
      { key: 'a', label: 'a (下界)', min: -10, max: 10, step: 0.1, default: 0 },
      { key: 'b', label: 'b (上界)', min: -10, max: 10, step: 0.1, default: 10 }
    ],
    xRange: ({ a, b }) => [Math.min(a, b) - 1, Math.max(a, b) + 1],
    pdf: (x, { a, b }) => {
      const lo = Math.min(a, b), hi = Math.max(a, b);
      if (hi === lo) return 0;
      return (x >= lo && x <= hi) ? 1 / (hi - lo) : 0;
    },
    cdf: (x, { a, b }) => {
      const lo = Math.min(a, b), hi = Math.max(a, b);
      if (x < lo) return 0;
      if (x > hi) return 1;
      return (x - lo) / (hi - lo);
    },
    mean: ({ a, b }) => (a + b) / 2,
    variance: ({ a, b }) => Math.pow(b - a, 2) / 12
  },
  normal: {
    name: '常態分配 N(μ, σ²)',
    params: [
      { key: 'mu', label: 'μ (平均)', min: -10, max: 10, step: 0.1, default: 0 },
      { key: 'sigma', label: 'σ (標準差)', min: 0.1, max: 5, step: 0.1, default: 1 }
    ],
    xRange: ({ mu, sigma }) => [mu - 4 * sigma, mu + 4 * sigma],
    pdf: (x, { mu, sigma }) => {
      const z = (x - mu) / sigma;
      return Math.exp(-0.5 * z * z) / (sigma * SQRT_2PI);
    },
    cdf: (x, { mu, sigma }) => 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2))),
    mean: ({ mu }) => mu,
    variance: ({ sigma }) => sigma * sigma
  },
  exponential: {
    name: '指數分配 Exp(λ)',
    params: [
      { key: 'lambda', label: 'λ (速率)', min: 0.05, max: 3, step: 0.05, default: 1 }
    ],
    xRange: ({ lambda }) => [0, Math.max(5, 5 / lambda)],
    pdf: (x, { lambda }) => x < 0 ? 0 : lambda * Math.exp(-lambda * x),
    cdf: (x, { lambda }) => x < 0 ? 0 : 1 - Math.exp(-lambda * x),
    mean: ({ lambda }) => 1 / lambda,
    variance: ({ lambda }) => 1 / (lambda * lambda)
  }
};

function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
  return sign * y;
}

function createChartPanel({ container, distribution, onChange }) {
  const dist = DISTRIBUTIONS[distribution];
  if (!dist) throw new Error('unknown distribution: ' + distribution);

  const state = {};
  dist.params.forEach(p => state[p.key] = p.default);

  container.innerHTML = `
    <div class="controls">
      ${dist.params.map(p => `
        <div class="control">
          <label>${p.label}: <span class="value" data-value="${p.key}">${p.default}</span></label>
          <input type="range" data-param="${p.key}"
            min="${p.min}" max="${p.max}" step="${p.step}" value="${p.default}">
        </div>
      `).join('')}
    </div>
    <div class="chart-panel">
      <div class="chart-box">
        <h4>PDF（機率密度函數）</h4>
        <canvas class="pdf-canvas" height="200"></canvas>
      </div>
      <div class="chart-box">
        <h4>CDF（累積分配函數）</h4>
        <canvas class="cdf-canvas" height="200"></canvas>
      </div>
    </div>
    <div class="stats-display">
      <div class="stat"><div class="stat-label">E(X)</div><div class="stat-value" data-stat="mean">-</div></div>
      <div class="stat"><div class="stat-label">Var(X)</div><div class="stat-value" data-stat="variance">-</div></div>
      <div class="stat"><div class="stat-label">σ (SD)</div><div class="stat-value" data-stat="sd">-</div></div>
    </div>
    <div class="range-query">
      <div class="inputs">
        <span>P(</span>
        <input type="number" step="0.1" class="range-a" value="0">
        <span>≤ X ≤</span>
        <input type="number" step="0.1" class="range-b" value="1">
        <span>) =</span>
        <span class="result" data-range-result>-</span>
      </div>
    </div>
  `;

  const pdfCanvas = container.querySelector('.pdf-canvas');
  const cdfCanvas = container.querySelector('.cdf-canvas');
  const pdfCtx = pdfCanvas.getContext('2d');
  const cdfCtx = cdfCanvas.getContext('2d');

  function resizeCanvas(c) {
    c.width = c.clientWidth;
  }

  container.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', () => {
      state[input.dataset.param] = parseFloat(input.value);
      container.querySelector(`[data-value="${input.dataset.param}"]`).textContent = parseFloat(input.value).toFixed(2);
      render();
    });
  });

  const rangeA = container.querySelector('.range-a');
  const rangeB = container.querySelector('.range-b');
  rangeA.addEventListener('input', updateRange);
  rangeB.addEventListener('input', updateRange);

  function updateRange() {
    const a = parseFloat(rangeA.value);
    const b = parseFloat(rangeB.value);
    if (isNaN(a) || isNaN(b)) return;
    const p = Math.max(0, Math.min(1, dist.cdf(Math.max(a, b), state) - dist.cdf(Math.min(a, b), state)));
    container.querySelector('[data-range-result]').textContent = p.toFixed(4);
    render();
  }

  function render() {
    resizeCanvas(pdfCanvas);
    resizeCanvas(cdfCanvas);
    const [xMin, xMax] = dist.xRange(state);
    const samples = 200;
    const xs = Array.from({ length: samples }, (_, i) => xMin + (xMax - xMin) * i / (samples - 1));
    const pdfs = xs.map(x => dist.pdf(x, state));
    const cdfs = xs.map(x => dist.cdf(x, state));

    drawCurve(pdfCtx, pdfCanvas, xs, pdfs, '#fb923c', { fillBelow: true, shadeRange: getShadeRange() });
    drawCurve(cdfCtx, cdfCanvas, xs, cdfs, '#a3e635', { yMin: 0, yMax: 1 });

    const mean = dist.mean(state);
    const variance = dist.variance(state);
    container.querySelector('[data-stat="mean"]').textContent = mean.toFixed(3);
    container.querySelector('[data-stat="variance"]').textContent = variance.toFixed(3);
    container.querySelector('[data-stat="sd"]').textContent = Math.sqrt(variance).toFixed(3);

    updateRange();
    if (onChange) onChange(state);
  }

  function getShadeRange() {
    const a = parseFloat(rangeA.value);
    const b = parseFloat(rangeB.value);
    if (isNaN(a) || isNaN(b)) return null;
    return [Math.min(a, b), Math.max(a, b)];
  }

  function drawCurve(ctx, canvas, xs, ys, color, opts = {}) {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const xMin = xs[0], xMax = xs[xs.length - 1];
    const yMin = opts.yMin !== undefined ? opts.yMin : 0;
    const yMax = opts.yMax !== undefined ? opts.yMax : Math.max(...ys) * 1.1 || 1;

    const padL = 35, padR = 10, padT = 10, padB = 25;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - (y - yMin) / (yMax - yMin) * plotH; }

    ctx.strokeStyle = '#78716c';
    ctx.fillStyle = '#a8a29e';
    ctx.font = '10px sans-serif';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    for (let i = 0; i <= 4; i++) {
      const yv = yMin + (yMax - yMin) * i / 4;
      ctx.fillText(yv.toFixed(2), 2, py(yv) + 3);
    }
    for (let i = 0; i <= 4; i++) {
      const xv = xMin + (xMax - xMin) * i / 4;
      ctx.fillText(xv.toFixed(1), px(xv) - 10, h - 8);
    }

    if (opts.shadeRange) {
      const [sa, sb] = opts.shadeRange;
      ctx.fillStyle = 'rgba(251, 146, 60, 0.25)';
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < xs.length; i++) {
        if (xs[i] < sa || xs[i] > sb) continue;
        if (!started) {
          ctx.moveTo(px(xs[i]), py(0));
          started = true;
        }
        ctx.lineTo(px(xs[i]), py(ys[i]));
      }
      if (started) {
        const lastX = Math.min(sb, xs[xs.length - 1]);
        ctx.lineTo(px(lastX), py(0));
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < xs.length; i++) {
      const x = px(xs[i]), y = py(ys[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  window.addEventListener('resize', render);
  render();

  return { state, render };
}

window.createChartPanel = createChartPanel;
window.DISTRIBUTIONS = DISTRIBUTIONS;
