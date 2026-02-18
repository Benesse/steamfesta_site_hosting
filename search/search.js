async function loadIndex() {
  const res = await fetch('/search/index.json');
  return res.json();
}

function getQuery() {
  const params = new URLSearchParams(location.search);
  return (params.get('q') || params.get('s') || '').trim();
}

function scoreItem(item, terms) {
  let score = 0;
  const hayTitle = (item.title || '').toLowerCase();
  const hayText = (item.text || '').toLowerCase();
  for (const t of terms) {
    if (hayTitle.includes(t)) score += 3;
    if (hayText.includes(t)) score += 1;
  }
  return score;
}

function renderResults(results, q) {
  const list = document.getElementById('search-results');
  const meta = document.getElementById('search-meta');
  list.innerHTML = '';
  meta.textContent = q ? (results.length + ' 件') : '';
  for (const item of results) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title || item.url;
    const p = document.createElement('p');
    p.textContent = item.snippet;
    li.appendChild(a);
    li.appendChild(p);
    list.appendChild(li);
  }
}

(async () => {
  const q = getQuery();
  const input = document.getElementById('q');
  input.value = q;
  if (!q) return;
  const terms = q.toLowerCase().split(/s+/).filter(Boolean);
  const items = await loadIndex();
  const scored = items
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((x) => x.item);
  renderResults(scored, q);
})();
