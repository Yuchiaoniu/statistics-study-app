(function () {
  const discreteCanvas = document.getElementById('cdf-compare-discrete');
  const continuousCanvas = document.getElementById('cdf-compare-continuous');
  if (!discreteCanvas || !continuousCanvas) return;

  // Discrete: X takes 1, 2, 3, 4 uniformly (PMF = 1/4 each)
  // CDF jumps: 0 → 0.25 → 0.50 → 0.75 → 1.00 at x = 1, 2, 3, 4

  // Continuous: X ~ U(1, 4), CDF F(x) = (x - 1) / 3 for x in [1, 4]

  const xMin = 0, xMax = 5;
  const yMin = 0, yMax = 1.1;

  function drawAxes(ctx, w, h, padL, padR, padT, padB) {
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    ctx.fillStyle = '#a8a29e';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    for (let v = 0; v <= 1; v += 0.25) {
      const y = padT + plotH - (v - yMin) / (yMax - yMin) * plotH;
      ctx.fillText(v.toFixed(2), padL - 4, y + 3);
    }
    ctx.textAlign = 'center';
    for (let v = 0; v <= 5; v++) {
      const x = padL + (v - xMin) / (xMax - xMin) * plotW;
      ctx.fillText(String(v), x, padT + plotH + 14);
    }
  }

  function renderDiscrete() {
    const w = discreteCanvas.width = discreteCanvas.clientWidth;
    const h = discreteCanvas.height = 240;
    const ctx = discreteCanvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const padL = 40, padR = 20, padT = 18, padB = 35;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - (y - yMin) / (yMax - yMin) * plotH; }

    drawAxes(ctx, w, h, padL, padR, padT, padB);

    const steps = [
      { x: 0, y: 0, until: 1 },
      { x: 1, y: 0.25, until: 2 },
      { x: 2, y: 0.50, until: 3 },
      { x: 3, y: 0.75, until: 4 },
      { x: 4, y: 1.00, until: 5 }
    ];

    // Step segments
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (const s of steps) {
      ctx.moveTo(px(s.x), py(s.y));
      ctx.lineTo(px(s.until), py(s.y));
    }
    ctx.stroke();

    // Jump dashed lines + dots at jump points
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    for (let i = 1; i < steps.length; i++) {
      const prev = steps[i - 1];
      const cur = steps[i];
      ctx.beginPath();
      ctx.moveTo(px(cur.x), py(prev.y));
      ctx.lineTo(px(cur.x), py(cur.y));
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Dots: open circle at left-limit, filled at right-jump
    for (let i = 1; i < steps.length; i++) {
      const prev = steps[i - 1];
      const cur = steps[i];

      // open circle (left limit, not included)
      ctx.fillStyle = '#1f1b17';
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px(cur.x), py(prev.y), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // filled circle (jump value)
      ctx.fillStyle = '#fb923c';
      ctx.beginPath();
      ctx.arc(px(cur.x), py(cur.y), 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Label
    ctx.fillStyle = '#fcd34d';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('離散 CDF：階梯函數，有跳點', padL + 4, padT + 12);
  }

  function renderContinuous() {
    const w = continuousCanvas.width = continuousCanvas.clientWidth;
    const h = continuousCanvas.height = 240;
    const ctx = continuousCanvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    const padL = 40, padR = 20, padT = 18, padB = 35;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    function px(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function py(y) { return padT + plotH - (y - yMin) / (yMax - yMin) * plotH; }

    drawAxes(ctx, w, h, padL, padR, padT, padB);

    ctx.strokeStyle = '#a3e635';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // F(x) = 0 for x < 1
    ctx.moveTo(px(0), py(0));
    ctx.lineTo(px(1), py(0));
    // F(x) = (x - 1) / 3 for 1 <= x <= 4
    for (let x = 1; x <= 4; x += 0.05) {
      ctx.lineTo(px(x), py((x - 1) / 3));
    }
    // F(x) = 1 for x > 4
    ctx.lineTo(px(4), py(1));
    ctx.lineTo(px(5), py(1));
    ctx.stroke();

    ctx.fillStyle = '#a3e635';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('連續 CDF：平滑曲線，無跳點', padL + 4, padT + 12);
  }

  function render() { renderDiscrete(); renderContinuous(); }

  window.addEventListener('resize', render);
  render();
})();
