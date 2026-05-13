(function () {
  const canvas = document.getElementById('transition-viz-canvas');
  if (!canvas) return;

  const STEP_LABEL = document.getElementById('transition-step-label');
  const N_LABEL = document.getElementById('transition-n-label');
  const BTN_FINER = document.getElementById('transition-finer');
  const BTN_RESET = document.getElementById('transition-reset');

  const xMin = -3, xMax = 3;
  const SQRT_2PI = Math.sqrt(2 * Math.PI);
  function pdf(x) { return Math.exp(-0.5 * x * x) / SQRT_2PI; }

  let numBars = 6;

  function render() {
    const w = canvas.width = canvas.clientWidth;
    const h = canvas.height = 260;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const padL = 30, padR = 20, padT = 20, padB = 35;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const samples = 400;
    const xs = Array.from({ length: samples }, (_, i) => xMin + (xMax - xMin) * i / (samples - 1));
    const ys = xs.map(pdf);
    const yMax = Math.max(...ys) * 1.15;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - y / yMax * plotH; }

    // x-axis
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    const isSmooth = numBars >= 128;

    if (!isSmooth) {
      // Histogram bars
      const barWidth = (xMax - xMin) / numBars;
      for (let i = 0; i < numBars; i++) {
        const left = xMin + i * barWidth;
        const center = left + barWidth / 2;
        const barHeight = pdf(center);

        const x1 = px(left);
        const x2 = px(left + barWidth);
        const yTop = py(barHeight);
        const yBot = py(0);

        ctx.fillStyle = 'rgba(251, 146, 60, 0.35)';
        ctx.fillRect(x1 + 0.5, yTop, Math.max(0, x2 - x1 - 1), yBot - yTop);

        ctx.strokeStyle = '#fb923c';
        ctx.lineWidth = 1;
        ctx.strokeRect(x1 + 0.5, yTop, Math.max(0, x2 - x1 - 1), yBot - yTop);
      }
    } else {
      // Smooth curve
      ctx.fillStyle = 'rgba(251, 146, 60, 0.30)';
      ctx.beginPath();
      ctx.moveTo(px(xs[0]), py(0));
      for (let i = 0; i < xs.length; i++) {
        ctx.lineTo(px(xs[i]), py(ys[i]));
      }
      ctx.lineTo(px(xs[xs.length - 1]), py(0));
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < xs.length; i++) {
        const X = px(xs[i]), Y = py(ys[i]);
        if (i === 0) ctx.moveTo(X, Y);
        else ctx.lineTo(X, Y);
      }
      ctx.stroke();
    }

    // Reference smooth curve (always drawn as overlay)
    if (!isSmooth) {
      ctx.strokeStyle = 'rgba(163, 230, 53, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (let i = 0; i < xs.length; i++) {
        const X = px(xs[i]), Y = py(ys[i]);
        if (i === 0) ctx.moveTo(X, Y);
        else ctx.lineTo(X, Y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // x-axis labels
    ctx.fillStyle = '#a8a29e';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let v = -3; v <= 3; v++) {
      ctx.fillText(String(v), px(v), padT + plotH + 16);
    }

    // Update labels
    N_LABEL.textContent = isSmooth ? '∞（連續曲線）' : String(numBars);
    if (isSmooth) {
      STEP_LABEL.innerHTML = '$\\int f(x)\\,dx$（積分）';
    } else {
      STEP_LABEL.innerHTML = `$\\sum_{i=1}^{${numBars}} f(x_i)\\,\\Delta x$（離散加總）`;
    }
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([STEP_LABEL]);
    }

    BTN_FINER.disabled = isSmooth;
  }

  BTN_FINER.addEventListener('click', () => {
    if (numBars >= 128) return;
    numBars *= 2;
    render();
  });

  BTN_RESET.addEventListener('click', () => {
    numBars = 6;
    render();
  });

  window.addEventListener('resize', render);
  render();
})();
