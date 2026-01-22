// DailyStream - News Aggregator
// Uses NewsAPI.org. Add your API key below.
// Beginner-friendly, modern ES6+ code with comments.

const API_KEY = "9c4d0c6ed2e442dd81814039dee7f776"; // <-- Replace with your key
const COUNTRY = "us"; // Default country for top headlines
const BASE_URL = "https://newsapi.org/v2";

// DOM Elements
const newsGrid = document.getElementById("newsGrid");
const loader = document.getElementById("loader");
const errorAlert = document.getElementById("errorAlert");
const yearEl = document.getElementById("year");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const navMenu = document.getElementById("navMenu");
const navbarToggler = document.querySelector(".navbar-toggler");

// State
let currentCategory = "general";
let currentQuery = "";

// Utils
const show = (el) => el.classList.remove("d-none");
const hide = (el) => el.classList.add("d-none");

function setActiveCategory(targetCategory) {
  categoryButtons.forEach((btn) => {
    if (btn.dataset.category === targetCategory) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function truncate(text = "", max = 140) {
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function createCard(article) {
  const {
    title = "Untitled",
    description = "",
    url = "#",
    urlToImage,
    source = {},
  } = article;

  const img = urlToImage ||
    "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1600&auto=format&fit=crop";

  const sourceName = source?.name || "Unknown Source";

  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4";
  col.innerHTML = `
    <div class="card news-card h-100">
      <img src="${img}" class="card-img-top" alt="Article image" onerror="this.src='https://placehold.co/800x450?text=No+Image'"/>
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
          <h5 class="card-title flex-grow-1">${title}</h5>
          <span class="badge badge-source">${sourceName}</span>
        </div>
        <p class="card-text">${truncate(description || "No summary available.", 180)}</p>
        <div class="mt-auto d-flex justify-content-end">
          <a class="btn btn-primary btn-read" href="${url}" target="_blank" rel="noopener noreferrer">
            Read More <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  `;
  return col;
}

function renderArticles(articles) {
  newsGrid.innerHTML = "";
  if (!articles || articles.length === 0) {
    newsGrid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info">No articles found. Try a different category or search term.</div>
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  articles.forEach((a) => frag.appendChild(createCard(a)));
  newsGrid.appendChild(frag);
}

function showError(message) {
  errorAlert.textContent = message;
  errorAlert.classList.remove("d-none");
}

function clearError() {
  errorAlert.classList.add("d-none");
  errorAlert.textContent = "";
}

async function fetchNews({ category = currentCategory, query = currentQuery } = {}) {
  // Build the endpoint. Prefer top-headlines with category and optional q.
  const params = new URLSearchParams({
    apiKey: API_KEY,
    country: COUNTRY,
  });
  if (category && category !== "general") params.set("category", category);
  if (query) params.set("q", query);

  const url = `${BASE_URL}/top-headlines?${params.toString()}`;

  // UI state
  clearError();
  show(loader);
  newsGrid.setAttribute("aria-busy", "true");

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    const data = await res.json();

    if (data.status !== "ok") {
      throw new Error(data.message || "Failed to fetch news.");
    }

    renderArticles(data.articles || []);
  } catch (err) {
    console.error(err);
    showError(err.message || "Something went wrong while loading news.");
  } finally {
    hide(loader);
    newsGrid.removeAttribute("aria-busy");
  }
}

function handleCategoryClick(e) {
  const btn = e.currentTarget;
  const newCategory = btn.dataset.category;
  if (!newCategory) return;
  currentCategory = newCategory;
  currentQuery = ""; // reset search when category changes
  searchInput.value = "";
  setActiveCategory(newCategory);
  fetchNews({ category: newCategory, query: "" });
  // Collapse mobile menu after selection
  if (navMenu && navMenu.classList.contains("show")) navMenu.classList.remove("show");
}

function handleSearch() {
  const q = (searchInput.value || "").trim();
  if (q.length > 0 && q.length < 2) {
    showError("Please enter at least 2 characters to search.");
    return;
  }
  currentQuery = q;
  fetchNews({ category: currentCategory, query: currentQuery });
}

function initNavbarToggle() {
  // Minimal toggle for Bootstrap's collapse without JS bundle
  if (!navbarToggler || !navMenu) return;
  navbarToggler.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

function initEvents() {
  categoryButtons.forEach((btn) => btn.addEventListener("click", handleCategoryClick));
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });
}

function init() {
  // Year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNavbarToggle();
  initEvents();
  setActiveCategory(currentCategory);
  fetchNews();
}

// Warn if API key not set
if (!API_KEY || API_KEY === "YOUR_NEWSAPI_KEY_HERE") {
  show(errorAlert);
  errorAlert.textContent = "Please set your NewsAPI API key in js/app.js to load live news.";
}

// Start app
init();
