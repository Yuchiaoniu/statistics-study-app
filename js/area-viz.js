(function () {
  const canvas = document.getElementById('area-viz-canvas');
  if (!canvas) return;

  const A_INPUT = document.getElementById('area-a');
  const B_INPUT = document.getElementById('area-b');
  const RESULT = document.getElementById('area-result');

  const xMin = -3.5, xMax = 3.5;
  const SQRT_2PI = Math.sqrt(2 * Math.PI);
  function pdf(x) { return Math.exp(-0.5 * x * x) / SQRT_2PI; }
  function erf(x) {
    const sign = x < 0 ? -1 : 1;
    const ax = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * ax);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
    return sign * y;
  }
  function cdf(x) { return 0.5 * (1 + erf(x / Math.SQRT2)); }

  function render() {
    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = 280;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const samples = 300;
    const xs = Array.from({ length: samples }, (_, i) => xMin + (xMax - xMin) * i / (samples - 1));
    const ys = xs.map(pdf);
    const yMax = Math.max(...ys) * 1.45;

    const padL = 40, padR = 20, padT = 30, padB = 50;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - y / yMax * plotH; }

    let a = parseFloat(A_INPUT.value);
    let b = parseFloat(B_INPUT.value);
    if (isNaN(a)) a = -0.7;
    if (isNaN(b)) b = 1.2;
    const lo = Math.min(a, b), hi = Math.max(a, b);

    // x-axis
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // Shaded area under curve in [a, b]
    ctx.fillStyle = 'rgba(251, 146, 60, 0.40)';
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < xs.length; i++) {
      if (xs[i] < lo || xs[i] > hi) continue;
      if (!started) { ctx.moveTo(px(xs[i]), py(0)); started = true; }
      ctx.lineTo(px(xs[i]), py(ys[i]));
    }
    if (started) {
      const lastX = Math.min(hi, xs[xs.length - 1]);
      ctx.lineTo(px(lastX), py(0));
      ctx.closePath();
      ctx.fill();
    }

    // PDF curve
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < xs.length; i++) {
      const X = px(xs[i]), Y = py(ys[i]);
      if (i === 0) ctx.moveTo(X, Y);
      else ctx.lineTo(X, Y);
    }
    ctx.stroke();

    // Vertical dashed lines at a and b
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    [lo, hi].forEach(v => {
      ctx.beginPath();
      ctx.moveTo(px(v), py(0));
      ctx.lineTo(px(v), padT + 5);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // a / b labels
    ctx.fillStyle = '#fcd34d';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('a', px(lo), padT + plotH + 20);
    ctx.fillText('b', px(hi), padT + plotH + 20);

    // f(x) label near peak
    ctx.fillStyle = '#fb923c';
    ctx.font = 'italic bold 18px serif';
    ctx.textAlign = 'left';
    const labelX = 1.4;
    ctx.fillText('f(x)', px(labelX) + 4, py(pdf(labelX)) - 6);

    // Shaded-area label
    const midX = (lo + hi) / 2;
    const midY = pdf(midX) * 0.45;
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('陰影面積 = P(a ≤ X ≤ b)', px(midX), py(midY));

    // x-axis label
    ctx.fillStyle = '#a8a29e';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('x', padL + plotW, padT + plotH + 38);

    // Update probability result
    const p = Math.max(0, Math.min(1, cdf(hi) - cdf(lo)));
    RESULT.textContent = p.toFixed(4);
  }

  A_INPUT.addEventListener('input', render);
  B_INPUT.addEventListener('input', render);
  window.addEventListener('resize', render);
  render();
})();
