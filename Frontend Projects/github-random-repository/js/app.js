// -------------------------------
// Constants
// -------------------------------
const SEARCH_URL = "https://api.github.com/search/repositories";
const PER_PAGE = 1;
const SEARCH_CAP = 1000;

// -------------------------------
// DOM
// -------------------------------
const els = {
  languageSelect: document.getElementById("languageSelect"),

  emptyState: document.getElementById("emptyState"),
  loadingState: document.getElementById("loadingState"),
  errorState: document.getElementById("errorState"),
  successState: document.getElementById("successState"),
  errorMessage: document.getElementById("errorMessage"),

  retryBtn: document.getElementById("retryBtn"),
  refreshBtn: document.getElementById("refreshBtn"),

  repoName: document.getElementById("repoName"),
  repoDescription: document.getElementById("repoDescription"),
  repoStars: document.getElementById("repoStars"),
  repoForks: document.getElementById("repoForks"),
  repoIssues: document.getElementById("repoIssues"),
  langDot: document.getElementById("langDot"),
  langLabel: document.getElementById("langLabel"),
};

// -------------------------------
// State management (show one state at a time)
// -------------------------------
function showState(key) {
  const map = {
    empty: els.emptyState,
    loading: els.loadingState,
    error: els.errorState,
    success: els.successState,
  };
  for (const k of Object.keys(map)) {
    map[k].classList.toggle("state--hidden", k !== key);
  }
  // Buttons per wireframe: only show Refresh in success, Retry in error
  els.refreshBtn?.classList.toggle("state--hidden", key !== "success");
  els.retryBtn?.classList.toggle("state--hidden", key !== "error");
}

// -------------------------------
// Query helpers
// -------------------------------
function buildQuery(language) {
  // Filter out archived repos and ones with 0 stars for better quality.
  const q = `language:${JSON.stringify(language)} stars:>0 -archived:true`;
  const params = new URLSearchParams({ q, per_page: String(PER_PAGE) });
  return `${SEARCH_URL}?${params.toString()}`;
}

async function ghFetch(url, { signal } = {}) {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      if (data && data.message) detail = ` – ${data.message}`;
    } catch {}
    throw new Error(`HTTP ${res.status}${detail}`);
  }
  return res.json();
}

async function getTotal(language, signal) {
  const url = buildQuery(language);
  const data = await ghFetch(url, { signal });
  return data.total_count || 0;
}

async function getRandomRepo(language, signal) {
  const total = await getTotal(language, signal);
  const capped = Math.min(total, SEARCH_CAP);
  if (capped <= 0) return null;

  const randomIndex = Math.floor(Math.random() * capped);
  const page = randomIndex + 1;

  const q = `language:${JSON.stringify(language)} stars:>0 -archived:true`;
  const params = new URLSearchParams({
    q,
    per_page: "1",
    page: String(page),
  });
  const url = `${SEARCH_URL}?${params.toString()}`;
  const data = await ghFetch(url, { signal });
  return (data.items && data.items[0]) || null;
}

function format(n) {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
}

// -------------------------------
/* UI binding */
// -------------------------------
let currentAbort = null;
function abortInFlight() {
  if (currentAbort) currentAbort.abort();
  currentAbort = new AbortController();
  return currentAbort.signal;
}

async function findRandom() {
  const language = els.languageSelect.value;
  if (!language) {
    showState("empty");
    return;
  }

  const signal = abortInFlight();
  showState("loading");

  try {
    const repo = await getRandomRepo(language, signal);
    if (!repo) {
      // Nothing found for that language
      els.errorMessage.textContent = "No repositories found. Try another language.";
      showState("error");
      return;
    }

    // Fill the card
    const safeName = repo.full_name || repo.name || "Unknown Repository";
    const href = repo.html_url || "#";

    els.repoName.innerHTML = `${href}${safeName}</a>`;
    els.repoDescription.textContent = repo.description || "No description.";

    els.repoStars.textContent = format(repo.stargazers_count || 0);
    els.repoForks.textContent = format(repo.forks_count || 0);
    els.repoIssues.textContent = format(repo.open_issues_count || 0);

    const lang = repo.language || els.languageSelect.value || "";
    els.langLabel.textContent = lang || "—";
    const color = (window.LANGUAGE_COLORS && window.LANGUAGE_COLORS[lang]) || "#9ca3af";
    els.langDot.style.background = color;

    showState("success");
  } catch (err) {
    const msg = err?.message || "Unexpected error.";
    els.errorMessage.textContent = "Error fetching repositories";
    // Optional: append detail quietly to console for debugging
    console.error("[GitHub Finder]", msg);
    showState("error");
  } finally {
    currentAbort = null;
  }
}

// Auto-fetch when a language is selected
els.languageSelect.addEventListener("change", findRandom);

// Error retry & success refresh
els.retryBtn.addEventListener("click", findRandom);
els.refreshBtn.addEventListener("click", findRandom);

// Initial state (matches wireframe)
showState("empty");