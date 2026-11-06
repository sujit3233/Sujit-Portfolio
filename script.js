(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const roles = ['Aspiring Data Scientist', 'Data Analyst', 'Python Developer', 'AI/ML Enthusiast', 'AI & Data Science Engineer'];
  const ease = (a, b, p) => { const t = Math.min(1, Math.max(0, (p - a) / (b - a))); return t * t * (3 - 2 * t); };

  addEventListener('load', () => setTimeout(() => document.body.classList.add('loaded'), reduce ? 0 : 800));

  // rotating titles
  const role = $('#role'); let ri = 0;
  if (!reduce) setInterval(() => { role.classList.add('out'); setTimeout(() => { ri = (ri + 1) % roles.length; role.textContent = roles[ri]; role.classList.remove('out'); }, 400); }, 2600);

  // scroll: progress bar, pinned hero scenes, nav indicator
  const bar = $('#progress'), stage = $('[data-stage]'), s1 = $('#s1'), s2 = $('#s2'), hint = $('#scrollhint');
  const links = $$('#menu a'), ind = $('#ind'), secs = links.map(a => $(a.getAttribute('href')));
  const moveInd = a => { if (!a) { ind.style.width = 0; return; } ind.style.left = a.offsetLeft + 'px'; ind.style.width = a.offsetWidth + 'px'; };
  let ticking = false;
  const update = () => {
    ticking = false;
    const h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    const r = stage.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    stage.style.setProperty('--p', p.toFixed(4));
    const o1 = 1 - ease(.08, .4, p), o2 = ease(.45, .7, p);
    const m = innerWidth > 860;
    s1.style.opacity = o1; s1.style.pointerEvents = o1 < .3 ? 'none' : '';
    s2.style.opacity = o2; s2.style.pointerEvents = o2 < .3 ? 'none' : '';
    s1.style.transform = m ? `translateY(calc(-50% - ${(1 - o1) * 40}px))` : `translateY(${-(1 - o1) * 40}px)`;
    s2.style.transform = m ? `translateY(calc(-50% + ${(1 - o2) * 40}px))` : `translateY(${(1 - o2) * 40}px)`;
    hint.style.opacity = 1 - ease(0, .1, p);
    let cur = null; secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = links[i]; });
    links.forEach(l => l.classList.toggle('on', l === cur)); moveInd(cur);
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); update();

  // mobile menu
  const burger = $('#burger'), menu = $('#menu');
  const toggle = open => { menu.classList.toggle('show', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => toggle(!menu.classList.contains('show')));
  links.forEach(a => a.addEventListener('click', () => toggle(false)));

  // expertise tabs
  const bars = '<svg viewBox="0 0 200 120"><g class="bars"><rect x="14" y="60" width="16" height="50"/><rect x="40" y="40" width="16" height="70"/><rect x="66" y="70" width="16" height="40"/><rect x="92" y="25" width="16" height="85"/><rect x="118" y="50" width="16" height="60"/></g><path class="ln" d="M10 95 C50 80 70 90 100 50 S160 30 192 18"/></svg>';
  const dash = '<svg viewBox="0 0 200 120"><rect x="6" y="6" width="188" height="108" rx="4"/><g class="bars"><rect x="20" y="70" width="12" height="30"/><rect x="38" y="55" width="12" height="45"/><rect x="56" y="62" width="12" height="38"/></g><circle cx="135" cy="50" r="28" stroke="#7c4dff"/><path class="ln" d="M92 100 L184 100 M92 90 L160 90"/></svg>';
  const code = '<pre class="code"><span class="k">import</span> pandas <span class="k">as</span> pd\n\ndf = pd.<span class="f">read_csv</span>(path)\ndf = df.<span class="f">dropna</span>()\nprint(df.<span class="f">describe</span>())</pre>';
  const net = '<svg viewBox="0 0 200 120"><g class="net"><line x1="30" y1="25" x2="100" y2="40"/><line x1="30" y1="25" x2="100" y2="80"/><line x1="30" y1="60" x2="100" y2="40"/><line x1="30" y1="60" x2="100" y2="80"/><line x1="30" y1="95" x2="100" y2="40"/><line x1="30" y1="95" x2="100" y2="80"/><line x1="100" y1="40" x2="170" y2="60"/><line x1="100" y1="80" x2="170" y2="60"/></g><g class="nodes"><circle cx="30" cy="25" r="6"/><circle cx="30" cy="60" r="6"/><circle cx="30" cy="95" r="6"/><circle cx="100" cy="40" r="6"/><circle cx="100" cy="80" r="6"/><circle cx="170" cy="60" r="7"/></g></svg>';
  const venn = '<svg viewBox="0 0 200 120"><circle class="o a" cx="75" cy="60" r="38"/><circle class="o b" cx="125" cy="60" r="38"/><circle class="o c" cx="100" cy="60" r="38"/></svg>';
  const D = [
    { v: bars, d: 'Turning raw data into findings: cleaning it, exploring it and testing simple predictive models.', f: 'Data cleaning, preprocessing, exploratory data analysis, statistical analysis, visualization, predictive analytics, machine learning fundamentals', t: 'Python, Pandas, NumPy, Matplotlib, Scikit-learn', p: 'Practice exercises in my public GitHub repository' },
    { v: dash, d: 'Answering questions with data and presenting the answer clearly.', f: 'Data analysis, SQL queries, interpretation, visualization, dashboards, reporting and insights', t: 'Python, SQL, MySQL, Pandas. Power BI is a learning area.', p: 'SQL and data science practice exercises on GitHub' },
    { v: code, d: 'Writing clear Python and connecting it to databases and everyday tools.', f: 'Core Python, object-oriented programming, functions, data structures, file handling, exception handling, database connectivity, automation basics', t: 'Python, SQL, MySQL, SQLite, Git, GitHub', p: 'MeetMind AI (Python, SQLite)' },
    { v: net, d: 'Understanding how models learn and are evaluated, and running AI locally.', f: 'Supervised and unsupervised learning, regression, classification, model evaluation, neural network and deep learning fundamentals, generative AI, local LLM applications', t: 'Python, Scikit-learn, Ollama, Faster-Whisper. TensorFlow and PyTorch are learning areas.', p: 'MeetMind AI (local LLM through Ollama)' },
    { v: venn, d: 'My degree specialization, where programming, data and intelligence meet.', f: 'Artificial intelligence, data science, machine learning, statistical computing, Python programming, database management, data engineering fundamentals, intelligent application development', t: 'Python, SQL, Scikit-learn, Ollama', p: 'MeetMind AI' }
  ];
  const panel = $('#dpanel'), tabs = $$('.dlist button');
  const show = i => {
    const x = D[i]; $('#dviz').innerHTML = x.v; $('#ddesc').textContent = x.d; $('#dfocus').textContent = x.f; $('#dtools').textContent = x.t; $('#dproj').textContent = x.p;
    tabs.forEach((b, k) => b.setAttribute('aria-selected', k === i));
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
  };
  tabs.forEach((b, i) => b.addEventListener('click', () => show(i)));
  show(0);

  // fine-pointer effects
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    const c = $('#cursor'); let x = 0, y = 0, tx = 0, ty = 0;
    addEventListener('mousemove', e => { tx = e.clientX - 17; ty = e.clientY - 17; });
    (function loop() { x += (tx - x) * .2; y += (ty - y) * .2; c.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
    $$('a,button').forEach(el => { el.addEventListener('mouseenter', () => c.classList.add('big')); el.addEventListener('mouseleave', () => c.classList.remove('big')); });
    $$('.mag').forEach(b => {
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
      b.addEventListener('mouseleave', () => b.style.transform = '');
    });
  }
})();
