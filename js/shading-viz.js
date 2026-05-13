(function () {
  const canvas = document.getElementById('shading-viz-canvas');
  if (!canvas) return;

  const FORMULA_EL = document.getElementById('shading-formula');
  const buttons = document.querySelectorAll('.shading-btn');

  let mode = 'middle'; // middle | left | right

  const xMin = -3.5, xMax = 3.5;
  const SQRT_2PI = Math.sqrt(2 * Math.PI);
  function pdf(x) { return Math.exp(-0.5 * x * x) / SQRT_2PI; }

  // Fixed boundaries for the demo
  const A = -1, B = 1;

  function render() {
    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = 240;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const padL = 30, padR = 20, padT = 22, padB = 35;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const samples = 300;
    const xs = Array.from({ length: samples }, (_, i) => xMin + (xMax - xMin) * i / (samples - 1));
    const ys = xs.map(pdf);
    const yMax = Math.max(...ys) * 1.35;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - y / yMax * plotH; }

    // x-axis
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // Determine shade range
    let shadeLo, shadeHi, label;
    if (mode === 'middle') {
      shadeLo = A; shadeHi = B;
      label = '中段：P(a ≤ X ≤ b)';
    } else if (mode === 'left') {
      shadeLo = xMin; shadeHi = B;
      label = '左尾：P(X ≤ b)';
    } else {
      shadeLo = A; shadeHi = xMax;
      label = '右尾：P(X ≥ a)';
    }

    // Shaded area
    ctx.fillStyle = 'rgba(251, 146, 60, 0.45)';
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < xs.length; i++) {
      if (xs[i] < shadeLo || xs[i] > shadeHi) continue;
      if (!started) { ctx.moveTo(px(xs[i]), py(0)); started = true; }
      ctx.lineTo(px(xs[i]), py(ys[i]));
    }
    if (started) {
      ctx.lineTo(px(Math.min(shadeHi, xs[xs.length - 1])), py(0));
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

    // Vertical dashed boundaries
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    const bounds = (mode === 'middle') ? [A, B] : (mode === 'left' ? [B] : [A]);
    bounds.forEach(v => {
      ctx.beginPath();
      ctx.moveTo(px(v), py(0));
      ctx.lineTo(px(v), padT + 5);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Boundary labels
    ctx.fillStyle = '#fcd34d';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    if (mode === 'middle') {
      ctx.fillText('a', px(A), padT + plotH + 18);
      ctx.fillText('b', px(B), padT + plotH + 18);
    } else if (mode === 'left') {
      ctx.fillText('b', px(B), padT + plotH + 18);
    } else {
      ctx.fillText('a', px(A), padT + plotH + 18);
    }

    // x-axis values
    ctx.fillStyle = '#a8a29e';
    ctx.font = '11px sans-serif';
    [-3, -2, -1, 0, 1, 2, 3].forEach(v => {
      ctx.fillText(String(v), px(v), padT + plotH + 32);
    });

    // Title label
    ctx.fillStyle = '#fb923c';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, padL + 4, padT + 14);

    // Update formula text
    const formulas = {
      middle: 'P(a \\le X \\le b) = F(b) - F(a)',
      left: 'P(X \\le b) = F(b)',
      right: 'P(X \\ge a) = 1 - F(a)'
    };
    FORMULA_EL.innerHTML = `$$${formulas[mode]}$$`;
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([FORMULA_EL]);
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      render();
    });
  });

  window.addEventListener('resize', render);
  render();
})();
