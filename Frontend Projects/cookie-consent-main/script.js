// Key used to store the user's consent decision
const CONSENT_KEY = "cookie_consent_v1";

// Grab DOM elements once (good practice)
const consentEl = document.getElementById("cookieConsent");
const acceptBtn = document.getElementById("cookieAccept");
const closeBtn = document.getElementById("cookieClose");

// Helpers
function hasConsent() {
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

function showConsent() {
  consentEl.hidden = false;
  // Optional: move focus to the action button for accessibility
  acceptBtn.focus();
}

function hideConsent() {
  consentEl.hidden = true;
}

function acceptConsent() {
  localStorage.setItem(CONSENT_KEY, "accepted");
  hideConsent();
}

function closeConsent() {
  // This just hides it for now — does not store acceptance.
  // On refresh, it will show again (expected behavior).
  hideConsent();
}

// On page load: show if no saved consent
window.addEventListener("DOMContentLoaded", () => {
  if (!hasConsent()) showConsent();
});

// Events
acceptBtn.addEventListener("click", acceptConsent);
closeBtn.addEventListener("click", closeConsent);

// Optional: allow ESC to close (still not acceptance)
document.addEventListener("keydown", (e) => {
  if (!consentEl.hidden && e.key === "Escape") closeConsent();
});