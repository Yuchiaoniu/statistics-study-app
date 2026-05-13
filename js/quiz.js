let questionCache = null;

async function loadAllQuestions(dataPath) {
  if (questionCache) return questionCache;
  const res = await fetch(dataPath);
  if (!res.ok) throw new Error(`fetch ${dataPath} → ${res.status}`);
  questionCache = await res.json();
  return questionCache;
}

async function loadQuiz(concept, containerId, dataPath = '../data/questions.json') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '<p>載入題目中...</p>';

  try {
    const all = await loadAllQuestions(dataPath);
    const questions = all.filter(q => q.concept === concept);
    if (questions.length === 0) {
      container.innerHTML = '<p>這個觀念還沒有題目。</p>';
      return;
    }
    container.innerHTML = '';
    questions.forEach((q, idx) => container.appendChild(renderQuestion(q, idx + 1)));
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([container]);
    }
  } catch (e) {
    container.innerHTML = `<p style="color:var(--danger)">題目載入失敗：${e.message}</p>`;
  }
}

function renderQuestion(q, num) {
  const wrap = document.createElement('div');
  wrap.className = 'question';
  wrap.dataset.qid = q.id;

  const prompt = document.createElement('div');
  prompt.className = 'prompt';
  prompt.innerHTML = `<strong>Q${num}.</strong> ${escapeHtml(q.prompt)}`;
  wrap.appendChild(prompt);

  const opts = document.createElement('div');
  opts.className = 'options';
  q.options.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.type = 'button';
    btn.textContent = `${String.fromCharCode(65 + i)}. ${text}`;
    btn.addEventListener('click', () => judgeAnswer(q, i, wrap));
    opts.appendChild(btn);
  });
  wrap.appendChild(opts);

  const exp = document.createElement('div');
  exp.className = 'explanation';
  wrap.appendChild(exp);

  return wrap;
}

function judgeAnswer(question, selectedIndex, wrap) {
  const buttons = wrap.querySelectorAll('.option');
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIndex === question.correct_index;
  buttons.forEach((b, i) => {
    if (i === question.correct_index) b.classList.add('correct');
    else if (i === selectedIndex) b.classList.add('wrong');
  });

  const exp = wrap.querySelector('.explanation');
  const prefix = isCorrect ? '✅ 答對！' : '❌ 答錯了';
  exp.innerHTML = `<strong>${prefix}</strong><br>${escapeHtml(question.explanation)}`;
  exp.classList.add('show');

  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([exp]);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

window.loadQuiz = loadQuiz;
