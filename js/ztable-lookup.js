(function () {
  const canvas = document.getElementById('ztable-canvas');
  if (!canvas) return;

  const Z_INPUT = document.getElementById('ztable-z');
  const RESULT_VALUE = document.getElementById('ztable-result-value');
  const RESULT_FORMULA = document.getElementById('ztable-result-formula');
  const MODE_BUTTONS = document.querySelectorAll('.ztable-mode-btn');

  let mode = 'half'; // half | left | right | middle

  const xMin = -4, xMax = 4;
  const SQRT_2PI = Math.sqrt(2 * Math.PI);
  function pdf(x) { return Math.exp(-0.5 * x * x) / SQRT_2PI; }

  function erf(x) {
    const sign = x < 0 ? -1 : 1;
    const ax = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * ax);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
    return sign * y;
  }
  function phiCdf(x) { return 0.5 * (1 + erf(x / Math.SQRT2)); }

  function compute(z) {
    const halfArea = phiCdf(Math.abs(z)) - 0.5;
    switch (mode) {
      case 'half':
        return { p: halfArea, lo: 0, hi: Math.abs(z), formula: `P(0 \\le Z \\le ${z}) = ${halfArea.toFixed(4)}` };
      case 'left':
        return { p: phiCdf(z), lo: xMin, hi: z, formula: `P(Z \\le ${z}) = ${phiCdf(z).toFixed(4)}` };
      case 'right':
        return { p: 1 - phiCdf(z), lo: z, hi: xMax, formula: `P(Z \\ge ${z}) = ${(1 - phiCdf(z)).toFixed(4)}` };
      case 'middle':
        const absZ = Math.abs(z);
        return { p: 2 * halfArea, lo: -absZ, hi: absZ, formula: `P(-${absZ} \\le Z \\le ${absZ}) = ${(2 * halfArea).toFixed(4)}` };
    }
  }

  function render() {
    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = 220;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const padL = 30, padR = 20, padT = 18, padB = 30;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const samples = 300;
    const xs = Array.from({ length: samples }, (_, i) => xMin + (xMax - xMin) * i / (samples - 1));
    const ys = xs.map(pdf);
    const yMax = Math.max(...ys) * 1.3;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - y / yMax * plotH; }

    // x-axis
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    const z = parseFloat(Z_INPUT.value);
    const valid = !isNaN(z) && z >= xMin && z <= xMax;

    if (valid) {
      const { p, lo, hi, formula } = compute(z);

      // Shaded area
      ctx.fillStyle = 'rgba(251, 146, 60, 0.45)';
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < xs.length; i++) {
        if (xs[i] < lo || xs[i] > hi) continue;
        if (!started) { ctx.moveTo(px(xs[i]), py(0)); started = true; }
        ctx.lineTo(px(xs[i]), py(ys[i]));
      }
      if (started) {
        ctx.lineTo(px(Math.min(hi, xs[xs.length - 1])), py(0));
        ctx.closePath();
        ctx.fill();
      }

      // Update result text
      RESULT_VALUE.textContent = p.toFixed(4);
      RESULT_FORMULA.innerHTML = `$$${formula}$$`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([RESULT_FORMULA]);
      }
    } else {
      RESULT_VALUE.textContent = '—';
      RESULT_FORMULA.textContent = '請輸入有效的 z 值（-4 到 4）';
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

    // x-axis labels
    ctx.fillStyle = '#a8a29e';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    [-3, -2, -1, 0, 1, 2, 3].forEach(v => {
      ctx.fillText(String(v), px(v), padT + plotH + 16);
    });

    // Z value marker
    if (valid) {
      const zVal = parseFloat(Z_INPUT.value);
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px(zVal), py(0));
      ctx.lineTo(px(zVal), padT + 4);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fcd34d';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`z=${zVal}`, px(zVal), padT - 2);
    }
  }

  Z_INPUT.addEventListener('input', render);
  MODE_BUTTONS.forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      MODE_BUTTONS.forEach(b => b.classList.toggle('active', b === btn));
      render();
    });
  });
  window.addEventListener('resize', render);
  render();
})();
